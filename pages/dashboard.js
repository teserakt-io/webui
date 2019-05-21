import React, {Component} from 'react'
import StatCardsProvider from '../components/StatCards/StatCardsProvider'
import LogTableProvider from '../components/LogTable/LogTableProvider'
import Layout from "../components/layouts/Layout";

class Dashboard extends Component {
    render() {
        return (
            <Layout>
                <React.Fragment>
                    <StatCardsProvider/>
                    <LogTableProvider/>
                </React.Fragment>
            </Layout>
        )
    }
}

export default Dashboard
