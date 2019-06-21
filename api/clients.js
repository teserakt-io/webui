import { c2 } from "./request";

async function getClients(offset = 0, count = 0) {
    if(count === 0)
        return await c2.get(`/clients/all`);

    return await c2.get(`/clients/${offset}/${count}`);
}

async function postClient(name, key) {
    return await c2.post(`/client/name/${name}/key/${key}`);
}

async function deleteClient(name) {
    return await c2.delete(`/client/name/${name}`);
}

async function count() {
    return await c2.get(`/clients/count`);
}

async function joinTopic(client, topic) {
    return await c2.put(`/client/name/${client}/topic/${topic}`);
}

async function splitTopic(client, topic) {
    return await c2.delete(`/client/name/${client}/topic/${topic}`);
}

async function joinedTopicsCount(client) {
    return await c2.get(`/client/name/${client}/topics/count`);
}

async function joinedTopics(client, offset = 0, count = 100) {
    return await c2.get(`/client/name/${client}/topics/${offset}/${count}`);
}

export default {
    get: getClients,
    post: postClient,
    delete: deleteClient,
    count: count,
    joinTopic: joinTopic,
    splitTopic: splitTopic,
    joinedTopicsCount: joinedTopicsCount,
    joinedTopics: joinedTopics,
};