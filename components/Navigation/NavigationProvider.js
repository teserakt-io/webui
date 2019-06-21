// @flow
import * as React from 'react'
import Navigation from './UI/Navigation'
import routes from '../../routes'
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

type Props = {
    history: Object
}

class NavigationProvider extends React.Component<Props> {
    render() {
        let links = [
            routes.dashboard,
            routes.clients,
            routes.topics,
        ];
        if(publicRuntimeConfig.AE_ENABLED === "true")
            links.push(routes.ae);

        return <Navigation
            history={this.props.history}
            routes={links}/>
    }
}

export default NavigationProvider
