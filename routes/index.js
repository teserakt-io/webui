import FontAwesome from 'react-fontawesome'
import Icon from '../components/common/Icon/Icon'

const routes = {
    root: {
        path: '/',
    },
    dashboard: {
        name: 'Dashboard',
        path: '/dashboard',
        icon: Icon.d.DASHBOARD
    },
    clients: {
        name: 'Clients',
        path: '/clients',
        icon: Icon.d.CLIENT
    },
    topics: {
        name: 'Topics',
        path: '/topics',
        icon: Icon.d.TOPIC
    },
    ae: {
        name: 'Automation Engine',
        path: '/automation-engine',
        iconType: 'fa',
        icon: <FontAwesome name={'cogs'} size="2x" tag={'i'} />
    },
    about: {
        name: 'About',
        path: '/about',
        iconType: 'fa',
        icon: <FontAwesome name={'question-circle-o'} size="2x" tag={'i'} />
    }
}

export default routes
