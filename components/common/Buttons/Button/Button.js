// @flow
import * as React from 'react'
import ButtonBase from 'components/common/Buttons/ButtonBase/ButtonBase'

type Props = {
    type?: string,
    small?: boolean,
    active?: boolean,
    medium?: boolean,
    onClick?: Function,
    className?: string,
    disabled?: boolean,
    children: any,
    close?: boolean,
    danger?: boolean,
    hasIcon?: boolean,
    primary?: boolean,
    secondary?: boolean,
    white?: boolean,
    uppercase?: boolean
}

const Button = (props: Props) => (
    <ButtonBase
        {...props}
        small={props.small}
        onClick={props.onClick}
        disabled={props.disabled}
        className={props.className}
        danger={props.danger}
        hasIcon={props.hasIcon}
        primary={props.primary}
        uppercase={props.uppercase}
        secondary={props.secondary}
    />
)

export default Button