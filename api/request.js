const url = 'https://34.90.149.110:8765/e4';
const axios = require('axios');
const instance = axios.create({
    baseURL: '/api',
});

export default instance;