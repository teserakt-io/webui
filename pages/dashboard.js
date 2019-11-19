import getConfig from 'next/config';
import React, { Component } from 'react';
import url from 'url';
import LogTableProvider from '../components/LogTable/LogTableProvider';
import StatCardsProvider from '../components/StatCards/StatCardsProvider';

const { publicRuntimeConfig } = getConfig();

class Dashboard extends Component {
    render() {
        const { C2_URL } = publicRuntimeConfig;
        const c2 = url.parse(C2_URL);
        return (
            <React.Fragment>
                <StatCardsProvider />
                <LogTableProvider />
            </React.Fragment>
        )
    }
}

export default Dashboard
