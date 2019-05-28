import request from "./request";

async function getClients(offset = 0, count = 0) {
    if(count === 0)
        return await request.get(`/clients/all`);

    return await request.get(`/clients/${offset}/${count}`);
}

async function deleteClient(name) {
    return await request.delete(`/client/${name}`);
}

export default {
    get: getClients,
    delete: deleteClient,
};