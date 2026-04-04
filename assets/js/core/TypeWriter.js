export class TypeWriter {
    constructor(element, phrases, options = {}) {
        if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            element.textContent = phrases[0];
            return;
        }

        this.el = element;
        this.phrases = phrases;
        this.charDelay = options.charDelay || 50;
        this.deleteDelay = options.deleteDelay || 30;
        this.pauseDuration = options.pauseDuration || 2000;
        this.glitchChance = options.glitchChance || 0.05;
        this.glitchChars = options.glitchChars || "█▓▒░◈◉⊗⊕◻◼▪▫";

        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.timeout = null;

        this.cursor = document.createElement('span');
        this.cursor.textContent = '█';
        this.cursor.style.animation = 'terminalBlink 1.2s infinite';
        this.cursor.style.color = 'var(--cyan)';

        this.textNode = document.createTextNode('');
        this.el.innerHTML = '';
        this.el.appendChild(this.textNode);
        this.el.appendChild(this.cursor);

        this._type();
    }
    
    _type() {
        const currentPhrase = this.phrases[this.phraseIndex];

        if (this.isDeleting) {
            this.textNode.nodeValue = currentPhrase.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            let nextChar = currentPhrase.substring(this.charIndex, this.charIndex + 1);
            if (Math.random() < this.glitchChance && nextChar !== ' ') {
                nextChar = this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                setTimeout(() => { // Fix glitch after short delay
                    this.textNode.nodeValue = this.textNode.nodeValue.slice(0, -1) + currentPhrase.substring(this.charIndex-1, this.charIndex);
                }, 100);
            }
            this.textNode.nodeValue = currentPhrase.substring(0, this.charIndex) + nextChar;
            this.charIndex++;
        }

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

        this.timeout = setTimeout(() => this._type(), delay + (Math.random() * 20 - 10));
    }
    
    destroy() {
        clearTimeout(this.timeout);
    }
}
