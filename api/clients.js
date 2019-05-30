import request from "./request";

async function getClients(offset = 0, count = 0) {
    if(count === 0)
        return await request.get(`/clients/all`);

    return await request.get(`/clients/${offset}/${count}`);
}

async function postClient(name, key) {
    return await request.post(`/client/name/${name}/key/${key}`);
}

async function deleteClient(name) {
    return await request.delete(`/client/name/${name}`);
}

export default {
    get: getClients,
    post: postClient,
    delete: deleteClient,
};