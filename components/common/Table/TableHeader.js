// @flow
import cx from 'classnames'
import * as React from 'react'

type Props = {
    children: any,
    small?: ?boolean,
    medium?: ?boolean,
}

class TableHeader extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('table__header', {
                'table__header--small': this.props.small,
                'table__header--center': this.props.center,
                'table__header--medium': this.props.medium,
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
