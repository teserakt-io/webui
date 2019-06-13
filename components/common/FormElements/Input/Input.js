// @flow
import * as React from 'react'
import cx from 'classnames'

type Props = {
    id: string,
    type?: string,
    label?: string,
    placeholder?: string,
    error?: string,
    inline?: boolean,
    onChange: Function
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
                </label>}
                <input
                    id={this.props.id}
                    className="input__elem"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    type={this.props.type}/>
                <span className="input__error">{this.props.error}</span>
            </div>
        )
    }
}

export default Input