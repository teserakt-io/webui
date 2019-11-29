import getConfig from "next/config"
import Link from 'next/link'
import React from 'react'
import url from "url"
import routes from '../../../routes'
import Card from '../../common/Card/Card'
import Icon from '../../common/Icon/Icon'

const { publicRuntimeConfig } = getConfig();
const { C2_URL, MQTT_URL, AE_ENABLED } = publicRuntimeConfig;

type Props = {
    clientsCount: number,
    topicsCount: number,
}

class StatCards extends React.Component<Props> {
    render() {
        const c2 = url.parse(C2_URL);
        const mqtt = url.parse(MQTT_URL);
        const ae_enabled = AE_ENABLED === "true";

        return (
            <React.Fragment>
                <Card
                    white
                    medium
                    title={'C2'}
                    desc={c2.host}
                />
                <Card
                    white
                    medium
                    title={'MQTT'}
                    desc={mqtt.host}
                />
                <Link href={routes.clients.path}>
                    <a>
                        <Card
                            red
                            medium={!ae_enabled}
                            title={this.props.clientsCount}
                            desc="Clients"
                            icon={Icon.d.CLIENT} />
                    </a>
                </Link>
                <Link href={routes.topics.path}>
                    <a>
                        <Card
                            darkBlue
                            medium={!ae_enabled}
                            title={this.props.topicsCount}
                            desc="Topics"
                            icon={Icon.d.TOPIC} />
                    </a>
                </Link>
                {ae_enabled && <Link href={routes.ae.path}>
                    <a>
                        <Card
                            blue
                            title={this.props.rulesCount}
                            desc="Rules"
                            faIcon={routes.ae.icon}
                        />
                    </a>
                </Link>}
            </React.Fragment>
        )
    }
}

export default StatCards
