//select elements
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const displayValue = document.getElementById("display-value");
const acButton = document.getElementById("AC-button");
const delButton = document.getElementById("delete-button");
const ansButton = document.getElementById("answer=button");
const resultButton = document.getElementById("result-button");

//temporary values used for operations
let tempResult = 0;
let tempOperation = null;

//TODO: Handle operation clicked twice in a row
let operationJustCliked = false;
let firstOperationClicked = true;

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

function operationClicked(e) {

    //if not firstOperationClicked
    if (!firstOperationClicked) {
        displayResult();
    }

    //save value in display
    tempResult = parseFloat(displayValue.textContent);

    //get ID of clicked element
    const idOfElem = e.target.id;

    //set tempOperation according to ID of Element
    switch (idOfElem) {

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

    //set operationJustClicked
    operationJustCliked = true;

    //set firstOperationClicked
    firstOperationClicked = false;
}

function numberClicked(e) {

    //TODO: Handle multiple points

    //if text not too long
    if (displayValue.textContent.length < 13 || operationJustCliked) {

        //if 0 is being displayed or an operation was just clicked
        if (displayValue.textContent === "0" || operationJustCliked) {

            //display the number
            displayValue.textContent = this.textContent;

        } else {

            //append number to display value
            displayValue.textContent += this.textContent;
        }
    
    } else {
        //TODO: print error message
    }

    //reset JustClicked
    operationJustCliked = false;
}

function displayResult() {
    const displayOperator = parseFloat(displayValue.textContent);
    let result = operate(tempOperation, tempResult, displayOperator);

    if (result.toString().length > 13) {
        result = result.toExponential(5);
    }

    tempOperation = null;
    tempResult = result;

    displayValue.textContent = result;
}

function clear() {
    //reset temporary values
    tempOperation = null;
    tempResult = 0;

    //reset flags
    operationJustCliked = false;
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