//@flow
import React, {Component} from 'react';
import {Store} from '../../../state/Store';
import CustomSelect from "../../common/FormElements/Select/Select";
import Input from "../../common/FormElements/Input/Input";
import Button from "../../common/Buttons/Button/Button";
import TriggersTable from "../../TriggersTable/TriggersTable";
import Rule from '../../../state/view/stores/Forms/Rule';
import {observer} from "mobx-react";
import TargetsTable from "../../TargetsTable/TargetsTable";
require('./RuleForm.scss');

@Store.inject
@observer
class RuleForm extends Component{
    static formKeys = {
        TYPE: "type",
        DESCRIPTION: "description",
    };

    constructor(props) {
        super(props);

        this.state = {
            triggerEdit: false,
            targetEdit: false,
        };

        this.triggerForm = this.props.store.view.forms.getTrigger();
        this.ruleForm = this.props.store.view.forms.getRule();
        this.targetForm = this.props.store.view.forms.getTarget();
    }

    onChange = (e: Object) => {
        this.ruleForm.set(e.target.id, e.target.value);
    };

    onSelectChange = (option: Object) => {
        this.ruleForm.setType(option.value);
    };

    isValid() {
        return true;
    }

    onSubmit = (e: Object) => {
        e.preventDefault();
        if (!this.isValid()) return;

        const data = this.ruleForm.serialize();
        this.props.submit(data);
    };

    handleNewTrigger = (e) => {
        e.preventDefault();
        this.setState({ triggerEdit: true });
        this.triggerForm.clear();
    };

    handleTriggerTypeChange = (selected) => {
        this.triggerForm.setType(selected.value);
        this.forceUpdate();
    };

    handleSettingsChange = (e) => {
        this.triggerForm.setSetting(e.target.id, e.target.value);
        this.forceUpdate();
    };

    handleEditTrigger = (id) => {
        const trigger = this.ruleForm.triggers[id];
        this.triggerForm.parse(trigger, id);
        this.setState({ triggerEdit: true });
    };

    handleTriggerSave = (e) => {
        e.preventDefault();
        const data = this.triggerForm.serialize();
        this.ruleForm.saveTrigger(data);
        this.setState({ triggerEdit: false });
    };

    handleRemoveTrigger = (index) => {
        this.ruleForm.removeTrigger(index);
        this.setState({ triggerEdit: false });
    };

    handleNewTarget = (e) => {
        e.preventDefault();
        this.setState({ targetEdit: true });
        this.targetForm.clear();
    };

    handleTargetTypeChange = (selected) => {
        this.targetForm.setType(selected.value);
        this.forceUpdate();
    };

    handleExpressionChange = (e) => {
        this.targetForm.setExpression(e.target.value);
        this.forceUpdate();
    };

    handleTargetSave = (e) => {
        e.preventDefault();
        const data = this.targetForm.serialize();
        this.ruleForm.saveTarget(data);
        this.setState({ targetEdit: false });
    };

    handleRemoveTarget = (index) => {
        this.ruleForm.removeTarget(index);
        this.setState({ targetEdit: false });
    };

    handleEditTarget = (id) => {
        const target = this.ruleForm.targets[id];
        this.targetForm.parse(target, id);
        this.setState({ targetEdit: true });
    };

    render() {
        const triggers = this.ruleForm.getTriggers();
        const targets = this.ruleForm.getTargets();
        return (
            <div className="modal__form rule__form">
                <CustomSelect label={'Type'}
                              name={RuleForm.formKeys.TYPE}
                              onChange={this.onSelectChange}
                              options={Rule.types}
                              value={this.ruleForm.getType()}
                />
                <Input label={'Description'}
                       id={RuleForm.formKeys.DESCRIPTION}
                       name={'description'}
                       value={this.ruleForm[RuleForm.formKeys.DESCRIPTION]}
                       onChange={this.onChange}/>

                <TriggersTable
                    triggers={triggers}
                    newTrigger={this.handleNewTrigger}
                    current={this.triggerForm}
                    editable={this.state.triggerEdit}
                    edit={this.handleEditTrigger}
                    remove={this.handleRemoveTrigger}
                    types={this.props.store.domain.ae.triggers.types}
                    onTypeChange={this.handleTriggerTypeChange}
                    onSettingChange={this.handleSettingsChange}
                    onTriggerSave={this.handleTriggerSave}
                />

                <TargetsTable
                    targets={targets}
                    new={this.handleNewTarget}
                    current={this.targetForm}
                    editable={this.state.targetEdit}
                    edit={this.handleEditTarget}
                    remove={this.handleRemoveTarget}
                    types={this.targetForm.getTypes()}
                    onTypeChange={this.handleTargetTypeChange}
                    onExpressionChange={this.handleExpressionChange}
                    onSave={this.handleTargetSave}
                />
                <div className="btn-control">
                    <Button small danger uppercase disabled={!this.isValid()} onClick={this.onSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default RuleForm;