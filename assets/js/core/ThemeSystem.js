export class ThemeSystem {
    constructor() {
        this.state = {
            theme: localStorage.getItem('madev_theme') || 'dual',
            cursorEnabled: localStorage.getItem('madev_cursor') !== 'false',
            audioEnabled: localStorage.getItem('madev_audio') === 'true',
            reducedMotion: localStorage.getItem('madev_motion') === 'true',
            matrixMode: localStorage.getItem('madev_matrix') || 'cyan'
        };

        this._apply();
    }

    _apply() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
        if(this.state.reducedMotion) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    set(key, value) {
        this.state[key] = value;
        localStorage.setItem(`madev_${key}`, value);
        this._apply();
        document.dispatchEvent(new CustomEvent('theme:changed', { detail: this.state }));
    }
}
