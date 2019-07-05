//@flow
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/Table";
import Button from "../common/Buttons/Button/Button";
import CustomSelect from "../common/FormElements/Select/Select";
import Settings from "./Settings";
import dynamic from 'next/dynamic';
import FontAwesome from "react-fontawesome";
import Icon from "../common/Icon/Icon";
const ReactJson = dynamic(import('react-json-view'), {
    ssr: false
});

type Props = {
    triggers: Array,
    new: Function,
    current?: Object,
    types: Array,
    editable: boolean,
    edit: Function,
    remove: Function,
    onTypeChange: Function,
    onSettingChange: Function,
    onSave: Function,
    onCancel: Function,
};

function TriggersTable(props: Props) {
    return (
        <div className={'table__block'}>
            <h4>Triggers:</h4>
            <Table className={'table__triggers'}>
                <TableHead>
                    <TableRow>
                        <TableHeader>#</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Settings</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.triggers.map((trigger, index) => {
                        return (
                            <TableRow border key={index}>
                                <TableCell label={'#'}>{index + 1}</TableCell>
                                <TableCell label={'Type'}>{trigger.type}</TableCell>
                                <TableCell label={'Settings'}>
                                    <ReactJson
                                    name="payload"
                                    enableClipboard={false}
                                    displayObjectSize={false}
                                    displayDataTypes={false}
                                    src={trigger.settings}/>
                                </TableCell>
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
            <Button small uppercase onClick={props.new} className={'button__new'}>New trigger</Button>
            {props.editable && <div className={'trigger__edit'}>
                <CustomSelect
                    name={'triggerType'}
                    onChange={props.onTypeChange}
                    options={props.types}
                    value={props.current.type}
                />

                <Settings
                    type={props.current.getType()}
                    onSettingChange={props.onSettingChange}
                    data={props.current.settings}
                />
                <div>
                    <Button small uppercase danger onClick={props.onSave}>Save</Button>
                    <Button small uppercase danger onClick={props.onCancel}>Cancel</Button>
                </div>
            </div>}
        </div>
    );
}

export default TriggersTable;