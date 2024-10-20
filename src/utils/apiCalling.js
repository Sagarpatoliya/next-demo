import axios from 'axios';

// Base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(API_BASE_URL , "API_BASE_URLAPI_BASE_URLAPI_BASE_URL")
// Create an instance of axios with custom config (if needed)
const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + token, // Add token if required
    }
});

// GET request
export const getData = async (endpoint, params = {}) => {
    try {
        const response = await apiInstance.get(endpoint, { params });
        console.log(response , "<-----response")
        return response.data;
    } catch (error) {
        console.error('GET Error:', error);
        throw error;
    }
};

// POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await apiInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('POST Error:', error);
        throw error;
    }
};

// PUT request
export const putData = async (endpoint, data) => {
    try {
        const response = await apiInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('PUT Error:', error);
        throw error;
    }
};

// DELETE request
export const deleteData = async (endpoint) => {
    try {
        const response = await apiInstance.delete(endpoint);
        return response.data;
    } catch (error) {
        console.error('DELETE Error:', error);
        throw error;
    }
};

// Custom request (for PATCH, etc.)
export const customRequest = async (method, endpoint, data, config = {}) => {
    try {
        const response = await apiInstance({
            method,
            url: endpoint,
            data,
            ...config
        });
        return response.data;
    } catch (error) {
        console.error(`${method} Error:`, error);
        throw error;
    }
};
