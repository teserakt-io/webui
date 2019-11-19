// @flow
import { observer } from 'mobx-react'
import React from 'react'
import { NotificationManager } from 'react-notifications'
import { Store } from '../../state/Store'
import AppStrings from '../../utils/AppStrings'
import ModalProvider from '../common/Modal/ModalProvider'
import TopicsTable from './UI/TopicsTable'
import type { SelectOption } from 'components/common/FormElements/Select/Select'

type Props = {
    store: Store,
}

@Store.inject
@observer
class TopicsTableProvider extends React.Component<Props> {
    addTopic = (topic: string, key: string, clients: Array<SelectOption>) => {
        this.props.store.domain.topics.add(topic)
            .then(() => {
                NotificationManager.success(AppStrings.TOPIC_ADDED);
            }).catch(() => {
                NotificationManager.error(AppStrings.TOPIC_ADDED_ERROR);
            });
        this.props.store.view.modal.hide();
    };

    removeTopic = (topic: string) => {
        this.props.store.domain.topics.remove(topic)
            .then(() => {
                NotificationManager.success(AppStrings.TOPIC_REMOVED);
            }).catch(() => {
                NotificationManager.error(AppStrings.TOPIC_REMOVED_ERROR);
            });
    };

    openAddTopicForm = () => {
        this.props.store.view.modal.open(ModalProvider.types.TOPIC_FORM, {
            cancel: this.props.store.view.modal.hide,
            submit: this.addTopic,
        })
    };

    componentDidMount() {
        this.props.store.domain.topics.load(true);
        this.props.store.domain.topics.loadCount();
    }

    onPageChange = (page) => {
        this.props.store.domain.topics.changePage(page.selected, true);
    };

    handleOnPageChange = (onPage) => {
        this.props.store.domain.topics.setOnPage(onPage, true);
    };

    openModalClients = (topic) => {
        this.props.store.domain.topics.setCurrent(topic);
        const loadJoinedClients = this.props.store.domain.topics.loadJoinedClients();
        const loadClients = this.props.store.domain.clients.changePage(0);
        Promise.all([loadJoinedClients, loadClients])
            .then(() => {
                this.props.store.view.modal.open(ModalProvider.types.TOPIC_CLIENTS_FORM, {
                    submit: this.storeClients,
                    cancel: this.props.store.view.modal.hide,
                    clients: this.props.store.domain.clients.getClients(),
                    count: this.props.store.domain.clients.getCount(),
                })
            }).catch((e) => {
                console.log(e);
            });
    };

    storeClients = (clients: Array) => {
        this.props.store.domain.topics.setClients(clients.map(client => client.label))
            .then(() => {
                clients.map(client => this.props.store.domain.clients.updateJoinedTopicsCount(client, false))
                this.props.store.view.modal.hide();
                NotificationManager.success(AppStrings.CLIENT_ASSOCIATION_SUCCESS);
            })
            .catch(() => {
                NotificationManager.error(AppStrings.CLIENT_ASSOCIATION_ERROR);
            });
    };

    render() {
        return (
            <TopicsTable
                openModal={this.openAddTopicForm}
                removeTopic={this.removeTopic}
                topics={this.props.store.domain.topics.getTopics()}
                joinedClientsCounts={this.props.store.domain.topics.joinedClientsCounts}
                count={this.props.store.domain.topics.getCount()}
                onPageChange={this.onPageChange}
                onPage={this.props.store.domain.topics.onPage}
                handleOnPageChange={this.handleOnPageChange}
                page={this.props.store.domain.topics.getPage()}
                openModalClients={this.openModalClients}
            />
        )
    }
}

export default TopicsTableProvider
