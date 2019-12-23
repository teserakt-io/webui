//@flow
import dynamic from 'next/dynamic';
import React from 'react';
import ActionButtons from "../ActionButtons/ActionButtons";
import Button from "../common/Buttons/Button/Button";
import CustomSelect from "../common/FormElements/Select/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../common/Table";
import Settings from "./Settings";
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
    onSettingEventTypeChange: Function,
    onSettingTimeIntervalChange: Function,
    onSave: Function,
    onCancel: Function,
    isValid: Function,
};

function TriggersTable(props: Props) {
    return (
        <div className={'table__block'}>
            <h4>Triggers:</h4>
            <Table className={'table__triggers'}>
                <TableHead>
                    <TableRow>
                        <TableHeader style={{ width: '10%' }} center>#</TableHeader>
                        <TableHeader style={{ width: '20%' }}>Type</TableHeader>
                        <TableHeader>Settings</TableHeader>
                        <TableHeader style={{ width: '15%' }} center>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.triggers.length > 0 && props.triggers.map((trigger, index) => {
                        return (
                            <TableRow border key={index}>
                                <TableCell label={'#'} style={{ width: '10%' }} center>{index + 1}</TableCell>
                                <TableCell label={'Type'} style={{ width: '20%' }}>{props.types.find((elt) => elt.value == trigger.type).label}</TableCell>
                                <TableCell label={'Settings'}>
                                    <ReactJson
                                        name="settings"
                                        enableClipboard={false}
                                        displayObjectSize={false}
                                        displayDataTypes={false}
                                        src={trigger.settings} />
                                </TableCell>
                                <TableCell label={'Actions'} style={{ width: '15%' }} center>
                                    <ActionButtons
                                        edit={() => props.edit(index)}
                                        remove={() => props.remove(index)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {props.triggers.length === 0 && (
                        <TableRow>
                            <TableCell center colSpan="4">
                                <i>Nothing yet !</i>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button small uppercase onClick={props.new} className={'button__new'}>New trigger</Button>
            {props.editable &&
                <div className={'trigger__edit'}>
                    <CustomSelect
                        name={'triggerType'}
                        onChange={props.onTypeChange}
                        options={props.types}
                        value={props.current.type}
                    />

                    <Settings
                        type={props.current.getType()}
                        onSettingChange={props.onSettingChange}
                        onSettingEventTypeChange={props.onSettingEventTypeChange}
                        onSettingTimeIntervalChange={props.onSettingTimeIntervalChange}
                        data={props.current.settings}
                    />
                    <div>
                        <Button small uppercase danger disabled={!props.isValid} onClick={props.onSave}>Save</Button>
                        <Button small uppercase danger onClick={props.onCancel} className={'ml-10'}>Cancel</Button>
                    </div>
                </div>
            }
        </div >
    );
}

export default TriggersTable;
