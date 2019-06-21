import React, {Component} from 'react';
import Layout from "../../components/layouts/Layout";
import RulesTableProvider from "../../components/RulesTable/RulesTableProvider";
import getConfig from "next/config";
import Router from 'next/router';

const { publicRuntimeConfig } = getConfig();


class AutomaticEngine extends Component {
    static getInitialProps(props) {
        if(publicRuntimeConfig.AE_ENABLED != "true")
            Router.push('/');
    }
    render() {
        return (
            <Layout>
                <h1>Automation Engine</h1>
                <RulesTableProvider/>
            </Layout>
        );
    }
}

export default AutomaticEngine;