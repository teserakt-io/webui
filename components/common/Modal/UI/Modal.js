// @flow
import * as React from 'react'
import Icon from '../../../common/Icon/Icon'

type Props = {
    children?: any,
    onClose: Function
}

class InnerModal extends React.Component<Props> {
    render() {
        return (
            <div className="modal-wrapper">
                {this.props.children}
            </div>
        )
    }
}

class Modal extends React.Component<Props> {
    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <div className="modal__close"
                    onClick={this.props.onClose}
                    role="presentation">
                    <Icon height={40} maxWidth={40} d={Icon.d.CLOSE}/>
                </div>
                <div id="modal-container" className="modal-container modal-container-hrc">
                    <InnerModal onClose={this.props.onClose}>
                        {this.props.children}
                    </InnerModal>
                </div>
            </React.Fragment>
        )
    }
}

export default Modal