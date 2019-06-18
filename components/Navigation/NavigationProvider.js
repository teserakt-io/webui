// @flow
import * as React from 'react'
import Navigation from './UI/Navigation'
import routes from '../../routes'

type Props = {
    history: Object
}

class NavigationProvider extends React.Component<Props> {
    render() {
        return <Navigation
            history={this.props.history}
            routes={[
                routes.dashboard,
                routes.clients,
                routes.topics,
                routes.ae,
            ]}/>
    }
}

export default NavigationProvider
