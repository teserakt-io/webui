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

        const options = Array.isArray(this.props.options[0]) ?
            this.props.options.map(item => ({value: item, label: item}))
            : this.props.options;
        const value = typeof this.props.value === "object" ? this.props.value : {
            label: this.props.value,
            value: this.props.value,
        };
        console.log(options);
        return (
            <div className="input">
                <label className="input__label" htmlFor={this.props.name}>
                    {this.props.label}
                </label>
                <Select
                    {...this.props}
                    className={classes.root}
                    name={this.props.name}
                    value={value}
                    onChange={this.props.onChange}
                    options={options}/>
            </div>
        )
    }
}

export default CustomSelect