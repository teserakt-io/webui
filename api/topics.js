import request from './request'
async function get(offset = 0, count = 0) {
    if(count === 0)
        return await request.get(`/topics/all`);

    return await request.get(`/topics/${offset}/${count}`);
}

async function post(name) {
    return await request.post(`/topic/${name}`);
}

async function remove(name) {
    return await request.delete(`/topic/${name}`);
}

async function count() {
    return await request.get(`/topics/count`);
}

async function joinedClientsCount(topic) {
    return await request.get(`/topic/${topic}/clients/count`);
}

async function joinedClients(topic, offset = 0, count = 1) {
    return await request.get(`/topic/${topic}/clients/${offset}/${count}`);
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