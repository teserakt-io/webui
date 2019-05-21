// @flow
import * as React from 'react'

type Props = {
    children: any
}

class TableHead extends React.Component<Props> {
    render() {
        return (
            <thead className="table__head">
                {this.props.children}
            </thead>
        )
    }
}

export default TableHead
