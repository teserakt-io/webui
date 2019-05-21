// @flow
import * as React from 'react'

type Props = {
    children: any
}

class TableBody extends React.Component<Props> {
    render() {
        return (
            <tbody>
                {this.props.children}
            </tbody>
        )
    }
}

export default TableBody
