// @flow
import DomainStore from '../../state/domain/DomainStore'

export type ResponseMsg = {
    MsgType: string,
    Content: Array<string>
}

class MessageHandler {
    domainStore: DomainStore

    static messageTypes = {
        CLIENTS: 'all_clients',
        TOPICS: 'topic_list',
        TOPIC_CLIENTS: 'topic_client_list'
    }

    constructor(domainStore: DomainStore) {
        this.domainStore = domainStore
    }

    processMessage(message: ResponseMsg) {
        switch (message.MsgType) {
            case MessageHandler.messageTypes.CLIENTS:
                this.processClients(message.Content)
                break
            case MessageHandler.messageTypes.TOPICS:
                this.processTopics(message.Content)
                break
            case MessageHandler.messageTypes.TOPIC_CLIENTS:
                this.processTopicClients('todo', message.Content)
                break
        }
    }

    processClients(clients: Array<string>) {
        this.domainStore.clients.addClients(clients)
    }

    processTopics(topics: Array<string>) {
        this.domainStore.topics.addTopics(topics)
    }

    processTopicClients(topic: string, clients: Array<string>) {
        this.domainStore.topics.addTopicClients(topic, clients)
    }
}

export default MessageHandler