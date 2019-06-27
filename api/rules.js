import {ae} from './request';

async function get() {
    return ae.get('/rules');
}

async function post(action, description, triggers = [], targets = []) {
    return ae.post('/rules', {
        action,
        description,
        triggers,
        targets
    });
}

async function put() {

}
async function remove(id) {
    return await ae.delete(`/rules/${id}`);
}

export default {
    get: get,
    post: post,
    put: put,
    remove: remove,
};