// operations
var add = (a, b) => parseFloat(a) + parseFloat(b);
var subtract = (a, b) => parseFloat(a) - parseFloat(b);
var multiply = (a, b) => parseFloat(a) * parseFloat(b);
var divide = function (a, b) {
    if (b == 0) {
        display.innerText="ERROR";
        return "ERROR, dividing by zero!"
    } else {
        return parseFloat(a) / parseFloat(b);
    }
};
var percentage = (a) => parseFloat(a)/100;
var sign_change = (a) => -(a);

function operate() {
    if (!operatorCounter.length) {
        clear.click();
        return;
    }

    let total = 0;
    let length = operatorCounter.length;

    for (let i = 0; i < length; i++) {
        let index = checkOperators(operatorCounter);
        let operator = operatorCounter[index];
        let a = numbers[index];
        let b = numbers[index + 1];

        total = (operator == '+') ? add(a, b) :
            (operator == '-') ? subtract(a, b) :
                (operator == 'x') ? multiply(a, b) :
                    divide(a, b);
        total = round(total);
        if (total == 'undefined' || total == 'Infinity' || total == 'ERROR, dividing by zero!' || isNaN(total)) {
            total = 'ERROR'
            break;
        }

        numbers.splice(index, 2, total);
        operatorCounter.splice(index, 1)
    }
    operatorCounter = [];
    counter = 0;
    numbers = [];
    if (total == 'ERROR') {
        alert('ERROR');
        display.innerText = '';
        total = 0;
    }
    else {
        numbers = [round(total)];
        display.innerText = round(total);
        dotCounter = true;
    }
}

function round(value, decimals=3) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function checkOperators(text) {
    let index = text.findIndex((a) => (a == 'x' || a == '/'))
    if (index != -1) {
        return index
    }
    index = text.findIndex((a) => (a == '+' || a == '-'))
    return index;
}

// listeners
const digits = document.querySelectorAll(".digits");
const dot = document.querySelector("#dot");
const oneOperator = document.querySelectorAll(".oneOperator");
const operator = document.querySelectorAll(".operator");
const clear = document.getElementById('clear');
const del = document.getElementById('delete');
const equals = document.getElementById('equals')

// tracking
let counter = 0;
let dotCounter = false;
let numbers = [];
let operatorCounter = [];

// button functions
digits.forEach((button) => button.addEventListener('click', () => {
    display.innerText += button.innerText;
    if (numbers[counter]) {
        numbers[counter] += button.innerText;
    }
    else {
        numbers[counter] = button.innerText;
    }

}));

dot.addEventListener('click', (e) => {
    if (dotCounter == false) {
        display.innerText += dot.innerText;
        if (numbers[counter]) {   
            numbers[counter] += dot.innerText;
        } 
        dotCounter = true;
    };

});

oneOperator.forEach((button) => button.addEventListener('click', () => {
   if (button.innerText == "%" && numbers) {
       console.log('hi');
   } else if (button.innerText == "+/-") {
       display.innerText = "-" + numbers;
   }

}));

operator.forEach((button) => button.addEventListener('click', () => {
    display.innerText += button.innerText;
    operatorCounter.push(button.innerText);
    dotCounter = false;
    counter++;
}));

clear.onclick = () => {
    display.innerText = "";
    numbers = [];
    operatorCounter = [];
    counter = 0;
    dotCounter = false;
};


del.onclick = () => {
    let current = display.innerText;

    while (!numbers[counter]) {
        if (counter == 0) {
            break;
        }
        counter--;
    }
    if (current.endsWith('+') || current.endsWith('-') || 
        current.endsWith('x') || current.endsWith('/')) {
        if (operatorCounter.length == 1) {
            operatorCounter = [];
        }
        else {
            operatorCounter.pop();
        }
    }
    else {
        numbers[counter] = numbers[counter].slice(0, numbers[counter].length - 1)
        if (!numbers[counter]) {
            numbers.pop();
            counter--;
        }
    }

    if (counter < 0) counter = 0;


    display.innerText = current.slice(0, current.length - 1);
}

equals.addEventListener('click', operate);

// keyboard support
document.onkeydown = function (e) {
    if (e.key == "c" || e.key == "C") {
        clear.click();
        return;
    } else if (e.key == "Backspace" || e.key == "Deleter") {
        del.click();
        console.log('hi');
        return;
    } else if (equals.innerText == e.key || e.key == 'Enter') {
        equals.click();
        return
    } else if (e.key == '.') {
        dot.click();
        return;
    };


    digits.forEach((button) => {
        if (button.innerText == e.key) {
            button.click();
            return;
        }
    })

    operator.forEach((button) => {
        if (button.innerText == e.key || button.dataset.val == e.key) {
            button.click();
            return;
        }
    })

}