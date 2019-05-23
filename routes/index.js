// @flow
import * as React from 'react'
import Icon from '../components/common/Icon/Icon'

export type RouteConfig = {
    path: string,
    icon?: string,
    name?: string,
    exact?: boolean,
    redirectTo?: string
}

const routes: {
    root: RouteConfig,
    dashboard: RouteConfig,
    clients: RouteConfig,
    topics: RouteConfig,
    keys: RouteConfig,
    layout: RouteConfig
} = {
    root: {
        path: '/',
        // component: () => <Redirect to={routes.dashboard.path}/>,
        exact: true
    },
    dashboard: {
        name: 'Dashboard',
        path: '/dashboard',
        // component: Dashboard,
        exact: true,
        icon: Icon.d.DASHBOARD
    },
    clients: {
        name: 'Clients',
        path: '/clients',
        // component: Clients,
        exact: true,
        icon: Icon.d.CLIENT
    },
    keys: {
        name: 'Keys',
        path: '/keys',
        // component: Keys,
        exact: true,
        icon: Icon.d.KEY
    },
    topics: {
        name: 'Topics',
        path: '/topics',
        // component: Topics,
        exact: true,
        icon: Icon.d.TOPIC
    }
}

export default routes

