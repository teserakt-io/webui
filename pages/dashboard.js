import React, {Component} from 'react'
import StatCardsProvider from '../components/StatCards/StatCardsProvider'
import LogTableProvider from '../components/LogTable/LogTableProvider'
import Layout from "../components/layouts/Layout";
import getConfig from 'next/config';
import TextCard from "../components/common/TextCard/TextCard";
import url from 'url';

const { publicRuntimeConfig } = getConfig();

class Dashboard extends Component {
    render() {
        const {C2_URL} = publicRuntimeConfig;
        const c2 = url.parse(C2_URL);
        return (
            <Layout>
                <React.Fragment>
                    <TextCard>
                        <span className={'title'}>C2</span>: {c2.host}
                    </TextCard>
                    <StatCardsProvider/>
                    <LogTableProvider/>
                </React.Fragment>
            </Layout>
        )
    }
}

export default Dashboard
