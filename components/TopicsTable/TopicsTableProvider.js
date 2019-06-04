// @flow
import React from 'react'
import { observer } from 'mobx-react'
import TopicsTable from './UI/TopicsTable'
import { Store } from '../../state/Store'
import { NotificationManager } from 'react-notifications'
import AppStrings from '../../utils/AppStrings'
import ModalProvider from '../common/Modal/ModalProvider'
import type { SelectOption } from 'components/common/FormElements/Select/Select'

type Props = {
    store: Store,
    // services: {
    //     commandHandler: CommandHandler
    // }
}

@Store.inject
// @Services.inject([Services.type.COMMAND_HANDLER])
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
        this.props.store.domain.topics.load();
    }

    render() {
        return (
            <TopicsTable
                openModal={this.openAddTopicForm}
                removeTopic={this.removeTopic}
                topics={this.props.store.domain.topics.getTopics()}/>
        )
    }
}

export default TopicsTableProvider