//@flow
import React, {Component} from 'react';
import {Store} from '../../../state/Store';
import CustomSelect from "../../common/FormElements/Select/Select";
import Input from "../../common/FormElements/Input/Input";
import Button from "../../common/Buttons/Button/Button";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody, TableCell,
} from "../../common/Table";
import TriggersTable from "../../TriggersTable/TriggersTable";
import Rule from '../../../state/view/stores/Forms/Rule';
import {observer} from "mobx-react";

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
        };

        this.triggerForm = this.props.store.view.form.getTrigger();
        this.ruleForm = this.props.store.view.form.getRule();
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

        const { type, description } = this.state;
        this.props.submit(type, description)
    };

    handleNewTrigger = (e) => {
        e.preventDefault();
        this.setState({ triggerEdit: true });
        this.props.store.view.form.getTrigger().clear();
    };

    handleTriggerTypeChange = (selected) => {
        this.triggerForm.setType(selected.value);
        this.forceUpdate();
    };

    handleSettingsChange = (e) => {
        this.triggerForm.setSetting(e.target.id, e.target.value);
        this.forceUpdate();
    };

    handleTriggerSave = (e) => {
        e.preventDefault();
        const data = this.triggerForm.serialize();
        this.ruleForm.addTrigger(data);
        this.setState({ triggerEdit: false });
    };

    handleRemoveTrigger = (index) => {
        this.ruleForm.removeTrigger(index);
    };

    render() {
        const triggers = this.ruleForm.getTriggers();
        const targets = this.props.store.domain.ae.targets.get();
        return (
            <form className="modal__form" method={'post'}>
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
                    edit={this.state.triggerEdit}
                    remove={this.handleRemoveTrigger}
                    types={this.props.store.domain.ae.triggers.types}
                    onTypeChange={this.handleTriggerTypeChange}
                    onSettingChange={this.handleSettingsChange}
                    onTriggerSave={this.handleTriggerSave}
                />
                <div>
                    Targets:
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>#</TableHeader>
                                <TableHeader>Type</TableHeader>
                                <TableHeader>Expression</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {targets.map((target, index) => {
                                return (
                                    <TableRow border>
                                        <TableCell label={'#'}>{index + 1}</TableCell>
                                        <TableCell label={'Type'}>{target.type}</TableCell>
                                        <TableCell label={'Expression'}>{target.settings}</TableCell>
                                        <TableCell label={'Actions'}>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
                <div className="btn-control">
                    <Button small disabled={!this.isValid()} onClick={this.onSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        );
    }
}

export default RuleForm;