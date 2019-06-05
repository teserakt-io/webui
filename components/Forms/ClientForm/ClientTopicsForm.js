// @flow
import * as React from 'react'
import Button from '../../common/Buttons/Button/Button'
import Input from '../../common/FormElements/Input/Input'
import CustomSelect from '../../common/FormElements/Select/Select'
import validator from 'validator';
import type { Topic } from '../../../state/domain/stores/Topics'
import type { SelectOption } from '../../common/FormElements/Select/Select'
import {generateKey} from "../../../utils/generator";

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

class ClientTopicsForm extends React.Component<Props, State> {
    static formKeys = {
        TOPICS: "topics"
    };

    state = {
        topics: []
    };

    renderTopicOptions() {
        return this.props.topics.map((topic) => ({
            label: topic,
            value: topic
        }))
    }

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

    render() {
        return (
            <React.Fragment>
                <form className="modal__form">
                    <CustomSelect
                        isMulti
                        removeSelected
                        name="selectedTopic"
                        label="Topic"
                        value={this.state.topics}
                        onChange={this.onSelectChange}
                        options={this.renderTopicOptions()}/>

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
