//@flow
import React, {Fragment} from 'react';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableCell,
    TableBody
} from "../../common/Table";
import FontAwesome from "react-fontawesome";
import Icon from "../../common/Icon/Icon";
import Button from "../../common/Buttons/Button/Button";
import Pagination from "../../Pagination/Pagination";

type Props = {
    rules: Array,
    createModal: Function,
    editRule: Function,
    removeRule: Function,
};

function RulesTable(props: Props) {
    return (
        <div className={'rules'}>
            <Button
                danger
                uppercase
                medium
                className="mb-20"
                onClick={props.createModal}>
                Add Rule
            </Button>
            <Table className={'rules__table'}>
                <TableHead>
                    <TableRow border>
                        <TableHeader small center>#</TableHeader>
                        <TableHeader small>Type</TableHeader>
                        <TableHeader>Description</TableHeader>
                        <TableHeader small>Last executed</TableHeader>
                        <TableHeader small>#Triggers</TableHeader>
                        <TableHeader small>#Targets</TableHeader>
                        <TableHeader small>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rules.map((rule) => {
                        const triggerCount = rule.triggers ? rule.triggers.length : 0;
                        const targetCount = rule.targets ? rule.targets.length : 0;
                        return (
                            <TableRow key={rule.id}>
                                <TableCell label={'#'} small center>{rule.id}</TableCell>
                                <TableCell label={'Type'} small>{rule.action}</TableCell>
                                <TableCell label={'Description'} small>{rule.description}</TableCell>
                                <TableCell label={'Last executed'} small>{rule.lastExecuted}</TableCell>
                                <TableCell label={'#Triggers'} small>{triggerCount}</TableCell>
                                <TableCell label={'#Targets'} small>{targetCount}</TableCell>
                                <TableCell label={'Actions'} small center className={'actions'}>
                                    <span onClick={() => props.editRule(rule.id)}>
                                        <FontAwesome name={'file'} className={'pointer'}/>
                                    </span>
                                    <span onClick={() => props.removeRule(rule.id)} role="presentation">
                                        <Icon color="black" className="pointer" d={Icon.d.BIN}/>
                                    </span>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination
                count={() => {}}
                onPageChange={() => {}}
                forcePage={0}
                className={'f-l'}
            />
        </div>
    );
}

export default RulesTable;