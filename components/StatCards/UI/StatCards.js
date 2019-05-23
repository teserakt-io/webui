import React from 'react'
import Card from '../../common/Card/Card'
import Icon from '../../common/Icon/Icon'
import Link from 'next/link'
import routes from '../../../routes'

type Props = {
    clientsCount: number,
    topicsCount: number
}

class StatCards extends React.Component<Props> {
    render() {
        return (
            <React.Fragment>
                <Link to={routes.clients.path}>
                    <Card
                        red
                        title={this.props.clientsCount}
                        desc="Clients"
                        icon={Icon.d.CLIENT}/>
                </Link>
                <Link to={routes.clients.path}>
                    <Card
                        blue
                        title={0}
                        desc="Active clients"
                        icon={Icon.d.CLIENT}/>
                </Link>
                <Link to={routes.topics.path}>
                    <Card
                        darkBlue
                        title={this.props.topicsCount}
                        desc="Topics"
                        icon={Icon.d.TOPIC}/>
                </Link>
                <Link to={routes.keys.path}>
                    <Card
                        title={0}
                        desc="Keys"
                        icon={Icon.d.KEY}/>
                </Link>
            </React.Fragment>
        )
    }
}

export default StatCards
