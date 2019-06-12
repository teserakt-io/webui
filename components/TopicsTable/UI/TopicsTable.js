// @flow
import * as React from 'react'
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
import type { Topic } from '../../../state/domain/stores/Topics'
import ClientNameForm from "../../Forms/ClientForm/ClientNameForm";
import TopicForm from "../../Forms/TopicForm/TopicForm";
import TopicNameForm from "../../Forms/TopicForm/TopicNameForm.js";
import Pagination from "../../Pagination/Pagination";
import FontAwesome from "react-fontawesome";

type Props = {
    topics: Array<String>,
    openModal: Function,
    removeTopic: Function,
    openModalClients: Function,
}

class TopicsTable extends React.Component<Props> {
    renderClients() {
        console.log();
        return this.props.topics.map((topic: Topic, index) => (
            <TableRow key={index}>
                <TableCell label="#" small center>{index + 1}</TableCell>
                <TableCell label="Topic">{topic}</TableCell>
                <TableCell label="Clients">{this.props.joinedClientsCounts[topic] || "-"}</TableCell>
                <TableCell label="Delete" small center>
                    <span onClick={() => this.props.openModalClients(topic)}>
                        <FontAwesome name={'file'} className={'pointer'}/>
                    </span>
                    <span onClick={() => this.props.removeTopic(topic)} role="presentation">
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
                    Add topic
                </Button>
                <div style={{float: 'left', marginRight: '20px'}}>
                    <TopicNameForm submit={this.props.removeTopic} submitText={'DELETE TOPIC'}/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>#</TableHeader>
                            <TableHeader>Topic</TableHeader>
                            <TableHeader>Clients</TableHeader>
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
                    forcePage={this.props.page}
                />
            </React.Fragment>
        )
    }
}

export default TopicsTable
