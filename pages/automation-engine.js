import getConfig from "next/config";
import Router from 'next/router';
import React, { Component } from 'react';
import Layout from "../components/layouts/Layout";
import RulesTableProvider from "../components/RulesTable/RulesTableProvider";

const { publicRuntimeConfig } = getConfig();


class AutomaticEngine extends Component {
    static getInitialProps(ctx) {
        if (publicRuntimeConfig.AE_ENABLED === 'false')
            if (ctx && ctx.req) {
                ctx.res.writeHead(302, { Location: '/' })
                ctx.res.end()
            } else {
                Router.push('/');
            }
        return {};
    }
    render() {
        return (
            <Layout>
                <h1>Automation Engine</h1>
                <RulesTableProvider />
            </Layout>
        );
    }
}

export default AutomaticEngine;
