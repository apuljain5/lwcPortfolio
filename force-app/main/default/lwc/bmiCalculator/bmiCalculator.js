import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = '';
    weight = '';
    bmiValue = '';
    bmiResult = '';

    handleOnchange(event){
        
        const {name, value} = event.target;
        if(name === "height"){
            this.height = value;
        }
        if(name === "weight"){
            this.weight = value;
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("height", this.height);
        console.log("weight", this.weight);
        this.calculateBMI()
    }

    calculateBMI(){
        let height = Number(this.height)/100;
        let bmi = Number(this.weight)/(height * height);
        bmi = Number(bmi.toFixed(2));
        if(bmi < 18.5){
            this.bmiResult = "Underweight";
        }else if(bmi < 25){
            this.bmiResult = "Healthy";
        }else if(bmi < 30){
            this.bmiResult = "Overweight.";
        }else{
            this.bmiResult = "Obese.";
        }
        this.bmiValue = bmi;

        console.log("Your BMI is: ", bmi);
        console.log(this.bmiResult);
    }

    recalculateBMI(){
        this.height = '';
        this.weight = '';
        this.bmiValue = '';
        this.bmiResult = '';
    }
}