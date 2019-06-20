import React, {Component} from 'react';
import RulesTable from "./UI/RulesTable";
import {Store} from '../../state/Store';
import ModalProvider from "../common/Modal/ModalProvider";

@Store.inject
class RulesTableProvider extends Component{
    createModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.RULE_FORM, {

        });
        console.log("open");
    }

    render() {
       return (
           <RulesTable
               rules={this.props.store.domain.ae.rules.get()}
               createModal={this.createModal}
           />
       );
    }
}

export default RulesTableProvider;