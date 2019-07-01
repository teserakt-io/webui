import React from 'react';
import TimeIntervalSettings from "./TimeIntervalSettings";
import SubscribeSettings from "./SubscribeSettings";
import UndefinedSettings from "./UndefinedSettings";

type TriggerType = 'UNDEFINED_ACTION' | 'TIME_INTERVAL' | 'CLIENT_SUBSCRIBED';
type Props = {
    type: TriggerType,
};

function Settings(props: Props) {
    switch (props.type) {
        case 'TIME_INTERVAL':
            return <TimeIntervalSettings/>;
        case 'CLIENT_SUBSCRIBED':
            return SubscribeSettings;
        default:
            return UndefinedSettings;
    }
}

export default Settings;