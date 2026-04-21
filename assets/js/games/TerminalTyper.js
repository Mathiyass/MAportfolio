// TerminalTyper.js
export class TerminalTyper {
  constructor(container) {
    this.container = container;
    this.words = [];
    this.activeWords = [];
    this.score = 0;
    this.multiplier = 1;
    this.streak = 0;
    this.state = 'IDLE';
    this.input = '';
    
    document.addEventListener('keydown', e => {
      if (this.state !== 'PLAYING') return;
      if (e.key === 'Backspace') {
        this.input = this.input.slice(0, -1);
      } else if (e.key.length === 1) {
        this.input += e.key;
        this.checkMatch();
      }
    });

    fetch('assets/data/words.json').then(r => r.json()).then(d => {
      this.words = d.words;
    });
  }

  checkMatch() {
    const matchIdx = this.activeWords.findIndex(w => w.text === this.input);
    if (matchIdx !== -1) {
      this.activeWords.splice(matchIdx, 1);
      this.input = '';
      this.score += 10 * this.multiplier;
      this.streak++;
      if (this.streak % 5 === 0) this.multiplier++;
    }
  }

  spawnWord() {
    if (this.state !== 'PLAYING') return;
    const text = this.words[Math.floor(Math.random() * this.words.length)];
    this.activeWords.push({ text, y: 0, x: Math.random() * 80 });
    setTimeout(() => this.spawnWord(), Math.max(500, 2000 - this.score * 5));
  }

  update() {
    if (this.state !== 'PLAYING') return;
    this.activeWords.forEach(w => w.y += 0.5);
    
    // Check game over
    if (this.activeWords.some(w => w.y > 100)) {
      this.state = 'GAME_OVER';
    }

    this.render();
    requestAnimationFrame(() => this.update());
  }

  render() {
    this.container.innerHTML = \`
      <div style="position: absolute; top: 10px; right: 10px; font-family: var(--font-stat); color: var(--cyan); font-size: 24px;">\${this.score} x\${this.multiplier}</div>
      <div style="position: absolute; bottom: 10px; left: 10px; font-family: var(--font-mono); color: var(--text-0);">> \${this.input}<span style="animation: terminalBlink 1s infinite">_</span></div>
    \`;

    this.activeWords.forEach(w => {
      const el = document.createElement('div');
      el.style.cssText = \`
        position: absolute; left: \${w.x}%; top: \${w.y}%;
        font-family: var(--font-mono); color: \${w.text.startsWith(this.input) ? 'var(--cyan)' : 'var(--text-2)'};
        transition: top 0.1s linear;
      \`;
      el.textContent = w.text;
      this.container.appendChild(el);
    });

    if (this.state === 'GAME_OVER') {
      this.container.innerHTML += \`<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; font-family: var(--font-head); color: var(--red); font-size: 32px;">GAME OVER</div>\`;
    }
  }

  start() {
    if (!this.words.length) return;
    this.state = 'PLAYING';
    this.score = 0;
    this.input = '';
    this.activeWords = [];
    this.spawnWord();
    this.update();
  }
}
