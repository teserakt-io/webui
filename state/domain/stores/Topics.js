import {observable, action, computed} from 'mobx'
import api from "../../../api/api";
import {Store} from "../../Store";

export type Topic = {
    name: String,
    clients: ?Array<String>
}

class Topics {
    @observable topics: Array<Topic> = [];
    @observable count = 0;
    @observable page = 0;
    @observable onPage = 10;
    @observable current = 0;
    @observable joinedClients = [];
    @observable joinedClientsCount = 0;
    @observable joinedClientsCounts = {};
    logger = null;

    constructor() {
        this.loadCount();
    }

    getTopics = () => this.topics.toJS();
    getCount = () => this.count;
    getPage = () => this.page;
    getJoinedClients = () => this.joinedClients;

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
        const {data} = await api.topics.count();

        this.count = data;
        this.addLog("topics_count");
    }

    @action
    async load(withCounts = false) {
        const offset = this.page * this.onPage;
        const count = this.onPage;
        const {data} = await api.topics.get(offset, count);
        this.addLog("get_topics", {
            offset: offset,
            count: count,
        });

        this.topics = data ? data : [];
        if(withCounts) this.updateJoinedClientsCounts();
    }

    @action
    async changePage(page, withCounts = false) {
        this.page = page;
        await this.load(withCounts);
    }

    @action
    setOnPage(onPage, withCounts = false) {
        this.onPage = onPage;
        this.changePage(0, withCounts);
    }


    @action
    addTopics(topics) {
        this.topics = topics.map((topic) => ({ name: topic }))
    }

    @action
    async add(name) {
        const {data} = await api.topics.post(name);

        this.topics.push(name);
        this.count++;
        this.addLog("add_topic", {name: name});
    }

    @action
    async remove(name) {
        const {data} = await api.topics.delete(name);
        await this.load();

        this.count--;
        if(this.topics.length === 0 && this.page !== 0)
            this.changePage(this.page - 1)
        this.addLog("remove_topic", {name: name})
    }

    @action
    setCurrent(topic) {
        this.current = topic;
    }

    @action
    async loadJoinedClientsCount(topic = null) {
        const {data} = await api.topics.joinedClientsCount(topic || this.current);

        this.joinedClientsCount = data;
        this.addLog("joined_clients_count", {topic: topic || this.current});

        return data;
    }
    @action
    async loadJoinedClients() {
        this.joinedClients = [];
        await this.loadJoinedClientsCount(this.current);
        const onRequest = 100;
        for(let i = 0; i < this.joinedClientsCount; i += onRequest) {
            const {data} = await api.topics.joinedClients(this.current, i, onRequest);
            this.joinedClients.push(...data);
            this.addLog("get_joined_clients", {
                topic: this.current,
                offset: i,
                count: onRequest,
            })
        }
    }

    @action
    async updateJoinedClientCount(topic, cache = true){
        if(cache && this.joinedClientsCounts[topic] !== undefined) return;
        const data = await this.loadJoinedClientsCount(topic);

        this.joinedClientsCounts = {...this.joinedClientsCounts, [topic]: data};
    }

    @action
    async updateJoinedClientsCounts() {
        this.topics.map((topic) => {
            this.updateJoinedClientCount(topic);
        });
    }

    @action
    async setClients(clients) {
        if(this.getJoinedClients().length === 0)
            await this.loadJoinedClients();

        const requests = [];
        let changeCount = 0;
        const forCreation = clients.filter(client => this.joinedClients.indexOf(client) === -1);
        const forRemove = this.joinedClients.filter(joinedClient => clients.indexOf(joinedClient) === -1);
        forCreation.map((client) => {
            requests.push(this.joinClient(client).then(() => {
                this.joinedClients.push(client);
                changeCount++;
            }));
        });
        forRemove.map(client => {
            requests.push(this.splitClient(client).then(() => {
                this.joinedClients.filter(item => item !== client);
                changeCount--;
            }));
        });

        Promise.all(requests)
            .then(() =>
                this.joinedClientsCounts = {
                ...this.joinedClientsCounts,
                    [this.current]: this.joinedClientsCounts[this.current] + changeCount
            });
    }

    @action
    async joinClient(client) {
        await api.clients.joinTopic(client, this.current);
        this.addLog("join_client", {
            topic: this.current,
            client: client,
        })
    }

    @action
    async splitClient(client) {
        await api.clients.splitTopic(client, this.current);
        this.addLog("split_client", {
            topic: this.current,
            client: client,
        })
    }

    @action
    async reset() {
        const onRequest = 100;
        for(let i = 0; i < this.count;) {
            const { data } = await api.topics.get(i, onRequest);

            data.map(item => {
                this.remove(item);
            });
        }
    }
}

export default Topics