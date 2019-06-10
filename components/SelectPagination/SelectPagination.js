import React from 'react';
import MultiSelect from "@kenshooui/react-multi-select";
require("@kenshooui/react-multi-select/dist/style.css");
import Pagination from "../Pagination/Pagination";

type Props = {
    count: number,
    onPageChange: Function,
    onSelect: Function,
    items: Array,
}

function SelectPagination(props: Props) {
    const items = props.items.map(item => {
        return {
            id: item,
            label: item,
        };
    });
    return (
        <React.Fragment>
            <MultiSelect
                items={items}
                selectedItems={props.value}
                onChange={props.onSelect}/>
            <Pagination count={props.count}
                        onPageChange={props.onPageChange}/>
        </React.Fragment>
    );
}

export default SelectPagination;