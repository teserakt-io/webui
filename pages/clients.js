import React from 'react';
import ClientsTableProvider from '../components/ClientsTable/ClientsTableProvider';

class Clients extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <h1>Clients</h1>
                <ClientsTableProvider />
            </React.Fragment>
        )
    }
}

export default Clients
