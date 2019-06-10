import React from 'react';
require('./TextCard.scss');

function TextCard(props) {
    return (
        <div className={'text-card'}>
            {props.children}
        </div>
    );
}

export default TextCard;