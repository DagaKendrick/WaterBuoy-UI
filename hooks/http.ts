import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cite-ustpcdo.com/api/v1/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default api;