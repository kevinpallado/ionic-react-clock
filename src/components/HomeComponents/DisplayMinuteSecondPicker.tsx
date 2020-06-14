import React from 'react';

import { PickerColumn } from '@ionic/core';
import { IonPicker, 
    IonRow, 
    IonCol } from '@ionic/react';

const DisplayMinuteSecondPicker: React.FC<{
    isOpen: boolean;
    onCancel: () => void;
    onSave: (value: any) => void;
}> = props => {

    let minuteOptions:any = [];
    let secondOptions:any = [];

    for(var i = 0; i < 60; i++){
        minuteOptions.push(i > 2 ? { text: i + ' minutes', value: i} : { text: i + ' minute', value: i});
        secondOptions.push(i > 2 ? { text: i + ' seconds', value: i} : { text: i + ' second', value: i});
    }

    const minuteColumn = {
        name: 'Minute',
        options: minuteOptions
    } as PickerColumn;

    const secondColumn = {
        name: 'Seconds',
        options: secondOptions
    } as PickerColumn;

    return(
        <IonRow>
            <IonCol>
                <IonPicker
                    isOpen={props.isOpen}                
                    columns={[ minuteColumn,secondColumn ]}
                    buttons={[
                        {
                            text: "Cancel",
                            role: "cancel",
                            handler: () => {
                                props.onCancel()
                            }
                        },
                        {
                            text: 'Confirm',
                            handler: value => {
                              return props.onSave(value);
                            }
                        }
                    ]}
                />
            </IonCol>
        </IonRow>
    );
}

export default DisplayMinuteSecondPicker;