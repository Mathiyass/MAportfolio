// github-chart.js
export class GitHubChart {
  constructor(el, username) {
    this.el = el;
    this.username = username;
  }

  async render() {
    this.el.innerHTML = '<div class="skeleton" style="width:100%; height:150px; border-radius:var(--r-md)"></div>';
    try {
      const res = await fetch(\`https://github-contributions-api.jasonrogers.now.sh/v1/\${this.username}\`);
      const data = await res.json();
      this.drawSVG(data.contributions);
    } catch (e) {
      console.warn("Failed to load GitHub chart", e);
      this.el.innerHTML = '<p style="color:var(--text-3)">Failed to load contribution graph.</p>';
    }
  }

  drawSVG(contributions) {
    // Generate simple SVG rects based on intensity
    let svg = '<svg width="100%" height="150" viewBox="0 0 800 150">';
    const size = 12, gap = 4;
    let x = 0, y = 0;
    
    // Group by weeks
    const weeks = [];
    let currWeek = [];
    contributions.forEach(c => {
      currWeek.push(c);
      if (currWeek.length === 7) {
        weeks.push(currWeek);
        currWeek = [];
      }
    });

    weeks.slice(-52).forEach((week, i) => {
      x = i * (size + gap);
      week.forEach((day, j) => {
        y = j * (size + gap);
        let color = 'var(--bg-elevated)';
        if (day.intensity === 1) color = 'var(--cyan-ghost)';
        if (day.intensity === 2) color = 'var(--cyan-subtle)';
        if (day.intensity === 3) color = 'var(--cyan-border)';
        if (day.intensity === 4) color = 'var(--cyan)';
        
        svg += \`<rect x="\${x}" y="\${y}" width="\${size}" height="\${size}" rx="2" fill="\${color}"><title>\${day.count} contributions on \${day.date}</title></rect>\`;
      });
    });
    
    svg += '</svg>';
    this.el.innerHTML = svg;
  }
}
