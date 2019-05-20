// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Store } from 'state/Store'
import StatCards from '/components/StatCards/UI/StatCards'

type Props = {
    store: Store,
}

@Store.inject
@observer
class StatCardsProvider extends Component<Props> {
    render() {
        return (
            <StatCards
                topicsCount={this.props.store.domain.topics.countTopics()}
                clientsCount={this.props.store.domain.clients.countClients()}/>
        )
    }
}

export default StatCardsProvider