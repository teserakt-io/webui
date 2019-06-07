// @flow
import React from 'react'
import Button from '../../common/Buttons/Button/Button'
import validator from 'validator';
import type { SelectOption } from '../../common/FormElements/Select/Select'
import SelectPagination from "../../SelectPagination/SelectPagination";
import { Store } from '../../../state/Store'

type Props = {
    cancel: Function,
    submit: Function,
    clients: Array,
}

type State = {
    clients: ?string,
}

@Store.inject
class TopicClientsForm extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        const clients = this.props.store.domain.topics.getJoinedClients().map(client => ({label: client, value: client}));
        this.state = {
            clients: clients,
        };
    }

    static formKeys = {
        CLIENTS: "clients"
    };

    isValid() {
        return true;
    }

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;
        this.props.submit(this.state.clients)
    };

    onCancel = (e: Object) => {
        e.preventDefault();
        this.props.cancel()
    };

    onSelectChange = (clients: Array<SelectOption>) => {
        this.setState({ clients })
    };

    onPageChange = (page) => {
        this.props.store.domain.clients.changePage(page.selected)
            .then(() => {
                this.forceUpdate();
            });
    };

    render() {
        const clients = this.props.store.domain.clients.getClients();
        return (
            <React.Fragment>
                <form className="modal__form">
                    <SelectPagination
                        items={clients}
                        count={this.props.store.domain.clients.getCount()}
                        onPageChange={this.onPageChange}
                        onSelect={this.onSelectChange}
                        value={this.state.clients}
                    />
                    <div className="btn-control">
                        <Button small secondary onClick={this.onCancel}>
                            Cancel
                        </Button>
                        <Button small disabled={!this.isValid()} onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default TopicClientsForm;
