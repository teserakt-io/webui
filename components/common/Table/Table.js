// @flow
import * as React from 'react'
import cx from 'classnames'

type Props = {
    children: any,
    className: ?String
}

class Table extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('table', {
                [this.props.className]: this.props.className
            })
        }

        return (
            <table className={classes.root}>
                {this.props.children}
            </table>
        )
    }
}

export default Table
