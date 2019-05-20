import { observable, action } from 'mobx'

export type Topic = {
    name: String,
    clients: ?Array<String>
}

class Topics {
    @observable topics: Array<Topic> = [];

    getTopics = () => this.topics
    countTopics = () => this.topics.length;

    @action
    addTopics(topics) {
        this.topics = topics.map((topic) => ({ name: topic }))
    }

    @action
    addTopicClients(topic, clients) {
        this.topics = this.topics.map((item) => item.name === topic ? { ...item, clients } : item)
    }
}

export default Topics