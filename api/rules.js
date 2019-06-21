import {ae} from './request';

async function get() {
    return ae.get('/rules');
}

async function post() {

}

async function put() {

}
async function remove() {

}
export default {
    get: get,
    post: post,
    put: put,
    remove: remove,
};