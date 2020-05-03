import axios from "axios";
import { REACT_APP_API_URL } from './config'
const getUrl = endpoint => REACT_APP_API_URL + endpoint;

export const post = async (endpoint, data) => {
    const url = getUrl(endpoint);
    return axios.post(url, data, {
        headers: { "Content-Type": "application/json" }
    });
};

export const get = async (endpoint) => {
    const url = getUrl(endpoint);
    return axios.get(url);
};


