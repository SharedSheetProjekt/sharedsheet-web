const axios = require('axios');

const axiosConfig = {
    baseURL: 'https://sharedsheets.henrybrink.de/api',
    timeout: 10000,
    method: 'POST',
};

const request = async (url, params) => {
    return await axios.post(url, null, {...axiosConfig, params: params});
}




export const api_login = async (username, password, device_name) => {
    console.log('api_login...');
    try {
        const response = await request('/users/login', {username: username, password: password, device_name: device_name});
        return response.token;
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
        return response.token;
    } catch (error) {
        console.log(error);
        if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }
    }
}