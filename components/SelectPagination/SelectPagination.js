import MultiSelect from "@kenshooui/react-multi-select";
import React from 'react';
import Pagination from "../Pagination/Pagination";
require("@kenshooui/react-multi-select/dist/style.css");

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
                showSearch={false} // Search removed until backend support it
                items={items}
                selectedItems={props.value}
                onChange={props.onSelect} />
            <Pagination count={props.count}
                onPageChange={props.onPageChange} />
        </React.Fragment>
    );
}

export default SelectPagination;
