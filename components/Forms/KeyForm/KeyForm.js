// @flow
import * as React from 'react'
import Button from '../../common/Buttons/Button/Button'
import Input from '../../common/FormElements/Input/Input'
import Validation from '../../../utils/Validation'
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

class KeyForm extends React.Component<Props, State> {
    // static formKeys = {
    //     TOPIC: 'topic',
    //     KEY: 'key'
    // }
    //
    // state = {
    //     [KeyForm.formKeys.TOPIC]: null,
    //     [KeyForm.formKeys.KEY]: null,
    //     selectedClients: []
    // }
    //
    // isInvalid() {
    //     return Validation.isEmpty(this.state[KeyForm.formKeys.TOPIC])
    //         || Validation.isEmpty(this.state[KeyForm.formKeys.KEY])
    // }
    // updateField = (e: Object) => {
    //     this.setState({
    //         [e.target.id]: e.target.value
    //     })
    // }
    //
    // onSubmit = (e: Object) => {
    //     e.preventDefault()
    //     if (this.isInvalid()) return
    //     const topic = this.state[KeyForm.formKeys.TOPIC]
    //     const key = this.state[KeyForm.formKeys.KEY]
    //     this.props.submit(topic, key, this.state.selectedClients)
    // }

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

export default KeyForm
