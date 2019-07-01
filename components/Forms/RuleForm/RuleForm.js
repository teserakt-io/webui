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

@Store.inject
class RuleForm extends Component{
    static formKeys = {
        TYPE: "type",
        DESCRIPTION: "description",
    };

    constructor(props) {
        super(props);

        this.state = {
            [RuleForm.formKeys.TYPE]: props.store.domain.ae.rules.types[0],
            [RuleForm.formKeys.DESCRIPTION]: "",
            triggerEdit: false,
        };
    }

    onChange = (e: Object) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSelectChange = (option: Object) => {
        this.setState({ [RuleForm.formKeys.TYPE]: option.value });
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
        this.props.store.view.form.getTrigger().setType(selected.value);
        this.forceUpdate();
    };

    render() {
        console.log("props: ", this.props);
        console.log("state: ", this.state);
        const ae = this.props.store.domain.ae;
        const types = ae.rules.types;
        const triggers = this.props.store.domain.ae.triggers.get();
        const targets = this.props.store.domain.ae.targets.get();
        return (
            <form className="modal__form" method={'post'}>
                <CustomSelect label={'Type'}
                              name={RuleForm.formKeys.TYPE}
                              onChange={this.onSelectChange}
                              options={types}
                              value={this.state[RuleForm.formKeys.TYPE]}
                />
                <Input label={'Description'}
                       id={RuleForm.formKeys.DESCRIPTION}
                       name={'description'}
                       value={this.state[RuleForm.formKeys.DESCRIPTION]}
                       onChange={this.onChange}/>

                <TriggersTable
                    triggers={triggers}
                    newTrigger={this.handleNewTrigger}
                    current={this.props.store.view.form.getTrigger()}
                    edit={this.state.triggerEdit}
                    types={this.props.store.domain.ae.triggers.types}
                    onTypeChange={this.handleTriggerTypeChange}
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