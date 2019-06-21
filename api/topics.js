import {c2} from './request'
async function get(offset = 0, count = 0) {
    if(count === 0)
        return await c2.get(`/topics/all`);

    return await c2.get(`/topics/${offset}/${count}`);
}

async function post(name) {
    return await c2.post(`/topic/${name}`);
}

async function remove(name) {
    return await c2.delete(`/topic/${name}`);
}

async function count() {
    return await c2.get(`/topics/count`);
}

async function joinedClientsCount(topic) {
    return await c2.get(`/topic/${topic}/clients/count`);
}

async function joinedClients(topic, offset = 0, count = 1) {
    return await c2.get(`/topic/${topic}/clients/${offset}/${count}`);
}

export default {
    get: get,
    post: post,
    put: () => {},
    patch: () => {},
    delete: remove,
    count: count,
    joinedClientsCount: joinedClientsCount,
    joinedClients: joinedClients,
};