import { api_login } from './api';

class Auth {
    constructor () {
        this.authenticated = false;
    }

    async login(cb, username, password) {
        const token = await api_login(username, password, 'device_name');
        
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

    logout(cb) {
        if (typeof(Storage) !== 'undefined') {
            sessionStorage.removeItem('SharedSheets_Token');
        } else {
            alert('Ihr Browser ist veraltet!\nBitte verwenden Sie einen moderneren Browser, um die Funktionalität der Website zu gewährleisten!');
        }

        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return true;//this.authenticated;
        /* !!!  Change back if authentification is needed. This is debug mode.  !!! */
    }
}

export default new Auth();