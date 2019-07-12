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
import Button from "../../common/Buttons/Button/Button";
import Pagination from "../../Pagination/Pagination";
import TimeAgo from "react-timeago";
import Truncate from 'react-truncate';
import ReadMoreReact from 'read-more-react';
import moment from "moment";
import ActionButtons from "../../ActionButtons/ActionButtons";
import Rule from '../../../state/view/stores/Forms/Rule';

type Props = {
    rules: Array,
    addRule: Function,
    editRule: Function,
    removeRule: Function,
    currentPage: number,
    refresh: Function,
};

function RulesTable(props: Props) {
    return (
        <div className={'rules'}>
            <Button
                danger
                uppercase
                medium
                className="mb-20"
                onClick={props.addRule}>
                Add Rule
            </Button>
            <Button
                danger
                uppercase
                medium
                className="mb-20 ml-10"
                onClick={props.refresh}>
                <FontAwesome name={'refresh'}/>
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
                        const ago = moment(rule.lastExecuted).year() === 1 ? "Never" :
                            <TimeAgo date={rule.lastExecuted} />;
                        const action = Rule.types.find(r => r.value === rule.action).label;
                        return (
                            <TableRow key={rule.id}>
                                <TableCell label={'#'} small center>{rule.id}</TableCell>
                                <TableCell label={'Type'} small>{action}</TableCell>
                                <TableCell label={'Description'} small>
                                    <ReadMoreReact text={rule.description || ""} max={30} ideal={20} min={10} />
                                </TableCell>
                                <TableCell label={'Last executed'} small>
                                    {ago}
                                </TableCell>
                                <TableCell label={'#Triggers'} small>{triggerCount}</TableCell>
                                <TableCell label={'#Targets'} small>{targetCount}</TableCell>
                                <TableCell  label={'Actions'} small center className={'actions'}>
                                    <ActionButtons
                                        edit={() => props.editRule(rule.id)}
                                        remove={() => props.removeRule(rule.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination
                count={props.count}
                onPage={props.onPage}
                onPageChange={props.onPageChange}
                forcePage={props.currentPage}
            />
        </div>
    );
}

export default RulesTable;