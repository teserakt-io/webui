// @flow
import React from 'react'
// import ReactJson from 'react-json-view'
import { observer } from 'mobx-react'
import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
    TableRow
} from '../../common/Table'
import type { LogType } from 'state/domain/stores/Log'

type Props = {
    logs: Array<LogType>
}

@observer
class LogTable extends React.Component<Props> {
    componentDidMount() {
        // const ReactJson = require('react-json-view');
    }
    renderLogs() {
        return this.props.logs.map((log, index) => (
            <TableRow key={index}>
                <TableCell label="Date" small center>
                    <span>{new Date(log.date).toLocaleString()}</span>
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
                        <TableHeader small>Date</TableHeader>
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