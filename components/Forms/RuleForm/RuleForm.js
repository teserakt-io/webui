//@flow
import React, {Component} from 'react';
import {Store} from '../../../state/Store';
import CustomSelect from "../../common/FormElements/Select/Select";
import Input from "../../common/FormElements/Input/Input";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableBody, TableCell,
} from "../../common/Table";

@Store.inject
class RuleForm extends Component{
    render() {
        const triggers = this.props.store.domain.ae.triggers.get();
        console.log(triggers);
        return (
            <form className="modal__form">
                <CustomSelect label={'Type'} name={'type'} onChange={(e) => console.log(e)} options={[]}/>
                <Input label={'Description'} name={'description'} onChange={e => console.log(e)}/>
                <div>
                    Triggers:
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>#</TableHeader>
                                <TableHeader>Type</TableHeader>
                                <TableHeader>Settings</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {triggers.map((trigger, index) => {
                                return (
                                    <TableRow border>
                                        <TableCell label={'#'}>{index + 1}</TableCell>
                                        <TableCell label={'Type'}>{trigger.type}</TableCell>
                                        <TableCell label={'Settings'}>{trigger.settings}</TableCell>
                                        <TableCell label={'Actions'}>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>

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
                            {triggers.map((target, index) => {
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
            </form>
        );
    }
}

export default RuleForm;