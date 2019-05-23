// @flow
import SocketManagement from '../socket/SocketManagement'
import DomainStore from '../../state/domain/DomainStore'

class CommandHandler {
    socketManagement: SocketManagement
    domainStore: DomainStore

    commandTypes = {
        CLIENT_ADD: 'new_client',
        CLIENT_LIST: 'all_list',
        CLIENT_REMOVE: 'remove_client',
        TOPIC_ADD: 'new_topic',
        TOPIC_REMOVE: 'remove_topic',
        TOPIC_LIST: 'topic_list',
        TOPIC_CLIENT_ADD: 'new_topic_client',
        TOPIC_CLIENT_REMOVE: 'remove_topic_client',
        TOPIC_CLIENT_LIST: 'topic_client_list'
    }

    constructor(socketManagement: SocketManagement, domainStore: DomainStore) {
        this.socketManagement = socketManagement
        this.domainStore = domainStore
    }

    addClient(client: string, key: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.CLIENT_ADD,
            Id: client,
            Key: key
        })
    }

    getClients() {
        this.socketManagement.send({
            CmdType: this.commandTypes.CLIENT_LIST
        })
    }

    removeClient(client: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.CLIENT_REMOVE,
            Id: client
        })
    }

    addTopic(topic: string, key: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.TOPIC_ADD,
            Topic: topic,
            Key: key
        })
    }

    removeTopic(topic: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.TOPIC_REMOVE,
            Topic: topic
        })
    }

    getTopics() {
        this.socketManagement.send({
            CmdType: this.commandTypes.TOPIC_LIST
        })
    }

    addTopicClient(topic: string, client: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.TOPIC_CLIENT_ADD,
            Topic: topic,
            ID: client
        })
    }

    getTopicClients(topic: string) {
        this.socketManagement.send({
            CmdType: this.commandTypes.TOPIC_CLIENT_LIST,
            Topic: topic
        })
    }
}

export default CommandHandler