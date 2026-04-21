// PageTransitions.js
export class PageTransitions {
  constructor() {
    this.bindLinks();
  }

  bindLinks() {
    document.querySelectorAll('a[href^="/"], a[href^="./"], a:not([href^="http"])').forEach(link => {
      if (link.getAttribute('target') === '_blank' || link.hasAttribute('download')) return;
      
      link.addEventListener('click', e => {
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        
        e.preventDefault();
        const url = link.href;
        if (url === window.location.href || url.includes('#')) {
          if (url.includes('#')) {
            const target = document.querySelector(url.substring(url.indexOf('#')));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        this.transitionOut(url);
      });
    });
  }

  transitionOut(url) {
    const overlay = document.createElement('div');
    overlay.style.cssText = \`
      position: fixed; inset: 0; z-index: var(--z-loader);
      background: var(--bg-base);
      clip-path: inset(0 100% 0 0);
      animation: clipRevealH 350ms var(--ease-expo) forwards;
    \`;
    document.body.appendChild(overlay);

    setTimeout(() => {
      window.location.href = url;
    }, 350);
  }
}
