import os
import json
import re
from bs4 import BeautifulSoup
import glob

def audit_html_file(filepath):
    flags = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            soup = BeautifulSoup(content, 'html.parser')

            # 1. Any page title/nav/heading containing 'MA_Dev Portfolio'
            if soup.title and 'MA_Dev Portfolio' in soup.title.string:
                flags.append("Title contains 'MA_Dev Portfolio'")

            for tag in soup.find_all(['nav', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
                if tag.get_text() and 'MA_Dev Portfolio' in tag.get_text():
                    flags.append(f"Tag <{tag.name}> contains 'MA_Dev Portfolio'")

            # 2. Any instance of 'MA_Dev Solutions (Pvt) Ltd · Sri Lanka'
            if 'MA_Dev Solutions (Pvt) Ltd · Sri Lanka' in content:
                flags.append("Contains 'MA_Dev Solutions (Pvt) Ltd · Sri Lanka'")

            # 3. Missing meta og:image, description, canonical
            if not soup.find('meta', property='og:image'):
                flags.append("Missing meta og:image")
            if not soup.find('meta', attrs={'name': 'description'}):
                flags.append("Missing meta description")
            if not soup.find('link', rel='canonical'):
                flags.append("Missing link rel='canonical'")

            # 5. Any external CSS/JS framework CDN imports
            for link in soup.find_all('link', rel='stylesheet'):
                href = link.get('href', '')
                if href.startswith('http') and ('cdn' in href or 'unpkg' in href or 'jsdelivr' in href or 'cdnjs' in href or 'bootstrap' in href or 'tailwind' in href):
                    flags.append(f"External CSS framework CDN import: {href}")

            for script in soup.find_all('script'):
                src = script.get('src', '')
                if src.startswith('http') and ('cdn' in src or 'unpkg' in src or 'jsdelivr' in src or 'cdnjs' in src or 'bootstrap' in src or 'tailwind' in src):
                    flags.append(f"External JS framework CDN import: {src}")

            # 6. Lorem Ipsum text
            if 'lorem ipsum' in content.lower():
                flags.append("Contains Lorem Ipsum text")

            # 7. Missing BYTE.js import
            has_byte_js = False
            for script in soup.find_all('script'):
                src = script.get('src', '')
                if 'BYTE.js' in src or 'byte.js' in src.lower():
                    has_byte_js = True
            if not has_byte_js:
                flags.append("Missing BYTE.js import")

            # 8. Missing Loader.js import
            has_loader_js = False
            for script in soup.find_all('script'):
                src = script.get('src', '')
                if 'Loader.js' in src or 'loader.js' in src.lower():
                    has_loader_js = True
            if not has_loader_js:
                flags.append("Missing Loader.js import")

    except Exception as e:
        flags.append(f"Error parsing: {str(e)}")

    return flags

def audit_css_file(filepath):
    flags = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Regex to find border-radius: <value> where value is not 0px, 0, or 0%
            matches = re.finditer(r'border-radius\s*:\s*([^;]+);', content)
            for match in matches:
                val = match.group(1).strip()
                # Simplified check for non-zero border-radius
                if not re.match(r'^(0|0px|0%|0em|0rem)(\s+(0|0px|0%|0em|0rem))*$', val) and val != 'none' and val != 'initial' and val != 'inherit':
                    flags.append(f"border-radius value above 0px found: {val}")
    except Exception as e:
        flags.append(f"Error parsing: {str(e)}")

    return flags

def main():
    audit_results = {}

    # Audit HTML
    html_files = glob.glob('**/*.html', recursive=True)
    for f in html_files:
        flags = audit_html_file(f)
        if flags:
            if f not in audit_results:
                audit_results[f] = []
            audit_results[f].extend(flags)

    # Audit CSS
    css_files = glob.glob('**/*.css', recursive=True)
    for f in css_files:
        flags = audit_css_file(f)
        if flags:
            # We want unique flags to avoid massive JSONs for repetitive border-radius
            unique_flags = list(set(flags))
            if f not in audit_results:
                audit_results[f] = []
            audit_results[f].extend(unique_flags)

    with open('audit_results.json', 'w') as out:
        json.dump(audit_results, out, indent=2)

if __name__ == "__main__":
    main()
