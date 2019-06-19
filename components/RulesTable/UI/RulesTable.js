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

type Props = {
    rules: Function,
};

function RulesTable(props: Props) {
    console.log(props);
    return (
        <Fragment>
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
                    {props.rules.map((rule, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell label={'#'} small center>{index + 1}</TableCell>
                                <TableCell label={'Type'}>{rule.type}</TableCell>
                                <TableCell label={'Description'}>{rule.description}</TableCell>
                                <TableCell label={'Last executed'}>{rule.last}</TableCell>
                                <TableCell label={'# Triggers'}>{rule.triggers}</TableCell>
                                <TableCell label={'# Targets'}>{rule.targets}</TableCell>
                                <TableCell label={'Actions'} small center className={'actions'}>
                                    <span onClick={() => console.log(rule)}>
                                        <FontAwesome name={'file'} className={'pointer'}/>
                                    </span>
                                                    <span onClick={() => console.log(rule)} role="presentation">
                                        <Icon color="black" className="pointer" d={Icon.d.BIN}/>
                                    </span>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Fragment>
    );
}

export default RulesTable;