import React from 'react'
import Card from '../../common/Card/Card'
import Icon from '../../common/Icon/Icon'
// import { NavLink } from 'react-router-dom'
// import routes from 'routes'

type Props = {
    clientsCount: number,
    topicsCount: number
}

class StatCards extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                {/*<NavLink to={routes.clients.path}>*/}
                    <Card
                        red
                        title={this.props.clientsCount}
                        desc="Clients"
                        icon={Icon.d.CLIENT}/>
                {/*</NavLink>*/}
                {/*<NavLink to={routes.clients.path}>*/}
                {/*    <Card*/}
                {/*        blue*/}
                {/*        title={0}*/}
                {/*        desc="Active clients"*/}
                {/*        icon={Icon.d.CLIENT}/>*/}
                {/*</NavLink>*/}
                {/*<NavLink to={routes.topics.path}>*/}
                {/*    <Card*/}
                {/*        darkBlue*/}
                {/*        title={this.props.topicsCount}*/}
                {/*        desc="Topics"*/}
                {/*        icon={Icon.d.TOPIC}/>*/}
                {/*</NavLink>*/}
                {/*<NavLink to={routes.keys.path}>*/}
                {/*    <Card*/}
                {/*        title={0}*/}
                {/*        desc="Keys"*/}
                {/*        icon={Icon.d.KEY}/>*/}
                {/*</NavLink>*/}
            </React.Fragment>
        )
    }
}

export default StatCards
