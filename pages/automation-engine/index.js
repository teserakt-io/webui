import React, {Component} from 'react';
import Layout from "../../components/layouts/Layout";
import RulesTableProvider from "../../components/RulesTable/RulesTableProvider";

class AutomaticEngine extends Component {
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