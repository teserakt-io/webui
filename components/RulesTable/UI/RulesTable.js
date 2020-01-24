//@flow
import moment from "moment";
import React from 'react';
import TimeAgo from "react-timeago";
import Rule from '../../../state/view/stores/Forms/Rule';
import ActionButtons from "../../ActionButtons/ActionButtons";
import Button from "../../common/Buttons/Button/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/Table";
import OnPage from "../../Pagination/OnPage";
import Pagination from "../../Pagination/Pagination";

type Props = {
    rules: Array,
    addRule: Function,
    editRule: Function,
    removeRule: Function,
    currentPage: number,
    refresh: Function,
    handleOnPage: Function,
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
            <div className="f-r">
                <OnPage onChange={props.handleOnPage} options={[10, 50, 100]} />
            </div>
            <Table className={'rules__table'}>
                <TableHead>
                    <TableRow border>
                        <TableHeader center style={{ width: '8%' }} center>#</TableHeader>
                        <TableHeader small>Type</TableHeader>
                        <TableHeader style={{ width: '30%' }}>Description</TableHeader>
                        <TableHeader small>Last executed</TableHeader>
                        <TableHeader style={{ width: '6%' }} center>#Triggers</TableHeader>
                        <TableHeader style={{ width: '6%' }} center>#Targets</TableHeader>
                        <TableHeader style={{ width: '6%' }} center>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rules.length > 0 && props.rules.map((rule) => {
                        const triggerCount = rule.triggers ? rule.triggers.length : 0;
                        const targetCount = rule.targets ? rule.targets.length : 0;
                        const ago = moment(rule.lastExecuted).year() === 1 ? "Never" :
                            <TimeAgo date={rule.lastExecuted} />;
                        const action = Rule.types.find(r => r.value === rule.action).label;
                        return (
                            <TableRow key={rule.id}>
                                <TableCell label={'#'} style={{ width: '8%' }} center>{rule.id}</TableCell>
                                <TableCell label={'Type'} small>{action}</TableCell>
                                <TableCell label={'Description'} style={{ width: '30%' }}>
                                    {rule.description}
                                </TableCell>
                                <TableCell label={'Last executed'} small>
                                    {ago}
                                </TableCell>
                                <TableCell label={'#Triggers'} style={{ width: '6%' }} center>{triggerCount}</TableCell>
                                <TableCell label={'#Targets'} style={{ width: '6%' }} center>{targetCount}</TableCell>
                                <TableCell label={'Actions'} style={{ width: '6%' }} center className={'actions'}>
                                    <ActionButtons
                                        edit={() => props.editRule(rule.id)}
                                        remove={() => props.removeRule(rule.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {props.rules.length === 0 && (
                        <TableRow>
                            <TableCell center colSpan="7">
                                <i>Nothing yet !</i>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Pagination
                count={props.count}
                onPage={props.onPage}
                onPageChange={props.onPageChange}
                forcePage={props.currentPage}
            />
        </div >
    );
}

export default RulesTable;
