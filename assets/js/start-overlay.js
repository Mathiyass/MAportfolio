
/**
 * Start Overlay Logic
 * Creates a fixed, full-screen black overlay with neon text and a button.
 * Handles the "Initialize System" interaction and Web Speech API.
 */

(function() {
    // Function to create and show the overlay
    window.createStartOverlay = function(onComplete) {
        // Create Overlay
        const overlay = document.createElement('div');
        overlay.id = 'start-overlay';
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            background-color: #000000;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            opacity: 0; /* Start invisible, fade in */
            transition: opacity 0.5s ease;
        `;

        // Create Text
        const text = document.createElement('div');
        text.innerText = '> AWAITING USER INPUT...';
        text.style.cssText = `
            color: #00FFDE;
            font-family: 'Orbitron', monospace;
            font-size: 1.5rem; /* Tailwind text-2xl approx */
            margin-bottom: 2rem;
            letter-spacing: 0.1em;
            text-shadow: 0 0 10px rgba(0, 255, 222, 0.5);
            animation: pulseText 2s infinite;
        `;

        // Create Button
        const button = document.createElement('button');
        button.innerText = 'INITIALIZE SYSTEM';
        button.id = 'init-system-btn';
        button.style.cssText = `
            border: 2px solid #00FFDE;
            color: #00FFDE;
            background: transparent;
            padding: 15px 40px;
            font-family: 'Orbitron', monospace;
            font-size: 1.2rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(0, 255, 222, 0.5), inset 0 0 10px rgba(0, 255, 222, 0.2);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
        `;

        // Hover effects for button
        button.onmouseover = function() {
            this.style.backgroundColor = 'rgba(0, 255, 222, 0.1)';
            this.style.boxShadow = '0 0 25px rgba(0, 255, 222, 0.8), inset 0 0 15px rgba(0, 255, 222, 0.4)';
            this.style.transform = 'scale(1.05)';
        };
        button.onmouseout = function() {
            this.style.backgroundColor = 'transparent';
            this.style.boxShadow = '0 0 15px rgba(0, 255, 222, 0.5), inset 0 0 10px rgba(0, 255, 222, 0.2)';
            this.style.transform = 'scale(1)';
        };

        // Append elements
        overlay.appendChild(text);
        overlay.appendChild(button);
        document.body.appendChild(overlay);

        // Fade in the overlay
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        // Add keyframe for text pulse if not exists
        if (!document.getElementById('overlay-styles')) {
            const style = document.createElement('style');
            style.id = 'overlay-styles';
            style.textContent = `
                @keyframes pulseText {
                    0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(0, 255, 222, 0.5); }
                    50% { opacity: 0.7; text-shadow: 0 0 20px rgba(0, 255, 222, 0.8); }
                }
            `;
            document.head.appendChild(style);
        }

        // Handle Click
        button.addEventListener('click', function() {
            // Speak
            speakWelcomeMessage();

            // Fade out and remove
            overlay.style.transition = 'opacity 1s ease';
            overlay.style.opacity = '0';

            setTimeout(() => {
                overlay.remove();
                if (onComplete) onComplete();
            }, 1000);
        });
    };

    // Helper for Speech
    function speakWelcomeMessage() {
        if (!window.speechSynthesis) return;

        const text = "System Online. Access granted. Welcome to the digital workspace of Mathiya.";
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 0.1; // Deep voice
        utterance.rate = 0.75; // Slow rate
        utterance.volume = 1.0;

        // Voice selection
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(voice =>
            voice.name.toLowerCase().includes('male') ||
            voice.name.toLowerCase().includes('david') ||
            voice.name.toLowerCase().includes('daniel')
        );

        if (maleVoice) utterance.voice = maleVoice;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }
})();
