//@flow
import React from 'react';
import ActionButtons from "../ActionButtons/ActionButtons";
import Button from "../common/Buttons/Button/Button";
import Input from "../common/FormElements/Input/Input";
import CustomSelect from "../common/FormElements/Select/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../common/Table";

type Props = {
    targets: Array,
    new: Function,
    current?: Object,
    types: Array,
    editable: boolean,
    edit: Function,
    remove: Function,
    onTypeChange: Function,
    onExpressionChange: Function,
    onSave: Function,
    onCancel: Function,
    isValid: Function,
};

function TargetsTable(props: Props) {
    return (
        <div className={'table__block'}>
            <h4>Targets:</h4>
            <Table className={'table__targets'}>
                <TableHead>
                    <TableRow>
                        <TableHeader style={{ width: '10%' }} center>#</TableHeader>
                        <TableHeader style={{ width: '20%' }}>Type</TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader style={{ width: '15%' }} center>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.targets.length > 0 && props.targets.map((target, index) => {
                        return (
                            <TableRow border key={index}>
                                <TableCell style={{ width: '10%' }} center label={'#'}>{index + 1}</TableCell>
                                <TableCell style={{ width: '20%' }} label={'Type'}>{props.types.find((elt) => elt.value === target.type).label}</TableCell>
                                <TableCell label={'Name'}>{target.expr}</TableCell>
                                <TableCell style={{ width: '15%' }} center label={'Actions'}>
                                    <ActionButtons
                                        edit={() => props.edit(index)}
                                        remove={() => props.remove(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {props.targets.length === 0 && (
                        <TableRow>
                            <TableCell center colSpan="4">
                                <i>Nothing yet !</i>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button small uppercase onClick={props.new} className={'button__new'}>New target</Button>
            {props.editable && <div className={'target__edit'}>
                <CustomSelect
                    name={'type'}
                    onChange={props.onTypeChange}
                    options={props.types}
                    value={props.current.type}
                />
                {/* TODO: autocomplete clients / topics here ? */}
                <Input id={'expression'}
                    onChange={props.onExpressionChange}
                    value={props.current.expr}
                    placeholder={'This field expects a valid ' + props.current.type.label.toLowerCase() + ' name'}
                />
                <div>
                    <Button small uppercase danger disabled={!props.isValid} onClick={props.onSave}>Save</Button>
                    <Button small uppercase danger onClick={props.onCancel} className={'ml-10'}>Cancel</Button>
                </div>
            </div>}
        </div>
    );
}

export default TargetsTable;
