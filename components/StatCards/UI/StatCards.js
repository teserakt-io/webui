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
                <Link href={routes.clients.path}>
                    <a>
                        <Card
                            red
                            title={this.props.clientsCount}
                            desc="Clients"
                            icon={Icon.d.CLIENT}/>
                    </a>
                </Link>
                <Link href={routes.topics.path}>
                    <a>
                        <Card
                            darkBlue
                            title={this.props.topicsCount}
                            desc="Topics"
                            icon={Icon.d.TOPIC}/>
                    </a>
                </Link>
            </React.Fragment>
        )
    }
}

export default StatCards
