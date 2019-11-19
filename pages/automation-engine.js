import getConfig from "next/config";
import Router from 'next/router';
import React, { Component } from 'react';
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
            <React.Fragment>
                <h1>Automation Engine</h1>
                <RulesTableProvider />
            </React.Fragment>
        );
    }
}

export default AutomaticEngine;
