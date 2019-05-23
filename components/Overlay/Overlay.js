// @flow
import * as React from 'react'
import cx from 'classnames'

type Props = {
    active: boolean,
    close: Function
}

class Overlay extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('overlay', { 'overlay--active': this.props.active })
        }

        return <div className={classes.root} onClick={this.props.close} role="presentation"/>
    }
}

export default Overlay