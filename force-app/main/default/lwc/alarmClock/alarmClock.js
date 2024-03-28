import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClock extends LightningElement {
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png';
    currentTime = '';

    connectedCallback(){
        this.currentTimeHandler();
    }

    currentTimeHandler(){
        setInterval(() => {
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let sec = dateTime.getSeconds();
            let ampm = 'AM';

            if(hour == 0){
                hour = 12;
                ampm = 'AM'
            }else if(hour == 12){
                ampm = 'PM';
            }else if(hour > 12){
                hour -= 12;
                ampm = 'PM';
            }

            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;

            this.currentTime = `${hour}:${min}:${sec} ${ampm}`;
        }, 1000)
    }
}