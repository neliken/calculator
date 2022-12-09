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

class CalculatorHandler {
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

    callFunctions(callback, t) {
        if(callback) {
            return parseFloat(callback(t));
        }
    }

    setUI() {
        this.tipAmount.innerHTML = "$" + this.tipAmountValue;
        this.totalPrice.innerHTML = "$" + this.totalPriceValue;
    }

    collectValues() {
        const eventHandler = [this.bill, this.customPercent, this.nrOfPeople];

        eventHandler.forEach( event => event.addEventListener('change', () => {
            this.setValues();
            let t = this;
            this.tipAmountValue = this.callFunctions(t.callTipAmountCalculator, t);
            this.totalPriceValue = this.callFunctions(t.callTotalCalculator, t);
            this.setUI();
        }));         
    }
    // register events 
    // call functions with callback
    // once the callback is called collect values and update the UI
    
    callTipAmountCalculator(t) {
        return t.calculatorService.tipAmountCalculator(t.billValue, t.customPercentValue, t.nrOfPeopleValue);
    }

    callTotalCalculator(t) {
        return t.calculatorService.totalCalculator(t.billValue, t.nrOfPeopleValue, t.tipAmountValue);
    }
}

const calculatorHandler = new CalculatorHandler(calculator);

calculatorHandler.collectValues();