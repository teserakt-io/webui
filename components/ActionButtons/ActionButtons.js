//@flow
import React, {Fragment} from 'react';
import FontAwesome from "react-fontawesome";
import Info from "../common/Info/Info";
import Icon from "../common/Icon/Icon";

type Props = {
    edit?: Function,
    remove?: Function,
};

function ActionButtons(props: Props) {
    return (
        <Fragment>
            {props.edit && <span className={'info-container'} onClick={props.edit}>
                <FontAwesome name={'file'} className={'pointer'}/>
                <Info text={'Edit'}/>
            </span>}
            {props.remove && <span className={'info-container'} onClick={props.remove} role="presentation">
                <Icon color="black" className="pointer" d={Icon.d.BIN} marginBottom={-12}/>
                <Info text={'Delete'}/>
            </span>}
        </Fragment>
    );
}

export default ActionButtons;