//@flow
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/Table";
import Button from "../common/Buttons/Button/Button";
import CustomSelect from "../common/FormElements/Select/Select";
import dynamic from 'next/dynamic';
import FontAwesome from "react-fontawesome";
import Icon from "../common/Icon/Icon";
import Input from "../common/FormElements/Input/Input";
const ReactJson = dynamic(import('react-json-view'), {
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
                        <TableHeader>Expression</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.targets.map((target, index) => {
                        return (
                            <TableRow border key={index}>
                                <TableCell label={'#'}>{index + 1}</TableCell>
                                <TableCell label={'Type'}>{target.type}</TableCell>
                                <TableCell label={'Expression'}>{target.expression}</TableCell>
                                <TableCell small label={'Actions'}>
                                    <span onClick={() => props.edit(index)}>
                                        <FontAwesome name={'file'} className={'pointer'}/>
                                    </span>
                                    <span onClick={() => props.remove(index)} role="presentation">
                                        <Icon color="black" className="pointer" d={Icon.d.BIN}/>
                                    </span>
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
                <Input id={'expression'} onChange={props.onExpressionChange} value={props.current.expression}/>
                <div>
                    <Button small uppercase onClick={props.onSave}>Save</Button>
                </div>
            </div>}
        </div>
    );
}

export default TargetsTable;