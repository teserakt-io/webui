// @flow
import { observer } from 'mobx-react';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../common/Table';
import type { LogType } from 'state/domain/stores/Log';
let moment = require('moment');

type Props = {
    logs: Array<LogType>
}

@observer
class LogTable extends React.Component<Props> {

    // Convert raw payload to user friendly messages
    messageMap = {
        'add_client': (payload) => (<i>Created client <i className="client">{payload.name}</i></i>),
        'remove_client': (payload) => (<i>Removed client <i className="client">{payload.name}</i></i>),
        'join_topic': (payload) => (<i>Client <i className="client">{payload.client}</i> joined topic <i className="topic">{payload.topic}</i></i>),
        'split_topic': (payload) => (<i>Client <i className="client">{payload.client}</i> left topic <i className="topic">{payload.topic}</i></i>),
        'add_topic': (payload) => (<i>Created topic <i className="topic">{payload.name}</i></i>),
        'remove_topic': (payload) => (<i>Removed topic <i className="topic">{payload.name}</i></i>),
        'join_client': (payload) => (<i>Client <i className="client">{payload.client}</i> joined topic <i className="topic">{payload.topic}</i></i>),
        'split_client': (payload) => (<i>Client <i className="client">{payload.client}</i> left topic <i className="topic">{payload.topic}</i></i>),

        'add_rule': (payload) => (<i>Created automation rule <i className="rule">#{payload.id}</i></i>),
        'edit_rule': (payload) => (<i>Edited automation rule <i className="rule">#{payload.id}</i></i>),
        'remove_rule': (payload) => (<i>Removed automation rule <i className="rule">#{payload.id}</i></i>),
    }

    renderLogs() {
        if (this.props.logs.length === 0) {
            return (
                <TableRow >
                    <TableCell center colSpan="2">
                        <i>Nothing yet !</i>
                    </TableCell>
                </TableRow>
            )
        }

        return this.props.logs.map((log, index) => {
            if (this.messageMap[log.cmd] === undefined) {
                console.log('no defined message exists for command ' + log.cmd)
                return
            }

            return (
                <TableRow key={index} >
                    <TableCell label="Date">
                        <span>{moment(log.date).format("YYYY-MM-DD HH:MM:SS")}</span>
                    </TableCell>
                    <TableCell label="Event">
                        {this.messageMap[log.cmd](log.payload)}
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div id="logs">
                <Table className="mt-40">
                    <TableHead>
                        <TableRow border>
                            <TableHeader small>Date-time</TableHeader>
                            <TableHeader>Event</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderLogs()}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default LogTable
