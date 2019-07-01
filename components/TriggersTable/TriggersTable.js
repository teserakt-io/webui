//@flow
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../common/Table";
import Button from "../common/Buttons/Button/Button";
import CustomSelect from "../common/FormElements/Select/Select";
import Settings from "./Settings";

type Props = {
    triggers: Array,
    newTrigger: Function,
    current?: Object,
    types: Array,
    edit?: boolean,
    onTypeChange: Function,
};

function TriggersTable(props: Props) {
    return (
        <div>
            <h4>Triggers:</h4>
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
                    {props.triggers.map((trigger, index) => {
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
            <Button small uppercase onClick={props.newTrigger}>New trigger</Button>
            {props.edit && <div>
                <CustomSelect
                    name={'triggerType'}
                    onChange={props.onTypeChange}
                    options={props.types}
                    value={props.current.type}
                />

                <Settings type={props.current.type}/>
            </div>}
        </div>
    );
}

export default TriggersTable;