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
import OnPage from "../../Pagination/OnPage";
import Info from "../../common/Info/Info";
import ActionButtons from "../../ActionButtons/ActionButtons";

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
                <div className={'f-l mr-20'}>
                    <TopicNameForm submit={this.props.removeTopic} submitText={'DELETE TOPIC'}/>
                </div>

                <div className="f-r">
                    <OnPage onChange={this.props.handleOnPageChange} options={[10, 50, 100]}/>
                </div>
                <Table>
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>#</TableHeader>
                            <TableHeader>Topic</TableHeader>
                            <TableHeader>Clients</TableHeader>
                            <TableHeader small>Actions</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.topics.map((topic: Topic, index) => (
                            <TableRow key={index}>
                                <TableCell label="#" small center>{offset + index + 1}</TableCell>
                                <TableCell label="Topic">{topic}</TableCell>
                                <TableCell label="Clients">{this.props.joinedClientsCounts[topic] || "-"}</TableCell>
                                <TableCell label="Actions" small center>
                                    <ActionButtons
                                        edit={() => this.props.openModalClients(topic)}
                                        remove={() => this.props.removeTopic(topic)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
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
