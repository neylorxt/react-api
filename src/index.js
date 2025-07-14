// index.js
import axios from 'axios';

/**
 * Send data using axios
 * @typedef {Object} Options
 * @property {string} method - HTTP method ('get', 'post', etc.)
 * @property {object} data - Data to send (for POST, PUT, etc.)
 * @property {object} config - Axios config (headers, withCredentials, etc.)

 /**
 * Unified Axios request wrapper
 * @param {string} url - Endpoint URL
 * @param {Options} [options={}]
 *
 *
 *
 * // GET simple sans params
 * await sendRequest('/api/users');
 *
 * // POST avec données
 * await sendRequest('/api/user', {
 *   method: 'post',
 *   data: { username: 'neylorxt' }
 * });
 *
 * // PUT avec token
 * await sendRequest('/api/user/1', {
 *   method: 'put',
 *   data: { username: 'updatedName' },
 *   config: {
 *     headers: {
 *       Authorization: `Bearer ${token}`,
 *       'Content-Type': 'application/json',
 *     },
 *   }
 * });
 *
 *
 *
 */

const Arraymethod = ["get", "post", "put", "delete"];

export async function sendRequest(url, options= {}) {

    const {
        method = "get",
        data = {},
        params = {},
        config = {},
    } = options;

    const lowerMethod = method.toLowerCase();

    if (!Arraymethod.includes( lowerMethod )) {
        throw new Error(`Method ${method} is not supported`);
    }

    try {
        const axiosOptions = {
            url,
            method: lowerMethod,
            ...config,
        };

        if (["get"].includes(lowerMethod)) {
            axiosOptions.params = params;
        } else {
            axiosOptions.data = data;
            axiosOptions.params = params; // pour inclure les query même en POST
        }

        const response = await axios(axiosOptions);

        if (typeof response.data === "string" && response.data.includes("<!doctype html")) {
            throw new Error("HTML response received");
        }

        return {
            success: true,
            status: response.status,
            data: response.data,
            headers: response.headers
        };

    } catch (error) {
        return formatAxiosError(error);
    }
}



/**
 * send data using axios
 * @typedef {Object} Options
 * @property {string} method - HTTP method ('get', 'post', etc.)
 * @property {object} data - Data to send (for POST, PUT, etc.)
 * @property {object} config - Axios config (headers, withCredentials, etc.)

 /**
 * Unified Axios request wrapper
 * @param {string} url - Endpoint URL
 * @param {Options} [options={}]
 *
 *
 *
 * // GET simple sans params
 * await sendRequest('/api/users');
 *
 * // POST avec données
 * await sendRequest('/api/user', {
 *   method: 'post',
 *   data: { username: 'neylorxt' }
 * });
 *
 * // PUT avec token
 * await sendRequest('/api/user/1', {
 *   method: 'put',
 *   data: { username: 'updatedName' },
 *   config: {
 *     headers: {
 *       Authorization: `Bearer ${token}`,
 *       'Content-Type': 'application/json',
 *     },
 *      params: {
 *       debug: true,
 *       lang: 'fr'
 *     }
 *
 *   }
 * });
 *
 */
export async function sendData(url, options= {}) {
    try {
        const {
            data = {},
            config = {},
        } = options;

        const { method, data:_ignored, ...safeConfig } = config; // on retire toute méthode fournie

        const axiosConfig = {
            ...safeConfig,
            params: config.params || {}
        };

        const response = await axios.post(url, data, axiosConfig); // ✅ config peut inclure params & headers

        return {
            success: true,
            status: response.status,
            data: response.data,
            headers: response.headers
        };

    } catch (error){
        return formatAxiosError(error);
    }
}




/**
 * update data using axios
 * @typedef {Object} Options
 * @property {string} method - HTTP method ('get', 'post', etc.)
 * @property {object} data - Data to send (for POST, PUT, etc.)
 * @property {object} config - Axios config (headers, withCredentials, etc.)

 /**
 * Unified Axios request wrapper
 * @param {string} url - Endpoint URL
 * @param {Options} [options={}]
 *
 *
 *
 * // GET simple sans params
 * await sendRequest('/api/users');
 *
 * // POST avec données
 * await sendRequest('/api/user', {
 *   method: 'post',
 *   data: { username: 'neylorxt' }
 * });
 *
 * // PUT avec token
 * await sendRequest('/api/user/1', {
 *   method: 'put',
 *   data: { username: 'updatedName' },
 *   config: {
 *     headers: {
 *       Authorization: `Bearer ${token}`,
 *       'Content-Type': 'application/json',
 *     },
 *     params: {
 *       debug: true,
 *       lang: 'fr'
 *     }
 *
 *   }
 * });
 *
 *
 *
 */
export async function updateData(url, options= {}) {
    try {
        const {
            data = {},
            config = {},
        } = options;

        const { method, data:_ignored, ...safeConfig } = config; // on retire toute méthode fournie

        const axiosConfig = {
            ...safeConfig,
            params: config.params || {}
        };

        const response = await axios.put(url, data, axiosConfig); // ✅ config peut inclure headers + params

        return {
            success: true,
            status: response.status,
            data: response.data,
            headers: response.headers
        };

    } catch (error) {

        return formatAxiosError(error);
    }
}

/**
 * delete data using axios
 * @typedef {Object} Options
 * @property {string} method - HTTP method ('get', 'post', etc.
 * @property {object} config - Axios config (headers, withCredentials, etc.)

 /**
 * Unified Axios request wrapper
 * @param {string} url - Endpoint URL
 * @param {Options} [options={}]
 *
 *
 *
 * // GET simple sans params
 * await sendRequest('/api/users');
 *
 * // POST avec données
 * await sendRequest('/api/user', {
 *   method: 'post',
 *   data: { username: 'neylorxt' }
 * });
 *
 * // PUT avec token
 * await sendRequest('/api/user/1', {
 *   method: 'put',
 *   data: { username: 'updatedName' },
 *   config: {
 *     headers: {
 *       Authorization: `Bearer ${token}`,
 *       'Content-Type': 'application/json',
 *     },
 *     params: {
 *       debug: true,
 *       lang: 'fr'
 *     }
 *
 *   }
 * });
 *
 *
 *
 */

export async function deleteData(url, options= {}) {
    try {
        const {
            config = {},
        } = options;

        const { method, data:_ignored, ...safeConfig } = config; // on retire toute méthode fournie

        const axiosConfig = {
            ...safeConfig,
            params: config.params || {}
        };

        const response = await axios.delete(url, axiosConfig); // ✅ config peut inclure headers + params

        return {
            success: true,
            status: response.status,
            data: response.data,
            headers: response.headers
        };

    } catch (error) {

        return formatAxiosError(error);
    }
}




/**
 * Receive data using axios (GET)
 * @param {string} url - The endpoint URL
 * @param {object} [config={}] - Axios config (headers, params, etc.)
 *
 * Exemple :
 *
 *
 * await getData("https://api.example.com/items", {
 *   params: { page: 2, sort: "desc" },
 *   headers: { Authorization: `Bearer ${token}` }
 * });
 *
 *
 */
export async function getData(url, config = {}) {
    try {

        const { method, data, ...safeConfig } = config; // on retire toute méthode fournie

        const axiosConfig = {
            ...safeConfig,
            params: config.params || {} // s'assurer que params existe
        };

        const response = await axios.get(url, axiosConfig);

        return {
            success: true,
            status: response.status,
            data: response.data,
            headers: response.headers
        };

    } catch (error) {
        return formatAxiosError(error);
    }
}



function formatAxiosError(error) {
    if (error.response) {
        return {
            success: false,
            status: error.response.status,
            data: error.response.data,
            errorMessage: error.message,
            errorType: 'HTTP_ERROR'
        };
    } else if (error.request) {
        return {
            success: false,
            status: 0,
            data: null,
            errorMessage: 'Network Error - Unable to reach server',
            errorType: 'NETWORK_ERROR',
            originalError: error.message
        };
    } else {
        return {
            success: false,
            status: 0,
            data: null,
            errorMessage: error.message,
            errorType: 'CONFIG_ERROR'
        };
    }
}