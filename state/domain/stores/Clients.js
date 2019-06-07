import { observable, action } from 'mobx'
import api from '../../../api/api';

class Clients {
    @observable clients = [];
    @observable count = 0;
    @observable page = 0;
    @observable onPage = 10;
    @observable currentClient = 0;
    @observable joinedTopics = [];

    getClients = () => this.clients.toJS();
    getCount = () => this.count;
    getPage = () => this.page;
    getCurrent = () => this.currentClient;
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
        this.loadClients();
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
        this.currentClient = client;
    }

    @action
    async loadJoinedTopics() {
        const {data} = await api.clients.joinedTopics(this.currentClient);

        this.joinedTopics = data;
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
            });
        });
        forRemove.map(topic => {
            this.splitTopic(topic).then(() => {
                this.joinedTopics.filter(item => item !== topic);
            });
        });
    }

    @action
    async joinTopic(topic) {
        api.clients.joinTopic(this.currentClient, topic);
    }

    @action
    async splitTopic(topic) {
        api.clients.splitTopic(this.currentClient, topic);
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