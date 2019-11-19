import React from 'react';
import EventSettings from "./EventSettings";
import TimeIntervalSettings from "./TimeIntervalSettings";

type TriggerType = 'TIME_INTERVAL' | 'EVENT';
type Props = {
    type: TriggerType,
};

function Settings(props: Props) {
    switch (props.type) {
        case 'EVENT':
            return <EventSettings {...props} />;
        case 'TIME_INTERVAL':
        default:
            return <TimeIntervalSettings {...props} />;
    }
}

export default Settings;
