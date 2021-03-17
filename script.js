//select elements
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const displayValue = document.getElementById("display-value");
const acButton = document.getElementById("AC-button");
const delButton = document.getElementById("delete-button");
const plusMinusButton = document.getElementById("plus-minus-button");
const resultButton = document.getElementById("result-button");

//temporary values used for operations
let tempResult = 0;
let tempOperation = null;

let operationJustCliked = false;
let firstOperationClicked = true;
let resultJustClicked = false;

//add event listener to numbers
numberButtons.forEach(button => button.addEventListener("click", numberClicked));

//add event listeners to operations
operationButtons.forEach(button => button.addEventListener("click",operationClicked));

//add event listener to resultButton
resultButton.addEventListener("click", displayResult);

//add event listener to AC-button
acButton.addEventListener("click", clear);

//add event listener to Delete Button
delButton.addEventListener("click", deleteChar);

//add event listener to plusMinusButton
plusMinusButton.addEventListener("click", changeSign);

function changeSign() {
    
    //if negative, remove minus sign
    if (displayValue.textContent.startsWith("-")) {

        displayValue.textContent = displayValue.textContent.slice(1);
    
    //else, add minus sign
    } else {
        displayValue.textContent = "-" + displayValue.textContent;
    }
}

function operationClicked(e) {

    const idOfElem = e.target.id;

    chooseOperation(idOfElem)
}

function chooseOperation(operation) {

    //if not firstOperationClicked
    if (!firstOperationClicked && !resultJustClicked) {
        displayResult();
    }

    //save value in display
    tempResult = parseFloat(displayValue.textContent);

    //get ID of clicked element

    //set tempOperation according to ID of Element
    switch (operation) {

        case "modulo-button":
            tempOperation = "mod";
            break;

        case "div-button":
            tempOperation = "div";
            break;

        case "add-button":
            tempOperation = "add";
            break;
    
            
        case "sub-button":
            tempOperation = "sub";
            break;

        case "mul-button":
            tempOperation = "mul";
            break;
    
        default:
            break;
    }

    //FLAGS:
    operationJustCliked = true;
    firstOperationClicked = false;
    resultJustClicked = false;
}

function numberClicked(e) {
    displayNumber(this.textContent);
}

function displayNumber(str) {
    
    //if text not too long
    if (displayValue.textContent.length < 13 || operationJustCliked) {

        //if "." was clicked
        if (this.textContent === ".") {

            //if number already contains ".", don't do anything
            if (display.textContent.includes(".")) {
                return;
            }
        }

        //if 0 is being displayed or an operation was just clicked or result was just clicked
        if (displayValue.textContent === "0" || operationJustCliked || resultJustClicked) {

            //if result was just clicked, clear calculator
            if (resultJustClicked) {
                clear();
            }

            //display the number
            displayValue.textContent = str;

        } else {

            //append number to display value
            displayValue.textContent += str;
        }
    
    } 

    //reset JustClicked
    operationJustCliked = false;
    resultJustClicked = false;
}

function displayResult() {
    
    //get number being displayed
    const displayOperator = parseFloat(displayValue.textContent);

    //get result of operation
    let result = operate(tempOperation, tempResult, displayOperator);

    //if result too long, convert to exponential notation
    if (result.toString().length > 13) {
        result = result.toExponential(5);
    }

    //reset tempOperation and save result
    tempOperation = null;
    tempResult = result;

    //display result
    displayValue.textContent = result;

    //update flags
    resultJustClicked = true;
    operationJustCliked = false;
}

function clear() {
    //reset temporary values
    tempOperation = null;
    tempResult = 0;

    //reset flags
    operationJustCliked = false;
    resultJustClicked = false;
    firstOperationClicked = true;

    //reset display value
    displayValue.textContent = "0";
}

function deleteChar() {

    if (displayValue.textContent.length > 1) {
    
        //remove last character of display value
        displayValue.textContent = displayValue.textContent.slice(0, -1);

    } else if(displayValue.textContent.length === 1){
        
        //set display to 0
        displayValue.textContent = "0";

    } else {
        //reset calculator
        clear();
    }
}

//Operation functions

const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const modulo = (a, b) => a % b;

const operate = function (operator, a, b) {
    
    switch (operator) {
        case "add":
            return add(a, b);
        
        case "sub":
            return substract(a, b);
        
        case "mul":
            return multiply(a, b);

        case "div":
            
            //avoid division by 0
            if (b === 0) {
                return "MATH ERROR";
            }

            return divide(a, b);

        case "mod":
            //avoid division by 0
            if (b === 0) {
                return "MATH ERROR";
            }

            return modulo(a, b);
    
        default:
            break;
    }
}

//KEYBOARD SUPPORT

window.addEventListener("keydown", filterInput);

function filterInput(e) {

    //get key
    let key = e.key;

    //if number pressed, display it
    if (!isNaN(key)) {
        displayNumber(key);
    }

    switch (key) {

        //Operations pressed
        case "+":
            chooseOperation("add-button");
            break;

        case "-":
            chooseOperation("sub-button");
            break;

        case "/":
            chooseOperation("div-button");
            break;
    
        case "*":
            chooseOperation("mul-button");
            break;

        case "%":
            chooseOperation("modulo-button");
            break;

        //delete pressed
        case "Delete":
            deleteChar();
            break;

        //enter or result pressed
        case "Enter":
        case "=":
            displayResult();
            break;
    
    
        default:
            break;
    }
}

