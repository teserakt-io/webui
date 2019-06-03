import request from './request'
async function get(offset = 0, count = 0) {
    if(count === 0)
        return await request.get(`/topics/all`);

    return await request.get(`/topics/${offset}/${count}`);
}

async function remove(name) {
    return await request.delete(`/topic/${name}`);
}

export default {
    get: get,
    post: () => {},
    put: () => {},
    patch: () => {},
    delete: remove,
};