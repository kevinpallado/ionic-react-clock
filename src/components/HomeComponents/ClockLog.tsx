import React from 'react';
import {
    IonButton
} from '@ionic/react';

import axios from 'axios';

const ClockLog: React.FC<{
    minutes: number;
    seconds: number;
    idUsed: any;
}> = props => {

    const logTime = () => {
        let data = {
          event: 'log-time',
          clock_id : props.idUsed,
          log_minute: props.minutes,
          log_second: props.seconds
        };
    
        axios.post('http://localhost:80/clock/index.php', data).then(res => {
          console.log(res);
        }).catch(e => { console.log('error => ' + e)})
    }

    return(
        <IonButton size="large" onClick={ logTime } expand="block">Log Time</IonButton>
    );
};

export default ClockLog;