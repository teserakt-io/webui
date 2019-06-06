// @flow
import React from 'react'
import Button from '../../common/Buttons/Button/Button'
import validator from 'validator';
import type { Topic } from '../../../state/domain/stores/Topics'
import type { SelectOption } from '../../common/FormElements/Select/Select'
import SelectPagination from "../../SelectPagination/SelectPagination";
import { Store } from '../../../state/Store'

type Props = {
    cancel: Function,
    submit: Function,
    topics: Array<Topic>
}

type State = {
    client: ?string,
    key: ?string,
    selectedTopics: Array<SelectOption>
}

@Store.inject
class ClientTopicsForm extends React.Component<Props, State> {
    static formKeys = {
        TOPICS: "topics"
    };

    state = {
        topics: []
    };

    isValid() {
        return true;
    }

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;
        this.props.submit(this.state.topics)
    };

    onCancel = (e: Object) => {
        e.preventDefault();
        this.props.cancel()
    };

    onSelectChange = (topics: Array<SelectOption>) => {
        this.setState({ topics })
    };

    onPageChange = (page) => {
        this.props.store.domain.topics.changePage(page.selected)
            .then(() => {
                this.forceUpdate();
            });
    };

    render() {
        const topics = this.props.store.domain.topics.getTopics();
        return (
            <React.Fragment>
                <form className="modal__form">
                    <SelectPagination
                        items={topics}
                        count={this.props.store.domain.topics.getCount()}
                        onPageChange={this.onPageChange}
                        onSelect={this.onSelectChange}
                        value={this.state.topics}
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

export default ClientTopicsForm;
