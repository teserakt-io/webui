import React, { Component } from 'react';
import LogTableProvider from '../components/LogTable/LogTableProvider';
import StatCardsProvider from '../components/StatCards/StatCardsProvider';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <StatCardsProvider />
                <LogTableProvider />
            </React.Fragment>
        )
    }
}

export default Dashboard
