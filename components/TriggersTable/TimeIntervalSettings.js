import React, {Fragment} from 'react';
import Input from "../common/FormElements/Input/Input";

function TimeIntervalSettings(props) {
    return (
        <Fragment>
            <div className={'cron'}>
                <Input label={'seconds'}
                       onChange={props.onSettingChange}
                       value={props.data.seconds}
                       id={'seconds'}/>
                   <Input label={'minutes'}
                       onChange={props.onSettingChange}
                       value={props.data.minutes}
                       id={'minutes'}/>
                <Input label={'hours'}
                       onChange={props.onSettingChange}
                       value={props.data.hours}
                       id={'hours'}/>
                <Input label={'days'}
                       onChange={props.onSettingChange}
                       value={props.data.days}
                       id={'days'}/>
                <Input label={'month'}
                       onChange={props.onSettingChange}
                       value={props.data.month}
                       id={'month'}/>
                <Input label={'weeks'}
                       onChange={props.onSettingChange}
                       value={props.data.weeks}
                       id={'weeks'}/>
                <Input label={'years'}
                       onChange={props.onSettingChange}
                       value={props.data.years}
                       id={'years'}/>
            </div>
        </Fragment>
    );
}

export default TimeIntervalSettings;