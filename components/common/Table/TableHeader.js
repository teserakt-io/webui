// @flow
import * as React from 'react'
import cx from 'classnames'

type Props = {
    children: any,
    small: ?boolean
}

class TableHeader extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('table__header', {
                'table__header--small': this.props.small
            })
        }

        return (
            <th className={classes.root} style={this.props.style}>
                {this.props.children}
            </th>
        )
    }
}

export default TableHeader
