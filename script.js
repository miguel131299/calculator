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
let numberJustClicked = false;

//add event listener to numbers
numberButtons.forEach(button => button.addEventListener("click", numberClicked));

//add event listeners to operations
operationButtons.forEach(button => button.addEventListener("click",operationClicked));

//add event listener to resultButton
resultButton.addEventListener("click", displayResult);

function operationClicked(e) {

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

    //reset numberJustClicked
    numberJustClicked = false;
}

function numberClicked(e) {

    //TODO: Handle multiple points

    //if text not too long
    if (displayValue.textContent.length < 26) {

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

    //set numberJustClicked
    numberJustClicked = true;
}

function displayResult() {
    const displayOperator = parseFloat(displayValue.textContent);
    const result = operate(tempOperation, tempResult, displayOperator);

    tempOperation = null;
    tempResult = result;

    displayValue.textContent = result;
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