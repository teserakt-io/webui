import React, { Fragment } from 'react';
import Trigger from "../../state/view/stores/Forms/Trigger";
import Input from "../common/FormElements/Input/Input";
import CustomSelect from "../common/FormElements/Select/Select";


function EventSettings(props) {
    return (
        <Fragment>
            <div className={'eventSettings'}>
                <Input label={'max occurrence'}
                    type="number"
                    min="1"
                    onChange={props.onSettingChange}
                    value={props.data.maxOccurrence}
                    id={'maxOccurrence'} />
                <CustomSelect label={'event type'}
                    onChange={props.onSettingEventTypeChange}
                    value={props.data.eventType}
                    options={Trigger.eventTypeOptions}
                    id={'eventType'}
                />
            </div>
        </Fragment>
    );
}

export default EventSettings;
