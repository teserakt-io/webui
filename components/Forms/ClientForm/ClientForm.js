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

class ClientForm extends React.Component<Props, State> {
    static formKeys = {
        CLIENT: 'client',
        KEY: 'key'
    };

    state = {
        [ClientForm.formKeys.CLIENT]: "",
        [ClientForm.formKeys.KEY]: "",
        selectedTopics: []
    };

    renderTopicOptions() {
        return this.props.topics.map((topic) => ({
            label: topic.name,
            value: topic.name
        }))
    }

    isValid() {
        const client = this.state[ClientForm.formKeys.CLIENT];
        const key = this.state[ClientForm.formKeys.KEY];
        return !validator.isEmpty(client) &&
            (validator.isLength(client, {min: 1, max: 64})) &&
            (key.length === 0 || (key.length === 64 && validator.isHexadecimal(key)));
    }

    updateField = (e: Object) =>
        this.setState({
            [e.target.id]: e.target.value
        });

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;
        const client = this.state[ClientForm.formKeys.CLIENT];
        let key = this.state[ClientForm.formKeys.KEY];
        if(key.length === 0)
            key = generateKey();

        this.props.submit(client, key, this.state.selectedTopics)
    };

    onCancel = (e: Object) => {
        e.preventDefault();
        this.props.cancel()
    };

    render() {
        return (
            <React.Fragment>
                <form className="modal__form">
                    <Input
                        id={ClientForm.formKeys.CLIENT}
                        placeholder="Client"
                        label="Client"
                        onChange={this.updateField}/>
                    <Input
                        placeholder="Key"
                        label="Key"
                        id={ClientForm.formKeys.KEY}
                        info={'Empty or 64 hexadecimals'}
                        onChange={this.updateField}/>
                    <div className="btn-control">
                        <Button type={'button'} small secondary onClick={this.onCancel}>
                            Cancel
                        </Button>
                        <Button type={'submit'} small disabled={!this.isValid()} onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ClientForm
