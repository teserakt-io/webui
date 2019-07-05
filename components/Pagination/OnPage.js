//@flow
import React from 'react';

type Props = {
    onChange: Function,
    options: Array,
};
function OnPage(props: Props) {
    return (
        <select name="onPage" id="onPage" onChange={e => props.onChange(e.target.value)} className={'select'}>
            {props.options.map((option, idx) => (
                <option value={option} key={idx}>{option}</option>
            ))}
        </select>
    );
}

export default OnPage;