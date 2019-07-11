import React from 'react'
import Card from '../../common/Card/Card'
import Icon from '../../common/Icon/Icon'
import Link from 'next/link'
import routes from '../../../routes'
import url from "url";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

type Props = {
    clientsCount: number,
    topicsCount: number
}

class StatCards extends React.Component<Props> {
    render() {
        const {C2_URL, AE_ENABLED} = publicRuntimeConfig;
        const c2 = url.parse(C2_URL);
        const ae_enabled = AE_ENABLED === "true";
        console.log(publicRuntimeConfig);
        return (
            <React.Fragment>
                {ae_enabled && <Card
                    white
                    large
                    title={'C2'}
                    desc={c2.host}
                />}
                <Link href={routes.clients.path}>
                    <a>
                        <Card
                            red
                            medium={!ae_enabled}
                            title={this.props.clientsCount}
                            desc="Clients"
                            icon={Icon.d.CLIENT}/>
                    </a>
                </Link>
                <Link href={routes.topics.path}>
                    <a>
                        <Card
                            darkBlue
                            medium={!ae_enabled}
                            title={this.props.topicsCount}
                            desc="Topics"
                            icon={Icon.d.TOPIC}/>
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
