// @flow
import cx from 'classnames';
import * as React from 'react';
import FontAwesome from "react-fontawesome";
import Info from "../../../common/Info/Info";

type Props = {
    id: string,
    type?: string,
    label?: string,
    placeholder?: string,
    error?: string,
    inline?: boolean,
    disabled?: boolean,
    onChange: Function,
    autogen: Function,

}

class Input extends React.Component<Props> {
    static defaultProps = {
        type: 'text'
    }

    render() {
        const classes = {
            label: cx('input__label', {
                'input__label--error': this.props.error
            })
        }

        return (
            <div className={this.props.inline ? 'input-inline' : 'input'}>
                {this.props.label && <label className={classes.label} htmlFor={this.props.id}>
                    {this.props.label}
                    {this.props.autogen &&
                        <span className={'info-container generate-btn'} onClick={this.props.autogen.onClick}>
                            <FontAwesome name={this.props.autogen.icon} className={'pointer'} />
                            <Info text={this.props.autogen.infoMsg} />
                        </span>
                    }
                </label>}
                <input
                    id={this.props.id}
                    className="input__elem"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    type={this.props.type}
                    disabled={this.props.disabled}
                />

                <div>
                    <span className="input__info">{this.props.info}</span>
                    <span className="input__error">{this.props.error}</span>
                </div>
            </div >
        )
    }
}

export default Input
