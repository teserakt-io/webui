import React, {Component} from 'react';
import RulesTable from "./UI/RulesTable";
import {Store} from '../../state/Store';

@Store.inject
class RulesTableProvider extends Component{
    render() {
       return (
           <RulesTable
               rules={this.props.store.domain.ae.rules.get()}
           />
       );
    }
}

export default RulesTableProvider;