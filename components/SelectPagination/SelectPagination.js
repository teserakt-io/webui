import React from 'react';
import CustomSelect from "../common/FormElements/Select/Select";
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
            value: item,
            label: item,
        };
    });
    return (
        <React.Fragment>
            <CustomSelect name={props.name}
                          onChange={props.onSelect}
                          isMulti
                          removeSelected
                          value={props.value}
                          options={items}/>
            <Pagination count={props.count}
                        onPageChange={props.onPageChange}/>
        </React.Fragment>
    );
}

export default SelectPagination;