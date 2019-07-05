import React, {Component} from 'react';
import RulesTable from "./UI/RulesTable";
import {Store} from '../../state/Store';
import ModalProvider from "../common/Modal/ModalProvider";
import {observer} from "mobx-react";
import {NotificationManager} from "react-notifications";
import AppStrings from "../../utils/AppStrings";
import {capitalize} from "../../utils/helpers";

@Store.inject
@observer
class RulesTableProvider extends Component{
    componentDidMount(): void {
        this.props.store.domain.ae.rules.load();
    }

    createModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.RULE_FORM, {
            submit: this.submitRule,
        });
    };

    submitRule = (rule) => {
        const {id, type, description, triggers, targets} = rule;
        if(id === 'undefined' || id === null) {
            this.props.store.domain.ae.rules.add(type, description, triggers, targets)
                .then(() => {
                    NotificationManager.success(AppStrings.RULE_ADDED);
                    this.forceUpdate();
                }).catch((e) => {
                    NotificationManager.error(capitalize(e.response.data.message));
            });
        } else {
            this.props.store.domain.ae.rules.edit(id, type, description, triggers, targets)
                .then(() => {
                    NotificationManager.success(AppStrings.RULE_UPDATED);
                    this.forceUpdate();
                }).catch((e) => {
                    NotificationManager.error(capitalize(e.response.data.message));
            });
            this.forceUpdate();
        }

        this.props.store.view.modal.hide();
    };

    editRule = (id) => {
        const data = this.props.store.domain.ae.rules.get(parseInt(id));
        this.props.store.view.forms.getRule().parse(data);
        this.createModal();
    };

    removeRule = (id) => {
        this.props.store.domain.ae.rules.remove(id);
    };

    onPageChange = (page) => {
        this.props.store.domain.ae.rules.setPage(page.selected);
    };

    render() {
       return (
           <RulesTable
               rules={this.props.store.domain.ae.rules.get()}
               createModal={this.createModal}
               editRule={this.editRule}
               removeRule={this.removeRule}
               count={this.props.store.domain.ae.rules.rules.length}
               onPage={this.props.store.domain.ae.rules.onPage}
               onPageChange={this.onPageChange}
               currentPage={this.props.store.domain.ae.rules.page}
           />
       );
    }
}

export default RulesTableProvider;