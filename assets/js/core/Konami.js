export class Konami {
    constructor() {
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.konamiIndex = 0;

        this.madevCode = ['m', 'a', 'd', 'e', 'v'];
        this.madevIndex = 0;

        this.sudoCode = ['s', 'u', 'd', 'o'];
        this.sudoIndex = 0;

        document.addEventListener('keydown', (e) => this._onKeyDown(e));
    }
    
    _onKeyDown(e) {
        // Konami
        if (e.key === this.konamiCode[this.konamiIndex] || e.key.toLowerCase() === this.konamiCode[this.konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === this.konamiCode.length) {
                document.dispatchEvent(new CustomEvent('konami'));
                this.konamiIndex = 0;
            }
        } else {
            this.konamiIndex = 0;
        }

        // MADEV
        if (e.key.toLowerCase() === this.madevCode[this.madevIndex]) {
            this.madevIndex++;
            if (this.madevIndex === this.madevCode.length) {
                document.dispatchEvent(new CustomEvent('madev-code'));
                this.madevIndex = 0;
            }
        } else {
            this.madevIndex = 0;
        }

        // SUDO
        if (e.key.toLowerCase() === this.sudoCode[this.sudoIndex]) {
            this.sudoIndex++;
            if (this.sudoIndex === this.sudoCode.length) {
                this._initSudo();
                this.sudoIndex = 0;
            }
        } else {
            this.sudoIndex = 0;
        }
    }

    _initSudo() {
        if(window.sudo) return;

        console.log(`%c
   ███╗   ███╗ █████╗  ██████╗  ███████╗██╗   ██╗
   ████╗ ████║██╔══██╗ ██╔══██╗██╔════╝██║   ██║
   ██╔████╔██║███████║ ██║  ██║█████╗  ██║   ██║
   ██║╚██╔╝██║██╔══██║ ██║  ██║██╔══╝  ╚██╗ ██╔╝
   ██║ ╚═╝ ██║██║  ██║ ██████╔╝███████╗ ╚████╔╝
   ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝  ╚═══╝
        `, "color: #00E5FF");
        console.log("Hey developer 👾 → github.com/Mathiyass");
        console.log("[ ADMIN TERMINAL UNLOCKED // MA_DEV SOLUTIONS // CLEARANCE LEVEL: MAX ]");
        console.log("- window.sudo is available. Type sudo('help') to see commands.");

        window.sudo = async (cmd) => {
            switch(cmd) {
                case 'stats':
                    const { GitHubStats } = await import('./GitHubStats.js');
                    const gh = new GitHubStats();
                    console.table(await gh.getStats());
                    break;
                case 'hire':
                    window.location.href = 'contact.html';
                    break;
                case 'konami':
                    document.dispatchEvent(new CustomEvent('konami'));
                    break;
                case 'matrix':
                    document.dispatchEvent(new CustomEvent('konami')); // Reuse konami effect for now
                    break;
                case 'signal':
                    document.documentElement.style.setProperty('--cyan', '#FF4D6D');
                    document.documentElement.style.setProperty('--red', '#00E5FF');
                    setTimeout(() => {
                        document.documentElement.style.setProperty('--cyan', '#00E5FF');
                        document.documentElement.style.setProperty('--red', '#FF4D6D');
                    }, 3000);
                    break;
                case 'whereami':
                    console.log("MA_Dev Portfolio // mathiyass.github.io // Sri Lanka");
                    break;
                case 'help':
                    console.table([
                        { Command: 'stats', Description: 'Show GitHub stats' },
                        { Command: 'hire', Description: 'Navigate to contact page' },
                        { Command: 'konami', Description: 'Trigger Konami code' },
                        { Command: 'matrix', Description: 'Trigger Matrix Rain' },
                        { Command: 'signal', Description: 'Swap signal colors temporarily' },
                        { Command: 'whereami', Description: 'Show location info' },
                    ]);
                    break;
                default:
                    console.error(`Command not found: ${cmd}`);
            }
        };
    }
}
