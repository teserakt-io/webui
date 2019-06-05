import {observable, action, computed} from 'mobx'
import api from "../../../api/api";

export type Topic = {
    name: String,
    clients: ?Array<String>
}

class Topics {
    @observable topics: Array<Topic> = [];
    @observable count = 0;
    @observable page = 0;
    @observable onPage = 10;

    getTopics = () => this.topics;
    getCount = () => this.count;
    getPage = () => this.page;

    @action
    async loadCount() {
        const {data} = await api.topics.count();

        this.count = data;
    }

    @action
    async load() {
        const offset = this.page * this.onPage;
        const count = this.onPage;
        const { data } = await api.topics.get(offset, count);

        this.topics = data ? data : [];
    }

    @action
    async changePage(page) {
        this.page = page;
        this.load();
    }


    @action
    addTopics(topics) {
        this.topics = topics.map((topic) => ({ name: topic }))
    }

    @action
    addTopicClients(topic, clients) {
        this.topics = this.topics.map((item) => item.name === topic ? { ...item, clients } : item)
    }

    @action
    async add(name) {
        const {data} = await api.topics.post(name);

        this.topics.push(name);
        this.count++;
    }

    @action
    async remove(name) {
        const {data} = await api.topics.delete(name);
        await this.load();

        this.count--;
        if(this.topics.length === 0 && this.page !== 0)
            this.changePage(this.page - 1)
    }
}

export default Topics