const axios = require('axios');
const instance = axios.create({
    baseURL: '/api',
});

export default instance;