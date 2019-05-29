// @flow
import * as React from 'react'
import Button from '../../common/Buttons/Button/Button'
import Input from '../../common/FormElements/Input/Input'
import CustomSelect from '../../common/FormElements/Select/Select'

type Props = {
    cancel: Function,
    submit: Function,
    clients: Array<string>
}

type SelectOption = {
    label: string,
    value: string
}

type State = {
    topic: ?string,
    key: ?string,
    selectedClients: Array<SelectOption>
}

class TopicForm extends React.Component<Props, State> {
    static formKeys = {
        TOPIC: 'topic',
        KEY: 'key'
    }

    state = {
        [TopicForm.formKeys.TOPIC]: null,
        [TopicForm.formKeys.KEY]: null,
        selectedClients: []
    }

    isInvalid() {
        return true;
        // return Validation.isEmpty(this.state[TopicForm.formKeys.TOPIC])
        //     || Validation.isEmpty(this.state[TopicForm.formKeys.KEY])
    }

    renderClientOptions() {
        return this.props.clients.map((client) => ({
            label: client,
            value: client
        }))
    }

    updateField = (e: Object) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    onSubmit = (e: Object) => {
        e.preventDefault()
        if (this.isInvalid()) return
        const topic = this.state[TopicForm.formKeys.TOPIC]
        const key = this.state[TopicForm.formKeys.KEY]
        this.props.submit(topic, key, this.state.selectedClients)
    }

    onCancel = (e: Object) => {
        e.preventDefault()
        this.props.cancel()
    }

    onSelectChange = (selectedClients: Array<SelectOption>) => {
        this.setState({ selectedClients })
    }

    render() {
        return (
            <React.Fragment>
                <form className="modal__form">
                    <Input
                        id={TopicForm.formKeys.TOPIC}
                        placeholder="Topic"
                        label="Topic"
                        onChange={this.updateField}/>
                    <Input
                        placeholder="Key"
                        label="Key"
                        id={TopicForm.formKeys.KEY}
                        onChange={this.updateField}/>
                    {
                        !!this.props.clients.length &&
                        <CustomSelect
                            isMulti
                            removeSelected
                            name="selectedClients"
                            label="Clients"
                            value={this.state.selectedClients}
                            onChange={this.onSelectChange}
                            options={this.renderClientOptions()}/>
                    }
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

export default TopicForm
