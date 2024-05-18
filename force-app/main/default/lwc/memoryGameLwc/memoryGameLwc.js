import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import fontawesome from '@salesforce/resourceUrl/fontawesome';

export default class MemoryGameLwc extends LightningElement {
    isLibLoaded = false;
    openedCards = [];
    matchedCards = [];
    moves = 0;
    totalTime = "00:00";
    timeRef;
    cards = [
        {id:1, listClass:"card", type:"diamond", icon:"fa fa-diamond"},
        {id:2, listClass:"card", type:"plane", icon:"fa fa-paper-plane-o"},
        {id:3, listClass:"card", type:"anchor", icon:"fa fa-anchor"},
        {id:4, listClass:"card", type:"bolt", icon:"fa fa-bolt"},
        {id:5, listClass:"card", type:"cube", icon:"fa fa-cube"},
        {id:6, listClass:"card", type:"anchor", icon:"fa fa-anchor"},
        {id:7, listClass:"card", type:"leaf", icon:"fa fa-leaf"},
        {id:8, listClass:"card", type:"bicycle", icon:"fa fa-bicycle"},
        {id:9, listClass:"card", type:"diamond", icon:"fa fa-diamond"},
        {id:10, listClass:"card", type:"plane", icon:"fa fa-paper-plane-o"},
        {id:11, listClass:"card", type:"bomb", icon:"fa fa-bomb"},
        {id:12, listClass:"card", type:"bolt", icon:"fa fa-bolt"},
        {id:13, listClass:"card", type:"cube", icon:"fa fa-cube"},
        {id:14, listClass:"card", type:"bomb", icon:"fa fa-bomb"},
        {id:15, listClass:"card", type:"leaf", icon:"fa fa-leaf"},
        {id:16, listClass:"card", type:"bicycle", icon:"fa fa-bicycle"},
    ]

    displayCard(event){
        let currentCard = event.target;
        currentCard.classList.add("open", "show", "disabled");
        this.openedCards = this.openedCards.concat(currentCard);
        const len = this.openedCards.length 
        if(len === 2){
            this.moves += 1;
            if(this.moves === 1){
                this.timer();
            }
            if(this.openedCards[0].type === this.openedCards[1].type){
                this.matchedCards = this.matchedCards.concat(this.openedCards[0], this.openedCards[1]);
                this.matched();
            }else{
                this.unmatched();
            }
        }
    }

    timer(){
        let startTime = new Date();
        this.timeRef = setInterval(() => {
            let diff = new Date().getTime() - startTime.getTime();
            let d = Math.floor(diff/1000);
            const m = Math.floor(d % 3600 / 60);
            const s = Math.floor(d % 3600 % 60);
            const mDisplay = m>0 ? m+(m === 1 ? " minute, " : " minutes, ") : "";
            const sDisplay = s>0 ? s+(s === 1 ? " second" : " seconds") : "";
            this.totalTime = mDisplay+sDisplay;
        }, 1000)
    }

    matched(){
        this.openedCards[0].classList.add("match", "disabled");
        this.openedCards[1].classList.add("match", "disabled");
        this.openedCards[0].classList.remove("show", "open");
        this.openedCards[1].classList.remove("show", "open");
        this.openedCards = [];
        if(this.matchedCards.length === 16){
            window.clearInterval(this.timeRef);
        }
    }

    unmatched(){
        this.openedCards[0].classList.add("unmatch");
        this.openedCards[1].classList.add("unmatch");
        this.action("DISABLE");
        this.timeoutUtility();
    }

    timeoutUtility(){
        setTimeout(() => {
            this.openedCards[0].classList.remove("show", "open", "unmatch");
            this.openedCards[1].classList.remove("show", "open", "unmatch");
            this.action("ENABLE");
            this.openedCards = [];
        }, 1100);
    }

    action(action){
        let cards = this.template.querySelectorAll(".card");
        Array.from(cards).forEach(card => {
            if(action === 'ENABLE'){
                let isMatch = card.classList.contains('match');
                if(!isMatch){
                    card.classList.remove('disabled');
                }
            }
            if(action === 'DISABLE'){
                card.classList.add('disabled');
            }
        });
    }

    shuffle(){
        this.openedCards = [];
        this.matchedCards = [];
        this.moves = 0;
        this.totalTime = "00:00"
        window.clearInterval(this.timeRef);
        let elem = this.template.querySelectorAll(".card");
        Array.from(elem).forEach(card => {
            card.classList.remove("show", "open", "match", "disabled");
        })

        
        let cardArr = [...this.cards];
        
        let counter = cardArr.length;
        console.log(counter);
        while(counter > 0){
            let index = Math.floor(Math.random() * counter);
            counter--;

            let temp = cardArr[counter];
            cardArr[counter] = cardArr[index];
            cardArr[index] = temp;
        }
        this.cards = [...cardArr];
        //console.log(JSON.stringify(this.cards));
    }


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