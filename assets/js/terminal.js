// Terminal Easter Egg
class Terminal {
    constructor() {
        this.isVisible = false;
        this.history = [];
        this.historyIndex = -1;
        this.currentPath = '~';
        this.init();
    }

    init() {
        this.createTerminal();
        this.setupEventListeners();
        this.setupCommands();
    }

    createTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'terminal';
        terminal.className = 'fixed inset-0 bg-black bg-opacity-95 z-50 hidden font-mono';
        terminal.innerHTML = `
            <div class="h-full flex flex-col">
                <div class="bg-gray-800 px-4 py-2 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span class="text-white text-sm">Terminal - MATHIYA Portfolio</span>
                    <button id="terminal-close" class="text-white hover:text-red-400">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="flex-1 p-4 overflow-y-auto">
                    <div id="terminal-output" class="text-green-400 text-sm leading-relaxed"></div>
                    <div class="flex items-center mt-2">
                        <span class="text-cyan-400 mr-2">mathiya@portfolio:${this.currentPath}$</span>
                        <input type="text" id="terminal-input" class="bg-transparent text-green-400 outline-none flex-1" autocomplete="off">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(terminal);

        this.terminal = terminal;
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.prompt = terminal.querySelector('.text-cyan-400');
    }

    setupEventListeners() {
        // Toggle terminal with ~ key
        document.addEventListener('keydown', (e) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isVisible) {
                this.hide();
            }
        });

        // Terminal input handling
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.executeCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            }
        });

        // Close button
        document.getElementById('terminal-close').addEventListener('click', () => {
            this.hide();
        });
    }

    setupCommands() {
        this.commands = {
            help: () => this.showHelp(),
            clear: () => this.clear(),
            about: () => this.showAbout(),
            skills: () => this.showSkills(),
            projects: () => this.showProjects(),
            contact: () => this.showContact(),
            socials: () => this.showSocials(),
            whoami: () => 'mathiya',
            pwd: () => this.currentPath,
            ls: () => this.listFiles(),
            cat: (args) => this.catFile(args[0]),
            echo: (args) => args.join(' '),
            date: () => new Date().toString(),
            uptime: () => `System uptime: ${Math.floor(performance.now() / 1000)} seconds`,
            neofetch: () => this.showNeofetch(),
            matrix: () => this.startMatrix(),
            hack: () => this.hackSequence(),
            exit: () => this.hide(),
            admin: () => {
                this.addOutput('Redirecting to admin panel...');
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 1000);
                return ' ';
            },
            sudo: (args) => {
                if (args.join(' ') === 'rm -rf /') {
                    return 'Nice try! 😄 But I\'m not falling for that one.';
                }
                return 'sudo: command not found (this is a demo terminal)';
            }
        };
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.terminal.classList.remove('hidden');
        this.isVisible = true;
        this.input.focus();
        if (this.output.innerHTML === '') {
            this.addOutput(this.getWelcomeMessage());
        }
    }

    hide() {
        this.terminal.classList.add('hidden');
        this.isVisible = false;
    }

    executeCommand(command) {
        if (!command) return;

        this.history.push(command);
        this.historyIndex = this.history.length;

        this.addOutput(`<span class="text-cyan-400">mathiya@portfolio:${this.currentPath}$</span> ${command}`);

        const [cmd, ...args] = command.split(' ');
        
        if (this.commands[cmd]) {
            const result = this.commands[cmd](args);
            if (result) {
                this.addOutput(result);
            }
        } else {
            this.addOutput(`<span class="text-red-400">Command not found: ${cmd}</span>`);
            this.addOutput('Type "help" for available commands.');
        }
    }

    addOutput(text) {
        this.output.innerHTML += text + '\n';
        this.output.scrollTop = this.output.scrollHeight;
    }

    navigateHistory(direction) {
        if (this.history.length === 0) return;

        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.input.value = '';
            return;
        }

        this.input.value = this.history[this.historyIndex] || '';
    }

    clear() {
        this.output.innerHTML = '';
    }

    getWelcomeMessage() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                    <span class="text-green-400">Welcome to MATHIYA Terminal</span>                    <span class="text-cyan-400">║</span>
<span class="text-cyan-400">║</span>                                                              <span class="text-cyan-400">║</span>
<span class="text-cyan-400">║</span>  <span class="text-yellow-400">🚀 Portfolio Terminal Interface v2.0</span>                      <span class="text-cyan-400">║</span>
<span class="text-cyan-400">║</span>  <span class="text-white">Type 'help' to see available commands</span>                       <span class="text-cyan-400">║</span>
<span class="text-cyan-400">║</span>  <span class="text-white">Press '~' or ESC to toggle terminal</span>                         <span class="text-cyan-400">║</span>
<span class="text-cyan-400">║</span>                                                              <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>
        `;
    }

    showHelp() {
        return `
<span class="text-yellow-400">Available Commands:</span>
<span class="text-green-400">help</span>      - Show this help message
<span class="text-green-400">about</span>     - Display information about Mathiya
<span class="text-green-400">skills</span>    - List technical skills
<span class="text-green-400">projects</span>  - Show recent projects
<span class="text-green-400">contact</span>   - Display contact information
<span class="text-green-400">socials</span>   - Show social media links
<span class="text-green-400">neofetch</span>  - Display system information
<span class="text-green-400">admin</span>     - Go to the admin login page
<span class="text-green-400">clear</span>     - Clear terminal screen
<span class="text-green-400">ls</span>        - List directory contents
<span class="text-green-400">cat</span>       - Display file contents
<span class="text-green-400">whoami</span>    - Display current user
<span class="text-green-400">pwd</span>       - Show current directory
<span class="text-green-400">date</span>      - Display current date and time
<span class="text-green-400">uptime</span>    - Show system uptime
<span class="text-green-400">matrix</span>    - Enter the Matrix 😎
<span class="text-green-400">hack</span>      - Initiate hacking sequence
<span class="text-green-400">exit</span>      - Close terminal
        `;
    }

    showAbout() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                        <span class="text-green-400">ABOUT MATHIYA</span>                           <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">Name:</span> Mathiya Angirasa
<span class="text-yellow-400">Role:</span> Software Engineering Student
<span class="text-yellow-400">Location:</span> Birmingham, UK
<span class="text-yellow-400">University:</span> University of Birmingham

<span class="text-white">Passionate Gen Z Software Engineer who believes in the power of 
technology to transform ideas into reality. Specializing in modern 
web development, game development, and creative coding.</span>

<span class="text-green-400">🎯 Interests:</span> Web Development, Game Development, UI/UX Design
<span class="text-green-400">🎮 Gaming:</span> Strategy Games, RPGs, Indie Games
<span class="text-green-400">🎵 Music:</span> Electronic, Lo-fi, Synthwave
        `;
    }

    showSkills() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                      <span class="text-green-400">TECHNICAL SKILLS</span>                         <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">Frontend:</span>
  • HTML5/CSS3 ████████████████████ 95%
  • JavaScript   ████████████████████ 90%
  • React        ████████████████░░░░ 85%
  • Vue.js       ████████████████░░░░ 80%
  • Tailwind CSS ████████████████████ 88%

<span class="text-yellow-400">Backend:</span>
  • Node.js      ████████████████████ 87%
  • Python       ████████████████░░░░ 83%
  • Java         ████████████████░░░░ 78%
  • MongoDB      ████████████████████ 85%
  • Express.js   ████████████████░░░░ 82%

<span class="text-yellow-400">Game Development:</span>
  • Unity        ████████████████░░░░ 75%
  • Unreal       ██████████████░░░░░░ 70%
  • C#           ████████████████░░░░ 80%

<span class="text-yellow-400">Tools:</span>
  • Git          ████████████████████ 90%
  • VS Code      ████████████████████ 95%
  • Figma        ████████████████████ 85%
        `;
    }

    showProjects() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                       <span class="text-green-400">RECENT PROJECTS</span>                          <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">1. Ultra-Modern Portfolio Website</span>
   <span class="text-white">• Advanced portfolio with admin panel</span>
   <span class="text-white">• Tech: HTML5, Tailwind CSS, Vanilla JS</span>
   <span class="text-white">• Features: Signature loader, terminal easter egg</span>

<span class="text-yellow-400">2. E-Commerce Platform</span>
   <span class="text-white">• Full-stack e-commerce solution</span>
   <span class="text-white">• Tech: React, Node.js, MongoDB</span>
   <span class="text-white">• Features: Payment processing, admin dashboard</span>

<span class="text-yellow-400">3. Space Shooter Game</span>
   <span class="text-white">• 3D space shooter with multiple levels</span>
   <span class="text-white">• Tech: Unreal Engine, C++, Blueprint</span>
   <span class="text-white">• Features: Dynamic gameplay, power-ups</span>

<span class="text-yellow-400">4. AI Chatbot Assistant</span>
   <span class="text-white">• Intelligent customer support bot</span>
   <span class="text-white">• Tech: Python, TensorFlow, NLP</span>
   <span class="text-white">• Features: Machine learning, context awareness</span>
        `;
    }

    showContact() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                     <span class="text-green-400">CONTACT INFORMATION</span>                       <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">📧 Email:</span> mathiya.angirasa@example.com
<span class="text-yellow-400">📱 WhatsApp:</span> +94 71 592 1984
<span class="text-yellow-400">📍 Location:</span> Birmingham, United Kingdom
<span class="text-yellow-400">🌐 Website:</span> https://mathiya.github.io

<span class="text-green-400">💼 Professional:</span>
  • LinkedIn: linkedin.com/in/mathisha-angirasa-a955941a2/
  • GitHub: github.com/Mathiyass

<span class="text-green-400">🎮 Gaming:</span>
  • Discord: discord.gg/QERP5JJM8k
  • Steam: steamcommunity.com/profiles/76561199076879396/
  • EA ID: M_MATHIYA_M
        `;
    }

    showSocials() {
        return `
<span class="text-cyan-400">╔══════════════════════════════════════════════════════════════╗</span>
<span class="text-cyan-400">║</span>                      <span class="text-green-400">SOCIAL MEDIA LINKS</span>                        <span class="text-cyan-400">║</span>
<span class="text-cyan-400">╚══════════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">Professional Networks:</span>
  🐙 GitHub: https://github.com/Mathiyass
  💼 LinkedIn: https://www.linkedin.com/in/mathisha-angirasa-a955941a2/
  🐦 X (Twitter): https://x.com/Mathiya

<span class="text-yellow-400">Social Media:</span>
  📘 Facebook: https://www.facebook.com/mathisha.angirasa/
  📸 Instagram: https://www.instagram.com/mathi_ya_/
  💬 WhatsApp: https://wa.me/94715921984

<span class="text-yellow-400">Gaming & Entertainment:</span>
  🎮 Steam: https://steamcommunity.com/profiles/76561199076879396/
  🎯 Epic Games: https://store.epicgames.com/u/4cf7fef90a78425f951ae11dcd24222b
  🎵 Spotify: https://open.spotify.com/user/6grrenymxnzrrvbp2dbe4ikxm
  💬 Discord: https://discord.gg/QERP5JJM8k
  🎮 EA ID: M_MATHIYA_M
        `;
    }

    listFiles() {
        return `
<span class="text-blue-400">total 8</span>
<span class="text-green-400">drwxr-xr-x</span>  2 mathiya mathiya 4096 Dec 25 2024 <span class="text-cyan-400">projects/</span>
<span class="text-green-400">drwxr-xr-x</span>  2 mathiya mathiya 4096 Dec 25 2024 <span class="text-cyan-400">skills/</span>
<span class="text-white">-rw-r--r--</span>  1 mathiya mathiya  256 Dec 25 2024 about.txt
<span class="text-white">-rw-r--r--</span>  1 mathiya mathiya  512 Dec 25 2024 contact.txt
<span class="text-white">-rw-r--r--</span>  1 mathiya mathiya  128 Dec 25 2024 readme.txt
<span class="text-white">-rw-r--r--</span>  1 mathiya mathiya 1024 Dec 25 2024 resume.pdf
        `;
    }

    catFile(filename) {
        const files = {
            'about.txt': this.showAbout(),
            'contact.txt': this.showContact(),
            'readme.txt': `
<span class="text-yellow-400">MATHIYA PORTFOLIO TERMINAL</span>

This is an interactive terminal interface for exploring
Mathiya's portfolio. Use 'help' to see available commands.

Built with vanilla JavaScript and lots of ❤️

Version: 2.0
Last updated: December 2024
            `,
            'resume.pdf': 'Error: Cannot display binary file. Use a PDF viewer instead.'
        };

        return files[filename] || `cat: ${filename}: No such file or directory`;
    }

    showNeofetch() {
        return `
<span class="text-cyan-400">                    -\`                </span>    <span class="text-yellow-400">mathiya</span>@<span class="text-yellow-400">portfolio</span>
<span class="text-cyan-400">                   .o+\`               </span>    <span class="text-cyan-400">-----------------</span>
<span class="text-cyan-400">                  \`ooo/               </span>    <span class="text-yellow-400">OS</span>: Portfolio Linux x86_64
<span class="text-cyan-400">                 \`+oooo:              </span>    <span class="text-yellow-400">Host</span>: MATHIYA Portfolio v2.0
<span class="text-cyan-400">                \`+oooooo:             </span>    <span class="text-yellow-400">Kernel</span>: JavaScript 5.1.0
<span class="text-cyan-400">                -+oooooo+:            </span>    <span class="text-yellow-400">Uptime</span>: ${Math.floor(performance.now() / 1000)} seconds
<span class="text-cyan-400">              \`/:-:++oooo+:           </span>    <span class="text-yellow-400">Packages</span>: 42 (npm)
<span class="text-cyan-400">             \`/++++/+++++++:          </span>    <span class="text-yellow-400">Shell</span>: terminal.js
<span class="text-cyan-400">            \`/++++++++++++++:         </span>    <span class="text-yellow-400">Resolution</span>: ${window.innerWidth}x${window.innerHeight}
<span class="text-cyan-400">           \`/+++ooooooooooooo/\`       </span>    <span class="text-yellow-400">DE</span>: Tailwind CSS
<span class="text-cyan-400">          ./ooosssso++osssssso+\`      </span>    <span class="text-yellow-400">WM</span>: Browser
<span class="text-cyan-400">         .oossssso-\`\`\`\`/ossssss+\`     </span>    <span class="text-yellow-400">Theme</span>: Cyber Dark
<span class="text-cyan-400">        -osssssso.      :ssssssso.    </span>    <span class="text-yellow-400">Icons</span>: Font Awesome
<span class="text-cyan-400">       :osssssss/        osssso+++.   </span>    <span class="text-yellow-400">Terminal</span>: Custom Terminal
<span class="text-cyan-400">      /ossssssss/        +ssssooo/-   </span>    <span class="text-yellow-400">CPU</span>: JavaScript Engine
<span class="text-cyan-400">    \`/ossssso+/:-        -:/+osssso+- </span>    <span class="text-yellow-400">Memory</span>: ${(performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(2) || 'N/A'} MB
<span class="text-cyan-400">   \`+sso+:-\`                 \`.-/+oso: </span>
<span class="text-cyan-400">  \`++:.                           \`-/+/</span>
<span class="text-cyan-400">  .\`                                 \`/</span>
        `;
    }

    startMatrix() {
        this.addOutput('<span class="text-green-400">Entering the Matrix...</span>');
        this.addOutput('<span class="text-green-400">Wake up, Neo... 🕶️</span>');
        
        let matrixChars = '01';
        let matrixLines = [];
        
        for (let i = 0; i < 10; i++) {
            let line = '';
            for (let j = 0; j < 60; j++) {
                line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
            }
            matrixLines.push(`<span class="text-green-400">${line}</span>`);
        }
        
        setTimeout(() => {
            matrixLines.forEach((line, index) => {
                setTimeout(() => this.addOutput(line), index * 100);
            });
            
            setTimeout(() => {
                this.addOutput('<span class="text-red-400">You took the red pill... 💊</span>');
                this.addOutput('<span class="text-cyan-400">Welcome back to reality.</span>');
            }, 1500);
        }, 1000);
    }

    hackSequence() {
        const sequences = [
            'Initializing hack sequence...',
            'Connecting to mainframe...',
            'Bypassing firewall...',
            'Accessing secure database...',
            'Downloading files...',
            'Covering tracks...',
            'Hack complete! 😎'
        ];

        sequences.forEach((seq, index) => {
            setTimeout(() => {
                if (index === sequences.length - 1) {
                    this.addOutput(`<span class="text-green-400">${seq}</span>`);
                    this.addOutput('<span class="text-yellow-400">Just kidding! This is just a demo terminal 😄</span>');
                } else {
                    this.addOutput(`<span class="text-red-400">[HACKING]</span> ${seq}`);
                }
            }, index * 800);
        });
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.terminal = new Terminal();
});