 import { LightningElement } from 'lwc';

export default class ConvertCurrency extends LightningElement {
    showOutput= false;
    convertedValue= '';
    toCurrency='';
    fromCurrency='';
    enteredAmount = '';
    currencyOptions = [];

    connectedCallback(){
        this.fetchSymbols();
    }
    changeHandler(event){
        let {name, value} = event.target;
        if(name === 'amount'){
            this.enteredAmount = value;
        }else if(name ==='fromcurr'){
            this.fromCurrency = value;
        }else if(name ==='tocurr'){
            this.toCurrency = value;
        }
    }
    clickHandler(){
        this.conversion();
    }

    async fetchSymbols(){
        let endpoint ='https://api.frankfurter.app/currencies';
        try{
            let res = await fetch(endpoint);
            if(!res.ok){
                throw new Error('Network response as not ok');
            }
            const data = await res.json();
            //process the data returned from api
            let options = [];
            for(let symbol in data){
                options=[...options, {label:symbol, value:symbol}];
            }
            this.currencyOptions = [...options];
        } catch(error){
            console.log(error);
        }
        
    }

    async conversion(){
        let endpoint = `https://api.frankfurter.app/latest?amount=${this.enteredAmount}&from=${this.fromCurrency}&to=${this.toCurrency}`;
        try{
            let res = await fetch(endpoint);
            if(!res.ok){
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            this.convertedValue = data.rates[this.toCurrency];
            this.showOutput = true;
        } catch(error){
            console.log(error);
        }
    }
}