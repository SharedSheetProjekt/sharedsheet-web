const axios = require('axios');
axios.defaults.baseURL = 'https://sharedsheets.henrybrink.de/api';
axios.defaults.timeout = 10000;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const request = async (url, params, method) => {
    switch (method) {
        case 'GET':
            return await axios.get(url, null, {params: params});
            break;
        case 'POST':
            return await axios.post(url, null, {params: params});
            break;
        case 'PUT':
            return await axios.put(url, null, {params: params});
            break;
        case 'DELETE':
            return await axios.delete(url, null, {params: params});
            break;
    
        default:
            return await axios.post(url, null, {params: params});
            break;
    }
}

export const setAuthenticationToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export const api_login = async (username, password) => {
    console.log('api_login...');
    try {
        const response = await request('/users/login/web', {username: username, password: password});
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (error) {
        console.log(error);
        /*if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }*/
    }
}

export const api_register = async (username, password, email, device_name, secret) => {
    console.log('api_register...');
    try {
        const response = await request('/users/register', {username: username, password: password, email: email, device_name: device_name, secret: secret});
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (error) {
        console.log(error);
        /*if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }*/
    }
}

export const api_logout = async () => {
    console.log('api_logout...');
    try {
        const response = await request('/users/logout/web', null, 'GET');
        console.log(response);
        const status = (response.status === 204);
        if (status) axios.defaults.headers.common['Authorization'] = null;
        return (status);
    } catch (error) {
        console.log(error);
        /*if (error.response.data.status === 'error') {
            console.log(error.response.data.errors);
        }*/
    }
}

export const api_load_available_sheets = async () => {
    console.log('api_load_available_sheets');
    try {
        const response = await request('/sheets', null, 'GET');
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

export const api_load_sheet_by_id = async (id) => {
    console.log('api_load_sheet_by_id');
    try {
        const response = await request(`/sheets/${id}`, null, 'GET');
        return response.data;
    } catch (error) {
        console.log(error);
    }    
}

export const api_create_new_sheet = async (title, description, due) => {
    console.log('api_create_new_sheet');
    try {
        const response = await request('/sheets', {title: title, description: description, due: due}, 'POST');
        return response.data.id;
    } catch (error) {
        console.log(error);
    }
}

export const api_delete_widget = async (id) => {
    console.log('api_delete_widget');
    try {
        const response = await request(`/widgets/${id}`, null, 'DELETE');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        console.log(error);
    }
}

