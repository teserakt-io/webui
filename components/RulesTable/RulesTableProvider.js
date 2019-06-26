import React, {Component} from 'react';
import RulesTable from "./UI/RulesTable";
import {Store} from '../../state/Store';
import ModalProvider from "../common/Modal/ModalProvider";
import {observer} from "mobx-react";

@Store.inject
@observer
class RulesTableProvider extends Component{
    componentDidMount(): void {
        this.props.store.domain.ae.rules.load();
    }

    createModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.RULE_FORM, {
        });
    };

    removeRule = (id) => {
        this.props.store.domain.ae.rules.remove(id);
    };

    render() {
       return (
           <RulesTable
               rules={this.props.store.domain.ae.rules.get()}
               createModal={this.createModal}
               removeRule={this.removeRule}
           />
       );
    }
}

export default RulesTableProvider;