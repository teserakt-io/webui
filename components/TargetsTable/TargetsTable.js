//@flow
import dynamic from 'next/dynamic';
import React from 'react';
import ActionButtons from "../ActionButtons/ActionButtons";
import Button from "../common/Buttons/Button/Button";
import Input from "../common/FormElements/Input/Input";
import CustomSelect from "../common/FormElements/Select/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../common/Table";
const Reacttarget = dynamic(import('react-json-view'), {
    ssr: false
});

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
                        <TableHeader>#</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.targets.map((target, index) => {
                        return (
                            <TableRow border key={index}>
                                <TableCell label={'#'}>{index + 1}</TableCell>
                                <TableCell label={'Type'}>{props.types.find((elt) => elt.value === target.type).label}</TableCell>
                                <TableCell label={'Name'}>{target.expr}</TableCell>
                                <TableCell small label={'Actions'}>
                                    <ActionButtons
                                        edit={() => props.edit(index)}
                                        remove={() => props.remove(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
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
                    placeholder={'This field expect a valid ' + props.current.type.label.toLowerCase() + ' name'}
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
