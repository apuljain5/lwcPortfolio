import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = '';
    weight = '';
    heightFeet = '';
    heightInch = '';
    bmiValue = '';
    bmiResult = '';
    weightUnit = 'kg';
    heightUnit = 'cm';

    get isHeightUnitFeet(){
        return this.heightUnit === 'ft';
    }

    handleWeightUnitChange(event){
        this.weightUnit = event.target.value;
        console.log(this.weightUnit);
    }

    handleHeightUnitChange(event){
        this.heightUnit = event.target.value;
        console.log(this.heightUnit);
    }

    handleOnchange(event){
        
        const {name, value} = event.target;
        if(name === "height"){
            this.height = value;
        }
        if(name === "weight"){
            this.weight = value;
        }
        if(name === "heightInch"){
            this.heightInch = value;
        }
        if(name === "heightFeet"){
            this.heightFeet = value;
        }
        
    }

    handleSubmit(event){
        event.preventDefault();
        this.calculateUnits();
    }

    calculateUnits(){
        if(this.heightUnit === 'm'){
            this.height = this.height * 100;
        }else if(this.heightUnit === 'ft'){
            this.heightFeet = this.heightFeet * 12;
            this.heightInch = this.heightFeet + (this.heightInch * 1);
            this.height = this.heightInch * 2.54;
        }else if(this.heightUnit === 'in'){
            this.height = this.height * 2.54;
        }

        if(this.weightUnit === 'g'){
            this.weight = this.weight/1000;
        }else if(this.weightUnit === 'lbs'){
            this.weight = this.weight/2.205;
        }
        console.log("heightFeet", this.heightFeet);
        console.log("HeightInch", this.heightInch);
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
        this.weightUnit = 'kg';
        this.heightUnit = 'cm';
        this.heightFeet = '';
        this.heightInch = '';
    }
}