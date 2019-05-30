// @flow
import React from 'react'
import { observer } from 'mobx-react'
import ClientsTable from './UI/ClientsTable'
import ModalProvider from '../common/Modal/ModalProvider'
import CommandHandler from '../../services/handlers/CommandHandler'
// import Services from '../../services/Services'
import { Store } from '../../state/Store'
import api from '../../api/api';
import AppStrings from '../../utils/AppStrings'
import { NotificationManager } from 'react-notifications'
// import type { SelectOption } from '../common/FormElements/Select/Select'

type Props = {
    store: Store,
    services: {
        commandHandler: CommandHandler
    }
}

@Store.inject
// @Services.inject([Services.type.COMMAND_HANDLER])
@observer
class ClientsTableProvider extends React.Component<Props> {
    async componentDidMount() {
        this.props.store.domain.clients.loadClients();
    }
    addClient = (client: string, key: string) => {
        this.props.store.domain.clients.add(client, key);
    };
    // addClient = (client: string, key: string, topics: Array<SelectOption>) => {
    //     this.props.services.commandHandler.addClient(client, key)
    //     this.props.store.view.modal.hide()
    //     NotificationManager.success(AppStrings.CLIENT_ADDED)
    //     this.props.services.commandHandler.getClients()
    //
    //     if (topics.length) {
    //         topics.forEach((topic) => {
    //             this.props.services.commandHandler.addTopicClient(topic.value, client)
    //             this.props.services.commandHandler.getTopicClients(topic.value)
    //         })
    //     }
    // }
    //
    removeClient = (name: string) => {
        this.props.store.domain.clients.deleteClient(name);
        NotificationManager.success(AppStrings.CLIENT_REMOVED)
    }

    openModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.CLIENT_FORM, {
            submit: this.addClient,
            cancel: this.props.store.view.modal.hide,
            // topics: this.props.store.domain.topics.getTopics()
        })
    };

    render() {
        return (
            <ClientsTable
                removeClient={this.removeClient}
                openModal={this.openModal}
                clients={this.props.store.domain.clients.getClients()}
            />
        )
    }
}

export default ClientsTableProvider