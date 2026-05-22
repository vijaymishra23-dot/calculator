let currentInput = '0';
let expression = '';
let operator = null;
let previousInput = null;
let justCalculated = false;

function updateDisplay() {
  document.getElementById('result').textContent = currentInput;
  document.getElementById('expression').textContent = expression;
}

function inputDigit(digit) {
  if (justCalculated) {
    currentInput = digit;
    expression = '';
    justCalculated = false;
  } else if (currentInput === '0') {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (justCalculated) {
    currentInput = '0.';
    justCalculated = false;
  } else if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function inputOperator(op) {
  justCalculated = false;
  previousInput = parseFloat(currentInput);
  operator = op;
  expression = `${currentInput} ${op === '*' ? '×' : op === '/' ? '÷' : op}`;
  currentInput = '0';
  updateDisplay();
}

function calculate() {
  if (operator === null || previousInput === null) return;

  const current = parseFloat(currentInput);
  const opSymbol = operator === '*' ? '×' : operator === '/' ? '÷' : operator;
  expression = `${previousInput} ${opSymbol} ${current} =`;

  let result;
  switch (operator) {
    case '+': result = previousInput + current; break;
    case '-': result = previousInput - current; break;
    case '*': result = previousInput * current; break;
    case '/':
      result = current === 0 ? 'Error' : previousInput / current;
      break;
  }

  currentInput = result === 'Error' ? 'Error' : String(parseFloat(result.toFixed(10)));
  operator = null;
  previousInput = null;
  justCalculated = true;
  updateDisplay();
}

function clearAll() {
  currentInput = '0';
  expression = '';
  operator = null;
  previousInput = null;
  justCalculated = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '0' && currentInput !== 'Error') {
    currentInput = String(parseFloat(currentInput) * -1);
    updateDisplay();
  }
}

function percent() {
  if (currentInput !== 'Error') {
    currentInput = String(parseFloat(currentInput) / 100);
    updateDisplay();
  }
}
