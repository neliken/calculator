class Calculator {
    tipAmountCalculator(bill, customPercent, nrOfPeople) {
        const result = bill * customPercent / 100 / nrOfPeople;
        return result.toFixed(2);
    }

    totalCalculator(bill, nrOfPeople, tipAmount) {
        const result = bill / nrOfPeople + tipAmount;
        return result.toFixed(2);
    }
}

const calculator = new Calculator();

class CalculatorUI {
    constructor(calculatorService){
        this.calculatorService = calculatorService;
        this.tipAmountValue = null;
        this.getInputs();
    }

    getElemById(id){
        return document.getElementById(id);
    }

    getInputs(){
        this.bill = this.getElemById("bill");
        this.customPercent = this.getElemById("customPercent");
        this.nrOfPeople = this.getElemById("nrOfPeople");
        this.tipAmount = this.getElemById('tipAmount');
        this.totalPrice = this.getElemById('totalPrice');
    }

    setValues() {
        this.billValue = parseFloat(this.bill.value);
        this.customPercentValue = parseFloat(this.customPercent.value);
        this.nrOfPeopleValue = parseFloat(this.nrOfPeople.value);
    }

    callFunctions(callback) {
            this.tipAmountValue = parseFloat(this.callTipAmountCalculator());
            this.totalPriceValue = parseFloat(this.callTotalCalculator());
    }

    // callFunctions(callback) {
    //     if(callback) {
    //         this.tipAmountValue = parseFloat(this.callTipAmountCalculator());
    //         this.totalPriceValue = parseFloat(this.callTotalCalculator());
    //     }
        
    // }

    setUI() {
        this.tipAmount.innerHTML = "$" + this.tipAmountValue;
        this.totalPrice.innerHTML = "$" + this.totalPriceValue;
    }

    collectValues() {
        const eventHandler = [this.bill, this.customPercent, this.nrOfPeople];

        eventHandler.forEach( event => event.addEventListener('change', () => {
            this.setValues();
            // this.setValues(this.callFunctions());
            this.callFunctions();
            this.setUI();
        }));         
    }

    // register events 
    // call functions with callback
    // once the callback is called collect values and update the UI
    
    callTipAmountCalculator() {
        return this.calculatorService.tipAmountCalculator(this.billValue, this.customPercentValue, this.nrOfPeopleValue);
    }

    callTotalCalculator() {
        return this.calculatorService.totalCalculator(this.billValue, this.nrOfPeopleValue, this.tipAmountValue);
    }
}

const calculatorUI = new CalculatorUI(calculator);

calculatorUI.collectValues();

// class CalculatorUIHandler {
//     changeAmount(){

//     }

//     changeTotal(){

//     }
// }

