// @flow
import * as React from 'react'
import ActionButtons from "../../ActionButtons/ActionButtons"
import Button from '../../common/Buttons/Button/Button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/Table'
import OnPage from "../../Pagination/OnPage"
import Pagination from "../../Pagination/Pagination"
import type { Topic } from '../../../state/domain/stores/Topics'

type Props = {
    topics: Array<String>,
    openModal: Function,
    removeTopic: Function,
    openModalClients: Function,
}

class TopicsTable extends React.Component<Props> {
    render() {
        const offset = this.props.page * this.props.onPage;
        return (
            <React.Fragment>
                <Button
                    danger
                    uppercase
                    medium
                    className="mb-20"
                    onClick={this.props.openModal}>
                    Add topic
                </Button>
                <div className="f-r">
                    <OnPage onChange={this.props.handleOnPageChange} options={[10, 50, 100]} />
                </div>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader style={{ width: '8%' }} center>#</TableHeader>
                            <TableHeader medium>Topic</TableHeader>
                            <TableHeader center>#Clients</TableHeader>
                            <TableHeader small center>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.topics.length > 0 && this.props.topics.map((topic: Topic, index) => (
                            <TableRow key={index}>
                                <TableCell label="#" style={{ width: '8%' }} center>{offset + index + 1}</TableCell>
                                <TableCell label="Topic" medium>{topic}</TableCell>
                                <TableCell label="Clients" center>{this.props.joinedClientsCounts[topic] || 0}</TableCell>
                                <TableCell label="Actions" small center>
                                    <ActionButtons
                                        edit={() => this.props.openModalClients(topic)}
                                        remove={() => this.props.removeTopic(topic)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {this.props.topics.length === 0 && (
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
                    onPageChange={this.props.onPageChange}
                    onPage={this.props.onPage}
                    forcePage={this.props.page}
                />
            </React.Fragment>
        )
    }
}

export default TopicsTable
