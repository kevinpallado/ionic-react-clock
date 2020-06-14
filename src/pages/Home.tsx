import React, { useEffect, useState } from 'react';
import { IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonRow,
  IonCol,
  IonButton,
  IonLoading, 
  IonGrid} from '@ionic/react';

import DisplayMinuteSecondPicker from '../components/HomeComponents/DisplayMinuteSecondPicker';
import DisplayTimer from '../components/HomeComponents/DisplayTimer';
import ClockLog from '../components/HomeComponents/ClockLog';

import axios from 'axios';

import './Home.css';

const Home: React.FC = () => {
  const [ minutes, setMinutes ] = useState<number>(0);
  const [ seconds, setSeconds ] = useState<number>(0);
  const [ runInterval, setRunInterval ] = useState<boolean>(false);
  const [ startTimerNow, setStartTimer ] = useState<boolean>(false); // use to hide button elements
  // ui states
  const [ showLoading, setShowLoading ] = useState<boolean>(false);
  const [ isPickerOpen, setPickerIsOpen ] = useState<boolean>(false);
  // return id (clock)
  const [ clockIdReference, setClockId ] = useState<number>();

  useEffect(() => {
    if(runInterval) {
      let clockInterval = setInterval(() => {
        if(seconds > 0) {
          setSeconds(seconds - 1);
        }

        if(seconds === 0) {
          if(minutes === 0) {
            setStartTimer(false);
            setRunInterval(false); // will be the one to check if let clock interval runs
            return () => clearInterval(clockInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(clockInterval);
    }
  });

  const startTimer = () => {
    if(startTimerNow) {
      setShowLoading(true);
      if(!showLoading) {
        stampTimer();
        setRunInterval(true);
      }
    } else {
      setPickerIsOpen(true);
    }
  }

  const stampTimer = () => {
    const data = {
      event: 'register-time',
      set_minute: minutes,
      set_second: seconds
    };

    axios.post('http://localhost:80/clock/index.php', data).then(res => {
      setClockId(res.data);
    }).catch(e => { console.log('error => ' + e)})
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Clock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={500}
      />
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
            { startTimerNow ? (!runInterval && <IonButton size="large" onClick={ startTimer } expand="block">Start</IonButton>) : <IonButton size="large" onClick={ startTimer } expand="block">Set Time</IonButton> }
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <DisplayTimer minutes={minutes} seconds={seconds}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              { runInterval && <ClockLog minutes={minutes} seconds={seconds} idUsed={clockIdReference}/> }
            </IonCol>
          </IonRow>
          <IonRow>
            <DisplayMinuteSecondPicker
            isOpen={isPickerOpen}
            onCancel={() => {
              setPickerIsOpen(false);
            }}
            onSave={(value: any) => {
              setMinutes(value.Minute.value);
              setSeconds(value.Seconds.value);
              setStartTimer(true);
              setPickerIsOpen(false);
            }}/>
          </IonRow>
        </IonGrid>
        
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
