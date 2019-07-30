import React from 'react';
import EventSettings from "./EventSettings";
import TimeIntervalSettings from "./TimeIntervalSettings";
import UndefinedSettings from "./UndefinedSettings";

type TriggerType = 'UNDEFINED_ACTION' | 'TIME_INTERVAL' | 'EVENT';
type Props = {
    type: TriggerType,
};

function Settings(props: Props) {
    switch (props.type) {
        case 'TIME_INTERVAL':
            return <TimeIntervalSettings {...props} />;
        case 'EVENT':
            return <EventSettings {...props} />;
        default:
            return <UndefinedSettings {...props} />;
    }
}

export default Settings;
