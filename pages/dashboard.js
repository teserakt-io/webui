import React, {Component} from 'react'
import StatCardsProvider from '../components/StatCards/StatCardsProvider'
import LogTableProvider from '../components/LogTable/LogTableProvider'

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <StatCardsProvider/>
                <LogTableProvider/>
            </React.Fragment>
        )
    }
}

export default Dashboard
