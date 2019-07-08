// @flow
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Store } from '../../state/Store'
import StatCards from './UI/StatCards'

type Props = {
    store: Store,
}

@Store.inject
@observer
class StatCardsProvider extends Component<Props> {
    componentDidMount() {
        this.props.store.domain.ae.rules.load();
    }
    render() {
        return (
        <StatCards
                topicsCount={this.props.store.domain.topics.getCount()}
                clientsCount={this.props.store.domain.clients.getCount()}
                rulesCount={this.props.store.domain.ae.rules.rules.length}
        />
        )
    }
}

export default StatCardsProvider