const debugMode = false;

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
            return await axios.post(url, params, null);
            break;
        case 'POST_UPLOAD':
            return await axios.post(url, params, {headers: {'Content-Type': 'multipart/form-data'}})
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

/**************************************************************************
                            USER AUTHENTICATION API
 **************************************************************************/

export const api_login = async (username, password) => {
    if (debugMode) console.log('api_login...');
    try {
        const response = await request('/users/login/web', {username: username, password: password});
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (error) {
        if (debugMode) console.log(error);
        /*if (error.response.data.status === 'error') {
            if (debugMode) console.log(error.response.data.errors);
        }*/
    }
}

export const api_register = async (username, password, email, device_name, secret) => {
    if (debugMode) console.log('api_register...');
    try {
        const response = await request('/users/register', {username: username, password: password, email: email, device_name: device_name, secret: secret});
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return token;
    } catch (error) {
        if (debugMode) console.log(error);
        /*if (error.response.data.status === 'error') {
            if (debugMode) console.log(error.response.data.errors);
        }*/
    }
}

export const api_logout = async () => {
    if (debugMode) console.log('api_logout...');
    try {
        const response = await request('/users/logout/web', null, 'GET');
        const status = (response.status === 204);
        if (status) axios.defaults.headers.common['Authorization'] = null;
        return (status);
    } catch (error) {
        if (debugMode) console.log(error);
        /*if (error.response.data.status === 'error') {
            if (debugMode) console.log(error.response.data.errors);
        }*/
    }
}

/**************************************************************************
                                SHEET API
 **************************************************************************/

export const api_load_available_sheets = async () => {
    if (debugMode) console.log('api_load_available_sheets');
    try {
        const response = await request('/sheets', null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_load_sheet_by_id = async (id) => {
    if (debugMode) console.log('api_load_sheet_by_id');
    try {
        const response = await request(`/sheets/${id}`, null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_create_new_sheet = async (title, description, due) => {
    if (debugMode) console.log('api_create_new_sheet');
    try {
        const response = await request('/sheets', {title: title, description: description, due: due}, 'POST');
        return response.data.id;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_delete_sheet = async (id) => {
    if (debugMode) console.log('api_delete_sheet');
    try {
        const response = await request(`/sheets/${id}`, null, 'DELETE');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        //if (debugMode) console.log(error);
    }
}

/**************************************************************************
                                WIDGET API
 **************************************************************************/

export const api_create_new_widget = async (sheetID, widgetObj) => {
    if (debugMode) console.log('api_create_new_widget');
    try {
        const response = await request(`/sheets/${sheetID}/widgets`, widgetObj, 'POST');
        const status = (response.status === 201);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_update_widget = async (widgetID, widgetObj) => {
    if (debugMode) console.log('api_update_widget');
    try {
        const response = await request(`/widgets/${widgetID}`, widgetObj, 'PUT');
        const status = (response.status === 200);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_move_widget = async (widgetID, direction) => {
    if (debugMode) console.log('api_move_widget');
    try {
        const response = await request(`/widgets/${widgetID}/move`, {direction: direction}, 'POST');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_load_widget_by_id = async (id) => {
    if (debugMode) console.log('api_load_widget_by_id');
    try {
        const response = await request(`/widgets/${id}`, null, 'GET');
        return response.data;
    } catch (error) {
        // TODO: Fix error (code: 405)
        if (debugMode) console.log(error);
    }    
}

export const api_delete_widget = async (id) => {
    if (debugMode) console.log('api_delete_widget');
    try {
        const response = await request(`/widgets/${id}`, null, 'DELETE');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

/**************************************************************************
                                COURSE API
 **************************************************************************/

export const api_load_available_courses = async () => {
    if (debugMode) console.log('api_load_available_courses');
    try {
        const response = await request('/courses', null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_create_new_course = async (courseName) => {
    if (debugMode) console.log('api_create_new_course');
    try {
        const response = await request('/courses', {name: courseName}, 'POST');
        const status = (response.status === 201);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_load_course_by_id = async (courseID) => {
    if (debugMode) console.log('api_load_course_by_id');
    try {
        const response = await request(`/courses/${courseID}`, null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_delete_course = async (courseID) => {
    if (debugMode) console.log('api_delete_course');
    try {
        const response = await request(`/courses/${courseID}`, null, 'DELETE');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_create_new_invite_token = async (courseID) => {
    if (debugMode) console.log('api_create_new_invite_token');
    try {
        const response = await request(`/courses/${courseID}/invites`, null, 'POST');
        return response.data?.token;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_join_course_with_token = async (inviteToken) => {
    if (debugMode) console.log('api_join_course_with_token');
    try {
        const response = await request(`/courses/join`, {token: inviteToken}, 'POST');
        return response.status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

/**************************************************************************
                                SOLUTION API
 **************************************************************************/

export const api_load_solutions_by_widget_id = async (widgetId) => {
    if (debugMode) console.log('api_load_solutions_by_widget_id');
    try {
        const response = await request(`/widgets/${widgetId}/solutions`, null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_load_all_available_solutions_by_sheet_id = async (sheetId) => {
    if (debugMode) console.log('api_load_all_available_solutions_by_sheet_id');
    try {
        const response = await request(`/sheets/${sheetId}/solutions`, null, 'GET');
        return response.data;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_create_new_solution = async (widgetId, type, contentObj) => {
    if (debugMode) console.log('api_create_new_solution');
    try {
        const response = await request(`/widgets/${widgetId}/solutions`, {type: type, content: contentObj}, 'POST');
        const status = (response.status === 201);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_upload_new_solution = async (widgetId, formData) => {
    if (debugMode) console.log('api_upload_new_solution');
    try {
        const response = await request(`/widgets/${widgetId}/solutions/upload`, formData, 'POST_UPLOAD');
        const status = (response.status === 201);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}

export const api_download_solution_by_solution_id = async (solutionId) => {
    if (debugMode) console.log('api_download_solution_by_solution_id');
    try {
        const response = await request(`/solutions/${solutionId}/download`, null, 'GET');
        if (debugMode) console.log(response)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const fileType = response.headers['content-disposition'].split('.')[1];
        link.setAttribute('download', `${solutionId}.${fileType}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        return true;
    } catch (error) {
        if (debugMode) console.log(error);
    }    
}

export const api_delete_solution = async (solutionID) => {
    if (debugMode) console.log('api_delete_solution');
    try {
        const response = await request(`/solutions/${solutionID}`, null, 'DELETE');
        const status = (response.status === 204);
        return status;
    } catch (error) {
        if (debugMode) console.log(error);
    }
}
