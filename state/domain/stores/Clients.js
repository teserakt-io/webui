import { observable, action } from 'mobx'
import api from '../../../api/api';

class Clients {
    constructor() {
        this.loadCount();
    }
    @observable clients = [];
    @observable count = 0;
    @observable page = 0;
    @observable onPage = 10;
    @observable current = 0;
    @observable joinedTopics = [];
    @observable joinedTopicsCount = 0;

    getClients = () => this.clients.toJS();
    getCount = () => this.count;
    getPage = () => this.page;
    getCurrent = () => this.current;
    getJoinedTopics = () => this.joinedTopics;

    @action
    async loadCount() {
        const {data} = await api.clients.count();

        this.count = data;
    }
    @action
    addClients(clients) {
        this.clients = clients
    }

    @action
    async loadClients() {
        const offset = this.page * this.onPage;
        const count = this.onPage;
        const { data, status } = await api.clients.get(offset, count);

        this.clients = data ? data : [];
    }

    @action
    async changePage(page) {
        this.page = page;
        await this.loadClients();
    }

    @action
    async add(name, key) {
        const { data, status } = await api.clients.post(name, key);

        this.clients.push(name);
        this.count++;
    }

    @action
    async deleteClient(name) {
        const {data, status} = await api.clients.delete(name);
        await this.loadClients();

        this.count--;
        if(this.clients.length === 0 && this.page !== 0)
            this.changePage(this.page - 1)
    }

    @action
    setCurrent(client) {
        this.current = client;
    }

    @action
    async loadJoinedTopicsCount() {
        const {data} = await api.clients.joinedTopicsCount(this.current);

        this.joinedTopicsCount = data;
    }
    @action
    async loadJoinedTopics() {
        this.joinedTopics = [];
        await this.loadJoinedTopicsCount(this.current);
        const onRequest = 100;
        for(let i = 0; i < this.joinedTopicsCount; i += onRequest) {
            const {data} = await api.clients.joinedTopics(this.current, i, onRequest);
            this.joinedTopics.push(...data);
        }
    }

    @action
    async setTopics(topics) {
        if(this.getJoinedTopics().length === 0)
            await this.loadJoinedTopics();

        const forCreation = topics.filter(topic => this.joinedTopics.indexOf(topic) === -1);
        const forRemove = this.joinedTopics.filter(joinedTopic => topics.indexOf(joinedTopic) === -1);
        forCreation.map((topic) => {
            this.joinTopic(topic).then(() => {
                this.joinedTopics.push(topic);
            }).catch(e => console.log(e));
        });

        forRemove.map(topic => {
            this.splitTopic(topic).then(() => {
                this.joinedTopics.filter(item => item !== topic);
            }).catch(e => {
                console.log(e);
            });
        });
    }

    @action
    async joinTopic(topic) {
        api.clients.joinTopic(this.current, topic);
    }

    @action
    async splitTopic(topic) {
        api.clients.splitTopic(this.current, topic);
    }

    @action
    splitTopics(topic) {

    }

    @action
    splitAllTopics() {
        this.joinedTopics.map((item) => {
            this.spitTopics(item);
        });
    }
}

export default Clients