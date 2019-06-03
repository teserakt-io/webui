// @flow
import * as React from 'react'
import Button from '../../common/Buttons/Button/Button'
import Input from '../../common/FormElements/Input/Input'
import CustomSelect from '../../common/FormElements/Select/Select'
import * as validator from "validator";

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
    };

    state = {
        [TopicForm.formKeys.TOPIC]: "",
        selectedClients: []
    };

    isValid() {
        const topic = [TopicForm.formKeys.TOPIC];
        return !validator.isEmpty(topic) && validator.isLength();
        // return Validation.isEmpty(this.state[TopicForm.formKeys.TOPIC])
        //     || Validation.isEmpty(this.state[TopicForm.formKeys.KEY])
    }

    updateField = (e: Object) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (this.isValid()) return;
        const topic = this.state[TopicForm.formKeys.TOPIC];
        this.props.submit(topic)
    };

    onCancel = (e: Object) => {
        e.preventDefault();
        this.props.cancel()
    };

    onSelectChange = (selectedClients: Array<SelectOption>) => {
        this.setState({ selectedClients })
    };

    render() {
        return (
            <React.Fragment>
                <form className="modal__form">
                    <Input
                        id={TopicForm.formKeys.TOPIC}
                        placeholder="Topic"
                        label="Topic"
                        onChange={this.updateField}/>
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

export default TopicForm
