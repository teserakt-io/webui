// @flow
import getConfig from "next/config";
import * as React from 'react';
import routes from '../../routes';
import Navigation from './UI/Navigation';

const { publicRuntimeConfig } = getConfig();

type Props = {
    history?: Object
}

class NavigationProvider extends React.Component<Props> {
    render() {
        let links = [
            routes.dashboard,
            routes.clients,
            routes.topics,
        ];
        if (publicRuntimeConfig.AE_ENABLED === "true")
            links.push(routes.ae);

        links.push(routes.about);

        return <Navigation
            history={this.props.history}
            routes={links} />
    }
}

export default NavigationProvider
