// @flow
import * as React from 'react'
import cx from 'classnames'

type Props = {
    type: string,
    small: boolean,
    medium: boolean,
    onClick: Function,
    className: string,
    disabled: boolean,
    children: string,
    danger: boolean,
    close?: boolean,
    hasIcon?: boolean,
    primary?: boolean,
    secondary?: boolean,
    white?: boolean,
    uppercase?: boolean
}

const ButtonBase = (props: Props) => {
    const cxClass = cx('btn', {
        [props.className]: props.className,
        'btn--small': props.small,
        'btn--medium': props.medium,
        'btn--disabled': props.disabled,
        'btn--danger': props.danger,
        'btn__close': props.close,
        'btn--icon': props.hasIcon,
        'btn--primary': props.primary,
        'btn--secondary': props.secondary,
        'btn--white': props.white,
        'btn--uppercase': props.uppercase
    })

    return (
        <button
            onClick={props.onClick}
            type={props.type}
            className={cxClass}>
            {props.children}
        </button>
    )
}

export default ButtonBase