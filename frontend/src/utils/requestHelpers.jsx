import { fetchHelpers } from './fetchHelpers';

// Configuración para peticiones GET
export const createGETRequestConfig = (access_token, dataWithoutToken) => {
    const params = new URLSearchParams(dataWithoutToken).toString();
    return {
        method: 'GET',
        headers: {
            'Origin': import.meta.env.VITE_APP_API_BASE_URL,
            'Authorization': access_token ? `Bearer ${access_token}` : undefined,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'X-Data': params,
        },
    };
};

// Configuración para peticiones POST y PUT con archivos
export const createFileRequestConfig = (method, access_token, dataWithoutToken, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const params = new URLSearchParams(dataWithoutToken).toString();
    return {
        method,
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'X-Data': params,
            'Origin': import.meta.env.VITE_APP_API_BASE_URL,
            'Content-Type': 'multipart/form-data; charset=utf-8',
            'Accept': 'application/json; charset=utf-8'
        },
        body: formData
    };
};

// Configuración para peticiones POST y PUT sin archivos
export const createJSONRequestConfig = (method, access_token, dataWithoutToken) => {
    return {
        method,
        headers: {
            'Authorization': access_token ? `Bearer ${access_token}` : undefined,
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'Origin': import.meta.env.VITE_APP_API_BASE_URL
        },
        body: JSON.stringify(dataWithoutToken)
    };
};

// Configuración para peticiones simples
export const createSimpleRequestConfig = (method, newItem) => {
    return {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'Origin': import.meta.env.VITE_APP_API_BASE_URL
        },
        body: JSON.stringify(newItem)
    };
};

const sendRequest = async (url, config) => {
    const response = await fetchHelpers(url, config);
    return response;
};

export const GETRequest = async (url, item) => {
    const { access_token, ...dataWithoutToken } = item || {};
    const config = createGETRequestConfig(access_token, dataWithoutToken);
    return sendRequest(url, config);
};

export const GETSimpleRequest = async (url, item) => {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json; charset=utf-8',
            'Origin': import.meta.env.VITE_APP_API_BASE_URL
        },
    };
    return sendRequest(url, config);
};

export const POSTRequest = async (url, newItem) => {
    const { access_token, ...dataWithoutToken } = newItem || {};
    const config = createJSONRequestConfig('POST', access_token, dataWithoutToken);
    return sendRequest(url, config);
};

export const POSTSimpleRequest = async (url, newItem) => {
    const config = createSimpleRequestConfig('POST', newItem);
    return sendRequest(url, config);
};

export const POSTFileRequest = async (url, newItem, file) => {
    const { access_token, ...dataWithoutToken } = newItem || {};
    const config = createFileRequestConfig('POST', access_token, dataWithoutToken, file);
    return sendRequest(url, config);
};

export const PUTRequest = async (url, newItem) => {
    const { access_token, ...dataWithoutToken } = newItem || {};
    const config = createJSONRequestConfig('PUT', access_token, dataWithoutToken);
    return sendRequest(url, config);
};

export const PUTFileRequest = async (url, newItem, file) => {
    const { access_token, ...dataWithoutToken } = newItem || {};
    const config = createFileRequestConfig('PUT', access_token, dataWithoutToken, file);
    return sendRequest(url, config);
};

export const DELETERequest = async (url, item) => {
    const { access_token, ...dataWithoutToken } = item || {};
    const config = createJSONRequestConfig('DELETE', access_token, dataWithoutToken);
    return sendRequest(url, config);
};
