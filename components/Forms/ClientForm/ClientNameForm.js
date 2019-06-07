//@flow
import React, {Component} from 'react';
import Input from "../../common/FormElements/Input/Input";
import Button from "../../common/Buttons/Button/Button";
import validator from "validator";

type Props = {
    submit: Function,
};

type State = {
    client_name: string,
}

class ClientNameForm extends Component<Props, State> {
    static formKeys = {
        NAME: 'topic_name',
    };

    state = {
        [ClientNameForm.formKeys.NAME]: "",
    };

    isValid() {
        const name = this.state[ClientNameForm.formKeys.NAME];
        return !validator.isEmpty(name) && name.length < 256;
    }

    updateField = (e: Object) =>
        this.setState({
            [e.target.id]: e.target.value
        });

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;
        const name = this.state[ClientNameForm.formKeys.NAME];

        this.props.submit(name)
    };

    render() {
        return (
            <React.Fragment>
                <Input onChange={this.updateField} id={ClientNameForm.formKeys.NAME} inline={true}/>
                <Button disabled={!this.isValid()} onClick={this.onSubmit} medium={true} className={'ml-20'}>
                    {this.props.submitText || 'DELETE CLIENT'}
                </Button>
            </React.Fragment>
        );
    }
}

export default ClientNameForm;