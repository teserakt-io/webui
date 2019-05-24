// @flow
import React from 'react'
import { observer } from 'mobx-react'
import KeysTable from './UI/KeysTable'
import ModalProvider from '../common/Modal/ModalProvider'
import CommandHandler from '../../services/handlers/CommandHandler'
// import Services from '../../services/Services'
import { Store } from '../../state/Store'
import AppStrings from '../../utils/AppStrings'
import { NotificationManager } from 'react-notifications'
// import type { SelectOption } from '../common/FormElements/Select/Select'

type Props = {
    store: Store
}

@Store.inject
// @Services.inject([Services.type.COMMAND_HANDLER])
@observer
class KeysTableProvider extends React.Component<Props> {
    addKey = () => {

    };
    removeKey = () => {},

    openModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.KEY_FORM, {
            submit: this.addKey,
            cancel: this.props.store.view.modal.hide,
        })
    };

    render() {
        return (
            <KeysTable
                openModal={this.openModal}
            />
        )
    }
}

export default KeysTableProvider