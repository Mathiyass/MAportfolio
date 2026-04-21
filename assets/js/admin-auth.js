/**
 * ========================================================
 * MTHISHA PORTFOLIO - V2 ADMIN AUTHENTICATION
 * admin-auth.js
 * ========================================================
 */

class AdminAuth {
    constructor() {
        // SHA-256 hash of "mthisha2025"
        this.validHash = "e0c7a5f6af360b6ae9d0cfb4db745a7da7d3536ac9e6b66ddb44321682390a3a";
    }

    async hashPassword(password) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    async login(password) {
        const hash = await this.hashPassword(password);
        if (hash === this.validHash) {
            sessionStorage.setItem('MATHIYA_ADMIN_AUTH', 'true');
            sessionStorage.setItem('MATHIYA_ADMIN_TOKEN', hash);
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem('MATHIYA_ADMIN_AUTH');
        sessionStorage.removeItem('MATHIYA_ADMIN_TOKEN');
        const depth = window.location.pathname.includes('/admin/') ? '../' : './';
        window.location.href = depth + 'admin/login.html';
    }

    checkAuth() {
        const isAuth = sessionStorage.getItem('MATHIYA_ADMIN_AUTH') === 'true';
        const isLoginPage = window.location.pathname.includes('login.html');

        if (!isAuth && !isLoginPage) {
            // Redirect to login if unauthenticated and not on login page
            const depth = window.location.pathname.includes('/admin/') ? '../' : './';
            window.location.href = depth + 'admin/login.html';
        } else if (isAuth && isLoginPage) {
            // Redirect to dashboard if authenticated and on login page
            window.location.href = '../admin.html';
        }
    }
}

// Instantiate Global Auth Object
window.AppAuth = new AdminAuth();

// Immediately check auth on script load
window.AppAuth.checkAuth();

