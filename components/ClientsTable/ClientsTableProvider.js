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

type Props = {
    store: Store,
}

@Store.inject
// @Services.inject([Services.type.COMMAND_HANDLER])
@observer
class ClientsTableProvider extends React.Component<Props> {
    async componentDidMount() {
        this.props.store.domain.clients.loadClients();
        this.props.store.domain.clients.loadCount();
    }
    addClient = (client: string, key: string) => {
        this.props.store.view.modal.hide();
        this.props.store.domain.clients.add(client, key);
        NotificationManager.success(AppStrings.CLIENT_ADDED);
    };

    removeClient = (name: string) => {
        this.props.store.domain.clients.deleteClient(name).then(() => {
                NotificationManager.success(AppStrings.CLIENT_REMOVED)
        }).catch(() => {
            NotificationManager.error(AppStrings.CLIENT_REMOVED_ERROR);
        });
    }

    openModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.CLIENT_FORM, {
            submit: this.addClient,
            cancel: this.props.store.view.modal.hide,
        })
    };

    storeTopics = (topics: Array) => {
        this.props.store.domain.clients.setTopics(topics.map(topic => topic.value))
            .then(() => {
                this.props.store.view.modal.hide();
                NotificationManager.success(AppStrings.TOPICS_ASSOCIATION_SUCCESS);
            })
            .catch(() => {
                NotificationManager.error(AppStrings.TOPICS_ASSOCIATION_ERROR);
            });
    };

    openModalTopics = (client) => {
        this.props.store.domain.clients.setCurrent(client);
        const loadJoinedTopics = this.props.store.domain.clients.loadJoinedTopics();
        const loadTopics = this.props.store.domain.topics.load();
        Promise.all([loadJoinedTopics, loadTopics])
            .then(() => {
            this.props.store.view.modal.open(ModalProvider.types.CLIENT_TOPICS_FORM, {
                submit: this.storeTopics,
                cancel: this.props.store.view.modal.hide,
                topics: this.props.store.domain.topics.getTopics(),
                count: this.props.store.domain.topics.getCount(),
            })
        }).catch((e) => {
            console.log(e);
        });
    };

    onPageChange = (page) => {
        this.props.store.domain.clients.changePage(page.selected);
    }

    render() {
        return (
            <ClientsTable
                removeClient={this.removeClient}
                openModal={this.openModal}
                openModalTopics={this.openModalTopics}
                clients={this.props.store.domain.clients.getClients()}
                count={this.props.store.domain.clients.getCount()}
                onPageChange={this.onPageChange}
                page={this.props.store.domain.clients.getPage()}
            />
        )
    }
}

export default ClientsTableProvider