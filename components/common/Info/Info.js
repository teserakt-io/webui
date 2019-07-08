//@flow
import React from 'react';
require('./Info.scss');

type Props = {
    text: string,
}

function Info(props: Props) {
    return (
        <span className={'info'}>
            {props.text}
        </span>
    );
}

export default Info;