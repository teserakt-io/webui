//@flow
import React, { Component } from 'react';
import validator from "validator";
import Button from "../../common/Buttons/Button/Button";
import Input from "../../common/FormElements/Input/Input";

type Props = {
    submit: Function,
    submitText: string,
};

type State = {
    topic_name: string,
}

class TopicNameForm extends Component<Props, State> {
    static formKeys = {
        NAME: 'topic_name',
    };

    state = {
        [TopicNameForm.formKeys.NAME]: "",
    };

    isValid() {
        const name = this.state[TopicNameForm.formKeys.NAME];
        return !validator.isEmpty(name) && name.length < 256;
    }

    updateField = (e: Object) =>
        this.setState({
            [e.target.id]: e.target.value
        });

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;
        const name = this.state[TopicNameForm.formKeys.NAME];

        this.props.submit(name)
    };

    render() {
        return (
            <React.Fragment>
                <Input autoFocus={true} onChange={this.updateField} id={TopicNameForm.formKeys.NAME} inline={true} />
                <Button disabled={!this.isValid()} onClick={this.onSubmit} medium={true} className={'ml-20'}>
                    {this.props.submitText || 'DELETE'}
                </Button>
            </React.Fragment>
        );
    }
}

export default TopicNameForm;
