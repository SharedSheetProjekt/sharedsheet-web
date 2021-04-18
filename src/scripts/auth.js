import { setAuthenticationToken ,api_login, api_register, api_logout } from './api';

class Auth {
    constructor () {
        if (typeof(Storage) !== 'undefined') {
            const token = sessionStorage.getItem('SharedSheets_Token');
            if (token !== null && token !== undefined) {
                setAuthenticationToken(token);
                this.authenticated = true;
            }
            else
            {
                this.authenticated = false;
            }
        } else {
            alert('Ihr Browser ist veraltet!\nBitte verwenden Sie einen moderneren Browser, um die Funktionalität der Website zu gewährleisten!');
            this.authenticated = false;
        }
    }

    async register(cb, username, password, email) {
        const token = await api_register(username, password, email, 'device_name', 'secret');
        
        if (token !== undefined) {
            if (typeof(Storage) !== 'undefined') {
                sessionStorage.setItem('SharedSheets_Token', token);
                this.authenticated = true;
                cb();
                return true;
            } else {
                alert('Ihr Browser ist veraltet!\nBitte verwenden Sie einen moderneren Browser, um die Funktionalität der Website zu gewährleisten!');
            }
        }
    }

    async login(cb, username, password) {
        const token = await api_login(username, password);
        
        if (token !== undefined) {
            if (typeof(Storage) !== 'undefined') {
                sessionStorage.setItem('SharedSheets_Token', token);
                this.authenticated = true;
                cb();
                return true;
            } else {
                alert('Ihr Browser ist veraltet!\nBitte verwenden Sie einen moderneren Browser, um die Funktionalität der Website zu gewährleisten!');
            }
        }
    }

    async logout(cb) {
        const sucessful_logout = await api_logout();

        if (typeof(Storage) !== 'undefined') {
            sessionStorage.removeItem('SharedSheets_Token');
        } else {
            alert('Ihr Browser ist veraltet!\nBitte verwenden Sie einen moderneren Browser, um die Funktionalität der Website zu gewährleisten!');
        }

        if(sucessful_logout) {
            this.authenticated = false;
            cb();
        }
    }

    isAuthenticated() {
        return this.authenticated;
        /* !!!  (Change back if authentification is needed. This is debug mode.) Now activated.  !!! */
    }
}

export default new Auth();