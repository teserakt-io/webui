const axios = require('axios');
export const c2 = axios.create({
    baseURL: '/c2',
});
export const ae = axios.create({
    baseURL: '/ae'
});