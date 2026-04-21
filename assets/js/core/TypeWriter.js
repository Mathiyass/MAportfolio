export class TypeWriter {
  constructor(el, phrases, options = {}) {
    if (!el) return;
    this.el = el;
    this.phrases = phrases;
    this.charDelay = options.charDelay || 40;
    this.pauseDuration = options.pauseDuration || 2500;
    
    this.phraseIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    
    this.loop();
  }

  async loop() {
    const current = this.phrases[this.phraseIndex];
    
    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.el.textContent = current.substring(0, this.charIndex);

    let delay = this.isDeleting ? this.charDelay / 2 : this.charDelay;

    if (!this.isDeleting && this.charIndex === current.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
      delay = 500;
    }

    setTimeout(() => this.loop(), delay);
  }
}

