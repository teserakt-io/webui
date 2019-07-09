// @flow
import React from 'react'
import cx from 'classnames'
import Icon from '../Icon/Icon'

type Props = {
    red?: boolean,
    blue?: boolean,
    darkBlue?: boolean,
    icon: string,
    title: string | number,
    desc?: string,
    className?: string,
    large?: Boolean,
}

class Card extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('card-container', {
                'card--large': this.props.large,
                'card--medium': this.props.medium,
            }),
            card: cx('card', {
                'card--red': this.props.red,
                'card--blue': this.props.blue,
                'card--blue-dark': this.props.darkBlue,
                'card--white': this.props.white,
                [this.props.className || '']: this.props.className
            })
        }

        return (
            <div className={classes.root}>
                <div className={classes.card}>
                    <div className="card__info info">
                        <span className="info__title">{this.props.title.toString()}</span>
                        <span className="info__desc">{this.props.desc}</span>
                    </div>
                    {this.props.faIcon}
                    {this.props.icon && <Icon
                        className="card__icon"
                        d={this.props.icon}
                        viewBoxX={34}
                        viewBoxY={36}
                        height={50}
                        maxWidth={50}
                        minWidth={50}/>}
                </div>
            </div>
        )
    }
}

export default Card