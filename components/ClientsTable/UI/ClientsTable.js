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
import Pagination from "../../Pagination/Pagination";
import FontAwesome from 'react-fontawesome';
import OnPage from "../../Pagination/OnPage";

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
                <TableCell label="Topics">{this.props.joinedTopicsCounts[client] || "-"}</TableCell>
                <TableCell label="Actions" small center className={'actions'}>
                    <span onClick={() => this.props.openModalTopics(client)}>
                        <FontAwesome name={'file'} className={'pointer'}/>
                    </span>
                    <span onClick={() => this.props.removeClient(client)} role="presentation">
                        <Icon color="black" className="pointer" d={Icon.d.BIN}/>
                    </span>
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
                    className="mb-20"
                    onClick={this.props.openModal}>
                    Add client
                </Button>
                <div style={{float: 'left'}} className={'mr-20'}>
                    <ClientNameForm submit={this.props.removeClient} submitText={'DELETE CLIENT'}/>
                </div>

                <div className={'f-r'}>
                    <OnPage onChange={this.props.handleOnPage} options={[10, 50, 100]}/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>#</TableHeader>
                            <TableHeader>Client</TableHeader>
                            <TableHeader>Topics</TableHeader>
                            <TableHeader small>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderClients()}
                    </TableBody>
                </Table>
                <Pagination
                    count={this.props.count}
                    onPageChange={this.props.handlePageChange}
                    forcePage={this.props.page}
                    className={'f-l'}
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
