import React from 'react';
import TimeIntervalSettings from "./TimeIntervalSettings";
import SubscribeSettings from "./SubscribeSettings";
import UndefinedSettings from "./UndefinedSettings";

type TriggerType = 'UNDEFINED_ACTION' | 'TIME_INTERVAL' | 'CLIENT_SUBSCRIBED';
type Props = {
    type: TriggerType,
};

function Settings(props: Props) {
    console.log("settings: ", props);
    switch (props.type) {
        case 'TIME_INTERVAL':
            return <TimeIntervalSettings {...props}/>;
        case 'CLIENT_SUBSCRIBED':
            return <SubscribeSettings {...props}/>;
        default:
            return <UndefinedSettings {...props}/>;
    }
}

export default Settings;