import React, { Fragment } from 'react';
import Trigger from '../../state/view/stores/Forms/Trigger';
import CustomSelect from '../common/FormElements/Select/Select';

function TimeIntervalSettings(props) {
       return (
              <Fragment>
                     <div className={'help'}>Execute the rule repeatedly at configured time interval</div>

                     <CustomSelect
                            label={'Time interval'}
                            onChange={props.onSettingTimeIntervalChange}
                            value={props.data}
                            options={Trigger.timeIntervalOptions}
                            id={'timeInterval'}
                     />
              </Fragment>
       );
}

export default TimeIntervalSettings;
