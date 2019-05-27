// @flow
import * as React from 'react'
import Button from '../../common/Buttons/Button/Button'
import Input from '../../common/FormElements/Input/Input'
import CustomSelect from '../../common/FormElements/Select/Select'
import Validation from '../../../utils/Validation'
import type { Topic } from '../../../state/domain/stores/Topics'
import type { SelectOption } from '../../common/FormElements/Select/Select'

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
    }

    state = {
        [ClientForm.formKeys.CLIENT]: null,
        [ClientForm.formKeys.KEY]: null,
        selectedTopics: []
    }

    renderTopicOptions() {
        return this.props.topics.map((topic) => ({
            label: topic.name,
            value: topic.name
        }))
    }

    isInvalid() {
        return Validation.isEmpty(this.state[ClientForm.formKeys.CLIENT])
            || Validation.isEmpty(this.state[ClientForm.formKeys.KEY])
    }

    updateField = (e: Object) =>
        this.setState({
            [e.target.id]: e.target.value
        });

    onSubmit = (e: Object) => {
        e.preventDefault()
        if (this.isInvalid()) return
        const client = this.state[ClientForm.formKeys.CLIENT]
        const key = this.state[ClientForm.formKeys.KEY]
        this.props.submit(client, key, this.state.selectedTopics)
    }

    onCancel = (e: Object) => {
        e.preventDefault()
        this.props.cancel()
    }

    onSelectChange = (selectedTopics: Array<SelectOption>) => {
        this.setState({ selectedTopics })
    }

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
                        onChange={this.updateField}/>
                    {/*{*/}
                    {/*    !!this.props.topics.length &&*/}
                    {/*    <CustomSelect*/}
                    {/*        isMulti*/}
                    {/*        removeSelected*/}
                    {/*        name="selectedTopic"*/}
                    {/*        label="Topic"*/}
                    {/*        value={this.state.selectedTopics}*/}
                    {/*        onChange={this.onSelectChange}*/}
                    {/*        options={this.renderTopicOptions()}/>*/}
                    {/*}*/}
                    <div className="btn-control">
                        <Button small secondary onClick={this.onCancel}>
                            Cancel
                        </Button>
                        <Button small disabled={this.isInvalid()} onClick={this.onSubmit}>
                            Submit
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default ClientForm
