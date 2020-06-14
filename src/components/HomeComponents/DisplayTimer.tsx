import React from 'react';
import {
    IonCard,
    IonCardContent
} from '@ionic/react';

const DisplayTimer: React.FC<{
    minutes: number,
    seconds: number
}> = props => {
    return(
        <IonCard>
            <IonCardContent>
                { props.minutes === 0 && props.seconds === 0
                    ? <h1>Time's Up!</h1>
                    : <h1>Time Remaining: {props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</h1>
                }
            </IonCardContent>
        </IonCard>
    );
};

export default DisplayTimer;