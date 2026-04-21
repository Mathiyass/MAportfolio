from PIL import Image, ImageDraw

def create_placeholder(filename, width, height, text):
    img = Image.new('RGB', (width, height), color = (8, 12, 20))
    d = ImageDraw.Draw(img)
    # Draw simple gradient effect
    for y in range(height):
        r = int(8 + (251 - 8) * (y / height) * 0.2)
        g = int(12 + (113 - 12) * (y / height) * 0.1)
        b = int(20 + (133 - 20) * (y / height) * 0.1)
        d.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Save as WebP
    img.save(f'assets/img/{filename}', 'WEBP')

images = [
    ('og-card.webp', 1200, 630, 'OG Card'),
    ('hero-bg.webp', 2560, 1080, 'Hero BG'),
    ('marketplace.webp', 1920, 1080, 'Marketplace'),
    ('game-quebes.webp', 1920, 1080, 'Quebes'),
    ('project-android.webp', 1600, 1200, 'Android'),
    ('project-ar.webp', 1920, 1080, 'AR'),
    ('blog-code.webp', 1920, 1080, 'Code'),
    ('arcade-banner.webp', 1920, 1080, 'Arcade'),
    ('lab-shader.webp', 1000, 1000, 'Lab Shader'),
    ('about-bg.webp', 1920, 1080, 'About BG'),
    ('byte-concept.webp', 1920, 1080, 'BYTE Concept'),
    ('loader-bg.webp', 2560, 1080, 'Loader BG'),
    ('fractal-art.webp', 1000, 1000, 'Fractal'),
    ('racing-bg.webp', 1920, 1080, 'Racing'),
    ('noise-texture.webp', 512, 512, 'Noise'),
    ('og-byte.webp', 1000, 1000, 'OG BYTE'),
    ('avatar-wireframe.webp', 500, 500, 'Avatar'),
    ('project-game.webp', 1920, 1080, 'Game'),
    ('project-marketplace.webp', 1920, 1080, 'Marketplace')
]

for filename, w, h, text in images:
    create_placeholder(filename, w, h, text)
print("Placeholders generated successfully.")