// @flow
import * as React from 'react'

type Props = {
    children: any,
    border: ?boolean
}

class TableRow extends React.Component<Props> {
    render() {
        return (
            <tr className="table__row">
                {this.props.children}
            </tr>
        )
    }
}

export default TableRow
