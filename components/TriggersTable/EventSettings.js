import React, { Fragment } from 'react';
import Input from "../common/FormElements/Input/Input";
import CustomSelect from "../common/FormElements/Select/Select";

function EventSettings(props) {
    return (
        <Fragment>
            <div className={'eventSettings'}>
                <Input label={'max occurence'}
                    type="number"
                    min="1"
                    onChange={props.onSettingChange}
                    value={props.data.maxOccurence}
                    id={'maxOccurence'} />
                <CustomSelect label={'event type'}
                    onChange={props.onSettingEventTypeChange}
                    value={props.data.eventType}
                    options={["CLIENT_SUBSCRIBED", "CLIENT_UNSUBSCRIBED"]}
                    id={'eventType'} />
            </div>
        </Fragment>
    );
}

export default EventSettings;
