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

type Props = {
    topics: Array<String>,
    openModal: Function,
    removeTopic: Function
}

class TopicsTable extends React.Component<Props> {
    renderClients() {
        return this.props.topics.map((topic: Topic, index) => (
            <TableRow key={index}>
                <TableCell label="#" small center>{index + 1}</TableCell>
                <TableCell label="Topic">{topic}</TableCell>
                <TableCell label="Clients">-</TableCell>
                <TableCell label="Delete" small center>
                    <div onClick={() => this.props.removeTopic(topic)} role="presentation">
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
                    className="mb-20"
                    onClick={this.props.openModal}>
                    Add topic
                </Button>
                <div style={{float: 'right'}}>
                    <TopicNameForm submit={this.props.removeTopic}/>
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
            </React.Fragment>
        )
    }
}

export default TopicsTable
