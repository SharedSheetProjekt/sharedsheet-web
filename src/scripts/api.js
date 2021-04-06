const axios = require('axios');

const axiosConfig = {
    baseURL: 'https://sharedsheets.henrybrink.de/api',
    timeout: 10000,
};

const request = async (url, params, method) => {
    if (method === 'GET') {
        return await axios.get(url, null, {...axiosConfig, params: params});
    } else {
        return await axios.post(url, null, {...axiosConfig, params: params});
    }
}




export const api_login = async (username, password) => {
    console.log('api_login...');
    try {
        const response = await request('/users/login/web', {username: username, password: password});
        const token = response.data.token;
        axios.defaults.headers.common = {'Authoriztion': `Bearer ${token}`};
        return token;
    } catch (error) {
        console.log(error);
        if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }
    }
}

export const api_register = async (username, password, email, device_name, secret) => {
    console.log('api_register...');
    try {
        const response = await request('/users/register', {username: username, password: password, email: email, device_name: device_name, secret: secret});
        const token = response.data.token;
        axios.defaults.headers.common = {'Authoriztion': `Bearer ${token}`};
        return token;
    } catch (error) {
        console.log(error);
        if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }
    }
}

export const api_logout = async () => {
    console.log('api_logout...');
    try {
        const response = await request('/users/logout/web', null, 'GET');
        return (response.status === 200);
    } catch (error) {
        console.log(error);
        if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }
    }
}