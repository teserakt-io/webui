import React from 'react'
import Layout from "../components/layouts/Layout";
import ClientsTableProvider from '../components/ClientsTable/ClientsTableProvider'

class Clients extends React.Component<{}> {
    render() {
        return (
            <Layout>
                <h1>Clients</h1>
                <ClientsTableProvider/>
            </Layout>
        )
    }
}

export default Clients
