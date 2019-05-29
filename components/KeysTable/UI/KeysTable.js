// @flow
import React from 'react'
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    // TableCell
} from '../../common/Table'
import Button from '../../common/Buttons/Button/Button'
// import Icon from '../../common/Icon/Icon'

type Props = {
    clients: Array<String>,
    openModal: Function,
    removeClient: Function
}

class KeysTable extends React.Component<Props> {
    // renderClients() {
    //     return this.props.clients.map((client, index) => (
    //         <TableRow key={index}>
    //             <TableCell label="#" small center>{index + 1}</TableCell>
    //             <TableCell label="Client">{client}</TableCell>
    //             <TableCell label="Key">{client}</TableCell>
    //             <TableCell label="Delete" small center>
    //                 <div onClick={() => this.props.removeClient(client)} role="presentation">
    //                     <Icon color="black" className="pointer" d={Icon.d.BIN}/>
    //                 </div>
    //             </TableCell>
    //         </TableRow>
    //     ))
    // }

    render() {
        return (
            <React.Fragment>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>#</TableHeader>
                            <TableHeader>Client</TableHeader>
                            <TableHeader>Key</TableHeader>
                            <TableHeader small>Delete</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/*{this.renderClients()}*/}
                    </TableBody>
                </Table>
                <Button
                    danger
                    uppercase
                    medium
                    className="mt-20"
                    onClick={this.props.openModal}>
                    Add client
                </Button>
            </React.Fragment>
        )
    }
}

export default KeysTable
