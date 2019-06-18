// @flow
import React from 'react'
import { observer } from 'mobx-react'
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
    TableRow
} from '../../common/Table';
import type { LogType } from 'state/domain/stores/Log';
import dynamic from 'next/dynamic';
const ReactJson = dynamic(import('react-json-view'), {
    ssr: false
});
let moment = require('moment');

type Props = {
    logs: Array<LogType>
}

@observer
class LogTable extends React.Component<Props> {
    renderLogs() {
        return this.props.logs.map((log, index) => (
            <TableRow key={index}>
                <TableCell label="Date" center>
                    <span>{moment(log.date).format("YYYYMMDD-HHMM")}</span>
                </TableCell>
                <TableCell label="Command">
                    <i>{log.cmd}</i>
                </TableCell>
                <TableCell label="Payload">
                    <ReactJson
                        name="payload"
                        enableClipboard={false}
                        src={log.payload}/>
                </TableCell>
            </TableRow>
        ))
    }

    render() {
        return (
            <Table className="mt-40">
                <TableHead>
                    <TableRow border>
                        <TableHeader>Date</TableHeader>
                        <TableHeader>Command</TableHeader>
                        <TableHeader>Payload</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.renderLogs()}
                </TableBody>
            </Table>
        )
    }
}

export default LogTable