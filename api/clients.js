import { c2 } from "./request";

async function getClients(offset = 0, count = 0) {
    return await c2.get(`/e4/clients?offset=${offset}&count=${count}`);
}

async function postClient(name, key) {
    return await c2.post(`/e4/client/${name}`, { key: key });
}

async function deleteClient(name) {
    return await c2.delete(`/e4/client/${name}`);
}

async function count() {
    return await c2.get("/e4/clients/count");
}

async function joinTopic(client, topic) {
    return await c2.put(`/e4/client/${client}/topic/${topic}`);
}

async function splitTopic(client, topic) {
    return await c2.delete(`/e4/client/${client}/topic/${topic}`);
}

async function joinedTopicsCount(client) {
    return await c2.get(`/e4/client/${client}/topics/count`);
}

async function joinedTopics(client, offset = 0, count = 100) {
    return await c2.get(`/e4/client/${client}/topics?offset=${offset}&count=${count}`);
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
