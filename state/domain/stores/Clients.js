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
    @observable joinedTopicsCounts = {};
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
    async load(withCounts = false) {
        const offset = this.page * this.onPage;
        const count = this.onPage;
        const { data } = await api.clients.get(offset, count);
        this.clients = data ? data : [];

        this.addLog("load_clients", {
            offset: offset,
            count: count
        });
        if(withCounts) this.updateJoinedTopicsCounts();
    }

    @action
    async changePage(page, withCounts = false) {
        this.page = page;
        await this.load(withCounts);
    }

    @action
    async setOnPage(onPage) {
        this.onPage = onPage;
        this.changePage(0,true);
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
        await this.load();

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
    async updateJoinedTopicsCount(client, cache = true){
        if(cache && this.joinedTopicsCounts[client] !== undefined) return;
        const data = await this.loadJoinedTopicsCount(client);

        this.joinedTopicsCounts = {...this.joinedTopicsCounts, [client]: data};
    }

    @action
    async updateJoinedTopicsCounts() {
        this.clients.map((client) => {
            this.updateJoinedTopicsCount(client);
        });
    }

    @action
    async loadJoinedTopicsCount(client = null) {
        const {data} = await api.clients.joinedTopicsCount(client || this.current);

        this.joinedTopicsCount = data;
        this.addLog("joined_topics_count", {client: client || this.current});

        return data;
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

        const requests = [];
        let changeCount = 0;
        const forCreation = topics.filter(topic => this.joinedTopics.indexOf(topic) === -1);
        const forRemove = this.joinedTopics.filter(joinedTopic => topics.indexOf(joinedTopic) === -1);
        forCreation.map((topic) => {
            const request = this.joinTopic(topic).then(() => {
                this.joinedTopics.push(topic);
                changeCount++;
            }).catch(e => console.log(e));
            requests.push(request);
        });

        forRemove.map(topic => {
            const request = this.splitTopic(topic).then(() => {
                this.joinedTopics.filter(item => item !== topic);
                changeCount--;
            }).catch(e => {
                console.log(e);
            });
            requests.push(request);
        });

        Promise.all(requests)
            .then(() =>
                this.joinedTopicsCounts = {
                ...this.joinedTopicsCounts,
                    [this.current]: this.joinedTopicsCounts[this.current] + changeCount
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

    @action
    async reset() {
        const onRequest = 100;
        for(let i = 0; i < this.count;) {
            const { data } = await api.clients.get(i, onRequest);

            data.map(item => {
                this.deleteClient(item);
            });
        }
    }
}

export default Clients