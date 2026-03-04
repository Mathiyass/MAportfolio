/**
 * Forms Module
 */
import { showModal } from '../utils.js';

export function initializeEnhancedForms() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function () {
                this.parentElement.classList.add('focused');
                this.style.boxShadow = '0 0 20px rgba(0, 255, 222, 0.3)';
            });
            input.addEventListener('blur', function () {
                this.parentElement.classList.remove('focused');
                this.style.boxShadow = '';
                validateInput(this);
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => { if (!validateInput(input)) isValid = false; });
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
                submitBtn.disabled = true;
                setTimeout(() => {
                    showModal('Message Sent', '<p class="text-center text-lg">Thank you for reaching out! I will get back to you shortly.</p>');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        input.classList.remove('error');
        if (input.required && !value) {
            input.classList.add('error');
            isValid = false;
        } else if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
        return isValid;
    }
}
