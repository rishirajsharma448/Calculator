let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousValue = '';
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '.') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '') return;
    
    if (previousValue !== '' && !shouldResetDisplay) {
        calculate();
    } else {
        previousValue = currentInput;
    }
    
    operator = op;
    currentInput = '';
    shouldResetDisplay = true;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (currentInput.indexOf('.') === -1) {
        if (currentInput === '') {
            currentInput = '0.';
        } else {
            currentInput += '.';
        }
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '' || currentInput === '0') return;
    
    if (currentInput.charAt(0) === '-') {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    updateDisplay();
}

function calculate() {
    if (currentInput === '' || previousValue === '' || operator === '') return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 0 : prev / current;
            break;
        default:
            return;
    }
    
    // Remove trailing zeros after decimal point
    result = parseFloat(result.toFixed(10));
    currentInput = result.toString();
    operator = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousValue = '';
    shouldResetDisplay = false;
    display.value = '0';
}

function updateDisplay() {
    display.value = currentInput || '0';
}

// Initialize display
clearDisplay();