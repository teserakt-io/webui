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
    rules: Function,
    createModal: Function,
};

function RulesTable(props: Props) {
    return (
        <div>
            <Button
                danger
                uppercase
                medium
                className="mb-20"
                onClick={props.createModal}>
                Add Rule
            </Button>
            <Table>
                <TableHead>
                    <TableRow border>
                        <TableHeader small>#</TableHeader>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Description</TableHeader>
                        <TableHeader>Last executed</TableHeader>
                        <TableHeader small># Triggers</TableHeader>
                        <TableHeader small># Targets</TableHeader>
                        <TableHeader small>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rules.map((rule) => {
                        return (
                            <TableRow key={rule.id}>
                                <TableCell label={'#'} small center>{rule.id}</TableCell>
                                <TableCell label={'Type'}>{rule.type}</TableCell>
                                <TableCell label={'Description'}>{rule.description}</TableCell>
                                <TableCell label={'Last executed'}>{rule.lastExectued}</TableCell>
                                <TableCell label={'#Triggers'}>{rule.triggers}</TableCell>
                                <TableCell label={'#Targets'}>{rule.targets}</TableCell>
                                <TableCell label={'Actions'} small center className={'actions'}>
                                    <span onClick={() => console.log(rule)}>
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