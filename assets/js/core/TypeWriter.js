import { $, createElement } from '../utils/dom.js';

export class TypeWriter {
  constructor(el, phrases, options = {}) {
    this.el = el;
    this.phrases = phrases;
    this.charDelay = options.charDelay || 60;
    this.deleteDelay = options.deleteDelay || 30;
    this.pauseDuration = options.pauseDuration || 2000;
    this.glitchChance = options.glitchChance || 0.05;
    this.glitchChars = options.glitchChars || "█▓▒░◈◉⊗⊕◻◼▪▫";
    
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    this.textNode = document.createTextNode('');
    this.cursor = createElement('span', { className: 'terminal-blink' }, ['█']);
    
    this.el.innerHTML = '';
    this.el.appendChild(this.textNode);
    this.el.appendChild(this.cursor);

    if (this.isReducedMotion) {
      this.textNode.textContent = this.phrases[0];
      return;
    }

    this._loop();
  }

  _loop() {
    const currentPhrase = this.phrases[this.phraseIndex];
    
    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    let textToDisplay = currentPhrase.substring(0, this.charIndex);
    
    // Add glitch char
    if (!this.isDeleting && this.charIndex < currentPhrase.length && Math.random() < this.glitchChance) {
      const glitch = this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
      textToDisplay = textToDisplay.substring(0, textToDisplay.length - 1) + glitch;
      setTimeout(() => {
        this.textNode.textContent = currentPhrase.substring(0, this.charIndex);
      }, 50);
    }

    this.textNode.textContent = textToDisplay;

    let delay = this.isDeleting ? this.deleteDelay : this.charDelay;

    if (!this.isDeleting && this.charIndex === currentPhrase.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
      this.el.dispatchEvent(new CustomEvent('tw:complete'));
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 500;
      this.el.dispatchEvent(new CustomEvent('tw:switch'));
    }

    setTimeout(() => this._loop(), delay + (Math.random() - 0.5) * (delay * 0.5));
  }
}
