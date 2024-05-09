import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import fontawesome from '@salesforce/resourceUrl/fontawesome';

export default class MemoryGameLwc extends LightningElement {
    isLibLoaded = false;
    renderedCallback(){
        if(!this.isLibLoaded){
            loadStyle(this, fontawesome+'/fontawesome/css/font-awesome.min.css')
            .then(() => {
                console.log("Loaded successfully");
            }).catch((error) => {
                console.log(error);
            })
            this.isLibLoaded = true;
        }
        
    }
}