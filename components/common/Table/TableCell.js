// @flow
import cx from 'classnames'
import * as React from 'react'

type Props = {
    children: any,
    small?: ?boolean,
    medium?: ?boolean,
    center?: ?boolean,
    label: ?string,
    colSpan: ?string
}

class TableCell extends React.Component<Props> {
    render() {
        const classes = {
            root: cx('table__cell', {
                'table__cell--small': this.props.small,
                'table__cell--center': this.props.center,
                'table__header--medium': this.props.medium,
            })
        }

        return (
            <td colSpan={this.props.colSpan} className={classes.root} data-label={this.props.label}>
                {this.props.children}
            </td>
        )
    }
}

export default TableCell
