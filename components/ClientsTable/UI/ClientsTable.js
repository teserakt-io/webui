// @flow
import React from 'react';
import ActionButtons from "../../ActionButtons/ActionButtons";
import Button from '../../common/Buttons/Button/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/Table';
import ClientNameForm from "../../Forms/ClientForm/ClientNameForm";
import OnPage from "../../Pagination/OnPage";
import Pagination from "../../Pagination/Pagination";

type Props = {
    clients: Array<String>,
    openModal: Function,
    removeClient: Function,
}

class ClientsTable extends React.Component<Props> {
    render() {
        const offset = this.props.onPage * this.props.page;
        return (
            <React.Fragment>
                <Button
                    danger
                    uppercase
                    medium
                    className="mb-20"
                    onClick={this.props.openModal}>
                    Add client
                </Button>
                <div style={{ float: 'left' }} className={'mr-20'}>
                    <ClientNameForm submit={this.props.removeClient} submitText={'DELETE CLIENT'} />
                </div>

                <div className={'f-r'}>
                    <OnPage onChange={this.props.handleOnPage} options={[10, 50, 100]} />
                </div>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader style={{ width: '5%' }} center>#</TableHeader>
                            <TableHeader medium>Client</TableHeader>
                            <TableHeader center>#Topics</TableHeader>
                            <TableHeader small center>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.clients.length > 0 && this.props.clients.map((client, index) => (
                            <TableRow key={index}>
                                <TableCell label="#" style={{ width: '5%' }} center>{offset + index + 1}</TableCell>
                                <TableCell label="Client" medium>{client}</TableCell>
                                <TableCell label="Topics" center>{this.props.joinedTopicsCounts[client] || 0}</TableCell>
                                <TableCell label="Actions" small center className={'actions'}>
                                    <ActionButtons
                                        edit={() => this.props.openModalTopics(client)}
                                        remove={() => this.props.removeClient(client)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {this.props.clients.length === 0 && (
                            <TableRow>
                                <TableCell center colSpan="4">
                                    <i>Nothing yet !</i>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Pagination
                    count={this.props.count}
                    onPage={this.props.onPage}
                    onPageChange={this.props.handlePageChange}
                    forcePage={this.props.page}
                />
                <div className={'f-r'}>
                    <Button
                        danger
                        uppercase
                        medium
                        className="mt-15"
                        onClick={this.props.handleReset}>
                        Reset
                        </Button>
                </div>
            </React.Fragment>
        )
    }
}

export default ClientsTable
