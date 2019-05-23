// @flow
import * as React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import type { RouteConfig } from 'routes'
import routes from 'routes'

class Router extends React.Component<{}> {
    static renderRoutes(routes: Array<RouteConfig>) {
        return routes.map((route, index) => (
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}/>
        ))
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    {Router.renderRoutes([
                        routes.root,
                        routes.layout
                    ])}
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default Router