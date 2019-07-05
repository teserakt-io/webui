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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

type Props = {
    store: Store,
}

@Store.inject
@observer
class ClientsTableProvider extends React.Component<Props> {
    state = {
        reset: false,
    };
    componentDidMount() {
        this.props.store.domain.clients.load(true);
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
    };

    openModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.CLIENT_FORM, {
            submit: this.addClient,
            cancel: this.props.store.view.modal.hide,
        })
    };

    storeTopics = (topics: Array) => {
        this.props.store.domain.clients.setTopics(topics.map(topic => topic.label))
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
        const loadTopics = this.props.store.domain.topics.changePage(0);
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

    handlePageChange = (page) => {
        this.props.store.domain.clients.changePage(page.selected, true);
    };

    handleOnPage = (onPage) => {
        this.props.store.domain.clients.setOnPage(onPage);
    };

    handleReset = () => {
        const ResetSwal = withReactContent(Swal);
        ResetSwal.fire({
            type: 'warning',
            title: 'Reset all clients?',
            showCancelButton: true,
        }).then((res) => {
            if(res.value) {
                this.props.store.domain.clients.reset();
            }
        })
    };

    render() {
        return (
            <ClientsTable
                removeClient={this.removeClient}
                openModal={this.openModal}
                openModalTopics={this.openModalTopics}
                clients={this.props.store.domain.clients.getClients()}
                joinedTopicsCounts={this.props.store.domain.clients.joinedTopicsCounts}
                count={this.props.store.domain.clients.getCount()}
                handlePageChange={this.handlePageChange}
                handleOnPage={this.handleOnPage}
                page={this.props.store.domain.clients.getPage()}
                handleReset={this.handleReset}
            />
        )
    }
}

export default ClientsTableProvider