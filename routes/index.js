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
        name: 'Automation',
        path: '/automation',
        iconType: 'fa',
        icon: <FontAwesome fixedWidth={true} name={'cogs'} tag={'i'} />
    },
    about: {
        name: 'About',
        path: '/about',
        iconType: 'fa',
        icon: <FontAwesome fixedWidth={true} name={'question-circle-o'} tag={'i'} />
    }
}

export default routes
