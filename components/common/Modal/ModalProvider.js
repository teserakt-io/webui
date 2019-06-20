// @flow
import React from 'react'
import { observer } from 'mobx-react'
import Overlay from '../../Overlay/Overlay'
import Modal from './UI/Modal'
import ClientForm from '../../Forms/ClientForm/ClientForm'
import TopicForm from '../../Forms/TopicForm/TopicForm'
import KeyForm from '../../Forms/KeyForm/KeyForm'
import { Store } from '../../../state/Store'
import ClientTopicsForm from "../../Forms/ClientForm/ClientTopicsForm";
import TopicClientsForm from "../../Forms/TopicForm/TopicClientsForm";
import RuleForm from "../../Forms/RuleForm/RuleForm";

type Props = {
    store: Store
}

@Store.inject
@observer
class ModalProvider extends React.Component<Props> {
    static types = {
        CLIENT_FORM: 'CLIENT_FORM',
        CLIENT_TOPICS_FORM: 'CLIENT_TOPICS_FORM',
        TOPIC_FORM: 'TOPIC_FORM',
        KEY_FORM: 'KEY_FORM',
        TOPIC_CLIENTS_FORM: 'TOPIC_CLIENTS_FORM',
        RULE_FORM: 'RULE_FORM',
    };

    getModalComponent(modalType: string) {
        switch (modalType) {
            case ModalProvider.types.CLIENT_FORM:
                return ClientForm;
            case ModalProvider.types.CLIENT_TOPICS_FORM:
                return ClientTopicsForm;
            case ModalProvider.types.TOPIC_FORM:
                return TopicForm;
            case ModalProvider.types.TOPIC_CLIENTS_FORM:
                return TopicClientsForm;
            case ModalProvider.types.KEY_FORM:
                return KeyForm;
            case ModalProvider.types.RULE_FORM:
                return RuleForm;
        }
    }

    render() {
        const View = this.getModalComponent(this.props.store.view.modal.modalType);
        return (
            <React.Fragment>
                <Overlay
                    active={this.props.store.view.modal.isModalActive()}
                    close={this.props.store.view.modal.hide}/>
                {
                    this.props.store.view.modal.isModalActive() && View &&
                    <Modal onClose={this.props.store.view.modal.hide}>
                        <View {...this.props.store.view.modal.modalProps}/>
                    </Modal>
                }
            </React.Fragment>
        )
    }
}

export default ModalProvider