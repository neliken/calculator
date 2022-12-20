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
    constructor(calculatorService) {
        this.calculatorService = calculatorService;
        this.getInputs();
    }

    getElemById(id){
        return document.getElementById(id);
    }

    selectTip(span) {
        this.deleteActive(this.spans);
        span.classList.add('active');
        this.customPercent.value = '';
        let value =  (span.innerHTML).replace("%", '')
        this.customPercentValue = parseInt(value);
    }

    deleteActive(spans) {
        spans.forEach( span => {
            span.classList.remove('active');
        })
    }

    getInputs(){
        this.bill = this.getElemById("bill");
        this.customPercent = this.getElemById("customPercent");
        this.nrOfPeople = this.getElemById("nrOfPeople");
        this.tipAmount = this.getElemById('tipAmount');
        this.totalPrice = this.getElemById('totalPrice');
        this.spans = document.querySelectorAll("span");
    }

    setValues() {
        this.billValue = parseFloat(this.bill.value);
        this.nrOfPeopleValue = parseFloat(this.nrOfPeople.value);
        this.customPercentValue = parseFloat(this.customPercent.value);
    } 

    setUI() {
        this.tipAmount.innerHTML = "$" + this.tipAmountValue;
        this.totalPrice.innerHTML = "$" + this.totalPriceValue;
    }

    checkValidInput() {
        if(!this.billValue) {
            this.bill.style.borderColor = 'red';
        }
    }

    reset() {
        this.bill.value = '';
        this.nrOfPeople.value = '';
        this.customPercent.value = '';
        this.tipAmount.innerHTML = '$0.00';
        this.totalPrice.innerHTML = '$0.00';
        this.deleteActive(this.spans);
    }

    callFunctions(callback, t) {
        if(callback) {
            return parseFloat(callback(t));
        }
    }

    collectValues() {
        const eventHandler = [this.bill, this.customPercent, this.nrOfPeople];

        eventHandler.forEach( event => event.addEventListener('change', () => {
            this.setValues();
            let t = this;
            if(this.billValue && this.customPercentValue && this.nrOfPeopleValue) {
                this.tipAmountValue = this.callFunctions(t.callTipAmountCalculator, t);
                this.totalPriceValue = this.callFunctions(t.callTotalCalculator, t);
                this.setUI();
            }
        }));  

        this.spans.forEach( span => span.addEventListener('click', () => {
            this.setValues();
            this.selectTip(span);
            let t = this;
            if(this.billValue && this.customPercentValue && this.nrOfPeopleValue) {
                this.tipAmountValue = this.callFunctions(t.callTipAmountCalculator, t);
                this.totalPriceValue = this.callFunctions(t.callTotalCalculator, t);
                this.setUI();
            }
        }))
    }

    callTipAmountCalculator(t) {
        return t.calculatorService.tipAmountCalculator(t.billValue, t.customPercentValue, t.nrOfPeopleValue);
    }

    callTotalCalculator(t) {
        return t.calculatorService.totalCalculator(t.billValue, t.nrOfPeopleValue, t.tipAmountValue);
    }
}

const calculatorUI = new CalculatorUI(calculator);

calculatorUI.collectValues();