import { observer } from "mobx-react";
import React, { Component } from 'react';
import { NotificationManager } from "react-notifications";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Store } from '../../state/Store';
import AppStrings from "../../utils/AppStrings";
import { capitalize } from "../../utils/helpers";
import ModalProvider from "../common/Modal/ModalProvider";
import RulesTable from "./UI/RulesTable";

@Store.inject
@observer
class RulesTableProvider extends Component {
    componentDidMount(): void {
        this.props.store.domain.ae.rules.load();
    }

    openModal = () => {
        this.props.store.view.modal.open(ModalProvider.types.RULE_FORM, {
            submit: this.submitRule,
        });
    };

    addRule = () => {
        this.props.store.view.forms.getRule().clear();
        this.openModal();
    };
    submitRule = (rule) => {
        const { id, type, description, triggers, targets } = rule;
        if (id === 'undefined' || id === null) {
            this.props.store.domain.ae.rules.add(type, description, triggers, targets)
                .then(() => {
                    NotificationManager.success(AppStrings.RULE_ADDED);
                    this.handleRefresh();
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

            this.handleRefresh();
            this.forceUpdate();
        }

        this.props.store.view.modal.hide();
    };

    editRule = (id) => {
        const data = this.props.store.domain.ae.rules.get(parseInt(id));
        this.props.store.view.forms.getRule().parse(data);
        this.openModal();
    };

    removeRule = (id) => {
        const RemoveSwal = withReactContent(Swal);
        RemoveSwal.fire({
            type: 'error',
            title: 'Delete rule?',
            showCancelButton: true,
        }).then((res) => {
            if (res.value) {
                this.props.store.domain.ae.rules.remove(id);
            }
        })
    };

    onPageChange = (page) => {
        this.props.store.domain.ae.rules.setPage(page.selected);
    };

    handleOnPage = (onPage) => {
        this.props.store.domain.ae.rules.setOnPage(onPage);
    };

    handleRefresh = () => {
        this.props.store.domain.ae.rules.load();
    };

    render() {
        return (
            <RulesTable
                rules={this.props.store.domain.ae.rules.get()}
                addRule={this.addRule}
                editRule={this.editRule}
                removeRule={this.removeRule}
                count={this.props.store.domain.ae.rules.rules.length}
                onPage={this.props.store.domain.ae.rules.onPage}
                onPageChange={this.onPageChange}
                currentPage={this.props.store.domain.ae.rules.page}
                handleOnPage={this.handleOnPage}
            />
        );
    }
}

export default RulesTableProvider;
