import { c2 } from './request';
async function get(offset = 0, count = 0) {
    return await c2.get(`/e4/topics?offset=${offset}&count=${count}`);
}

async function post(name) {
    return await c2.post(`/e4/topic/${name}`);
}

async function remove(name) {
    return await c2.delete(`/e4/topic/${name}`);
}

async function count() {
    return await c2.get(`/e4/topics/count`);
}

async function joinedClientsCount(topic) {
    return await c2.get(`/e4/topic/${topic}/clients/count`);
}

async function joinedClients(topic, offset = 0, count = 1) {
    return await c2.get(`/e4/topic/${topic}/clients?offset=${offset}&count=${count}`);
}

export default {
    get: get,
    post: post,
    put: () => { },
    patch: () => { },
    delete: remove,
    count: count,
    joinedClientsCount: joinedClientsCount,
    joinedClients: joinedClients,
};
