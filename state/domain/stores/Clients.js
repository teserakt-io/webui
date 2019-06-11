import { observable, action } from 'mobx'
import api from '../../../api/api';
import {Store} from "../../Store";

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
    logger = null;

    getClients = () => this.clients.toJS();
    getCount = () => this.count;
    getPage = () => this.page;
    getCurrent = () => this.current;
    getJoinedTopics = () => this.joinedTopics;

    addLog(cmd, payload = {}) {
        if(this.logger === null)
            this.logger = Store.getInstance().domain.log;

        this.logger.addLog({
            date: new Date,
            cmd: cmd,
            payload: payload,
        });
    }

    @action
    async loadCount() {
        const {data} = await api.clients.count();

        this.count = data;
        this.addLog("clients_count");
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

        this.addLog("load_clients", {
            offset: offset,
            count: count
        });
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

        this.addLog("add_client", {name: name});
    }

    @action
    async deleteClient(name) {
        const {data, status} = await api.clients.delete(name);
        await this.loadClients();

        this.count--;
        if(this.clients.length === 0 && this.page !== 0)
            this.changePage(this.page - 1)

        this.addLog("remove_client", {name: name});
    }

    @action
    setCurrent(client) {
        this.current = client;
    }

    @action
    async loadJoinedTopicsCount() {
        const {data} = await api.clients.joinedTopicsCount(this.current);

        this.joinedTopicsCount = data;
        this.addLog("joined_topics_count", {client: this.current});
    }
    @action
    async loadJoinedTopics() {
        this.joinedTopics = [];
        await this.loadJoinedTopicsCount(this.current);
        const onRequest = 100;
        for(let i = 0; i < this.joinedTopicsCount; i += onRequest) {
            const {data} = await api.clients.joinedTopics(this.current, i, onRequest);
            this.joinedTopics.push(...data);

            this.addLog("get_joined_topics", {
                client: this.current,
                offset: i,
                count: onRequest,
            })
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
        await api.clients.joinTopic(this.current, topic);

        this.addLog("join_topic", {
            client: this.current,
            topic: topic,
        })
    }

    @action
    async splitTopic(topic) {
        await api.clients.splitTopic(this.current, topic);
        this.addLog("split_topic", {
            client: this.current,
            topic: topic,
        })
    }

    @action
    splitAllTopics() {
        this.joinedTopics.map((item) => {
            this.spitTopics(item);
        });
    }
}

export default Clients