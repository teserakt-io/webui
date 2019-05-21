// @flow
import React, { Component } from 'react'
import { Store } from '../../state/Store'
import LogTable from './UI/LogTable'

type Props = {
    store: Store
}

@Store.inject
class LogTableProvider extends Component {
    render() {
        return <LogTable logs={this.props.store.domain.log.getLogs()}/>
    }
}

export default LogTableProvider
