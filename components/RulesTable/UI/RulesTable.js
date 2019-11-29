//@flow
import moment from "moment";
import React from 'react';
import FontAwesome from "react-fontawesome";
import TimeAgo from "react-timeago";
// import Truncate from 'react-truncate';
import ReadMoreReact from 'read-more-react';
import Rule from '../../../state/view/stores/Forms/Rule';
import { spacedLongString } from "../../../utils/helpers";
import ActionButtons from "../../ActionButtons/ActionButtons";
import Button from "../../common/Buttons/Button/Button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/Table";
import Pagination from "../../Pagination/Pagination";

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
                <FontAwesome name={'refresh'} />
            </Button>
            <Table className={'rules__table'}>
                <TableHead>
                    <TableRow border>
                        <TableHeader small center>#</TableHeader>
                        <TableHeader small>Type</TableHeader>
                        <TableHeader small>Description</TableHeader>
                        <TableHeader small>Last executed</TableHeader>
                        <TableHeader small>#Triggers</TableHeader>
                        <TableHeader small>#Targets</TableHeader>
                        <TableHeader small>Actions</TableHeader>
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
                                <TableCell label={'#'} small center>{rule.id}</TableCell>
                                <TableCell label={'Type'} small>{action}</TableCell>
                                <TableCell label={'Description'} small>
                                    <ReadMoreReact text={spacedLongString(rule.description || "", 30)} max={30} ideal={20} min={10} />
                                </TableCell>
                                <TableCell label={'Last executed'} small>
                                    {ago}
                                </TableCell>
                                <TableCell label={'#Triggers'} small>{triggerCount}</TableCell>
                                <TableCell label={'#Targets'} small>{targetCount}</TableCell>
                                <TableCell label={'Actions'} small center className={'actions'}>
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
        </div>
    );
}

export default RulesTable;
