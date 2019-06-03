import { observable, action } from 'mobx'
import api from "../../../api/api";

export type Topic = {
    name: String,
    clients: ?Array<String>
}

class Topics {
    @observable topics: Array<Topic> = [];

    getTopics = () => this.topics
    countTopics = () => this.topics.length;

    @action
    async load() {
        const { data } = await api.topics.get();

        this.topics = data ? data : [];
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
    async remove(name) {
        const {data} = await api.topics.delete(name);
        this.topics = this.topics.filter(item => item !== name);
    }
}

export default Topics