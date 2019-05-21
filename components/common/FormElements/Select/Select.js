// @flow
import * as React from 'react'
import Select from 'react-select'
import cx from 'classnames'

export type SelectOption = {
    value: any,
    label: string
}

type Props = {
    name: string,
    onChange: Function,
    className?: string,
    value: ?any,
    label?: string,
    options: Array<{
        value: any,
        label: string
    }>
}

class CustomSelect extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('select', {
                [this.props.className || '']: this.props.className
            })
        }

        return (
            <div className="input">
                <label className="input__label" htmlFor={this.props.name}>
                    {this.props.label}
                </label>
                <Select
                    {...this.props}
                    className={classes.root}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    options={this.props.options}/>
            </div>
        )
    }
}

export default CustomSelect