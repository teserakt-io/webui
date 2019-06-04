// @flow
import React from 'react'
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell
} from '../../common/Table'
import Button from '../../common/Buttons/Button/Button'
import Icon from '../../common/Icon/Icon'
import ClientNameForm from "../../Forms/ClientForm/ClientNameForm";
import ReactPaginate from 'react-paginate';
import Pagination from "../../Pagination/Pagination";

type Props = {
    clients: Array<String>,
    openModal: Function,
    removeClient: Function,
}

class ClientsTable extends React.Component<Props> {
    renderClients() {
        return this.props.clients.map((client, index) => (
            <TableRow key={index}>
                <TableCell label="#" small center>{index + 1}</TableCell>
                <TableCell label="Client">{client}</TableCell>
                <TableCell label="Delete" small center>
                    <div onClick={() => this.props.removeClient(client)} role="presentation">
                        <Icon color="black" className="pointer" d={Icon.d.BIN}/>
                    </div>
                </TableCell>
            </TableRow>
        ))
    }

    render() {
        return (
            <React.Fragment>
                <Button
                    danger
                    uppercase
                    medium
                    className="mb-20 mt-5"
                    onClick={this.props.openModal}>
                    Add client
                </Button>
                <div style={{float: 'right'}}>
                    <ClientNameForm submit={this.props.removeClient}/>
                </div>

                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>#</TableHeader>
                            <TableHeader>Client</TableHeader>
                            <TableHeader small>Delete</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderClients()}
                    </TableBody>
                </Table>
                <Pagination
                    count={this.props.count}
                    onPageChange={this.props.onPageChange}
                    forcePage={this.props.page}/>
            </React.Fragment>
        )
    }
}

export default ClientsTable
