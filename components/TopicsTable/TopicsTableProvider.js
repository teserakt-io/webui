// @flow
import * as React from 'react'
import { observer } from 'mobx-react'
import TopicsTable from 'components/TopicsTable/UI/TopicsTable'
import { Store } from 'state/Store'
import Services from 'services/Services'
import CommandHandler from 'services/handlers/CommandHandler'
import { NotificationManager } from 'react-notifications'
import AppStrings from 'utils/AppStrings'
import ModalProvider from 'components/common/Modal/ModalProvider'
import type { SelectOption } from 'components/common/FormElements/Select/Select'

type Props = {
    store: Store,
    services: {
        commandHandler: CommandHandler
    }
}

@Store.inject
@Services.inject([Services.type.COMMAND_HANDLER])
@observer
class TopicsTableProvider extends React.Component<Props> {
    addTopic = (topic: string, key: string, clients: Array<SelectOption>) => {
        this.props.services.commandHandler.addTopic(topic, key)
        this.props.store.view.modal.hide()
        NotificationManager.success(AppStrings.TOPIC_ADDED)
        this.props.services.commandHandler.getTopics()

        if (clients.length) {
            clients.forEach((client) => {
                this.props.services.commandHandler.addTopicClient(topic, client.value)
                this.props.services.commandHandler.getTopicClients(topic)
            })
        }
    }

    removeTopic = (topic: string) => {
        this.props.services.commandHandler.removeTopic(topic)
        NotificationManager.success(AppStrings.TOPIC_REMOVED)
        this.props.services.commandHandler.getTopics()
    }

    openAddClientForm = () => {
        this.props.store.view.modal.open(ModalProvider.types.TOPIC_FORM, {
            cancel: this.props.store.view.modal.hide,
            submit: this.addTopic,
            clients: this.props.store.domain.clients.getClients()
        })
    }

    render() {
        return (
            <TopicsTable
                openModal={this.openAddClientForm}
                removeTopic={this.removeTopic}
                topics={this.props.store.domain.topics.getTopics()}/>
        )
    }
}

export default TopicsTableProvider