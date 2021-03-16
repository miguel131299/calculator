//select elements
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const displayValue = document.getElementById("display-value");
const acButton = document.getElementById("AC-button");
const delButton = document.getElementById("delete-button");
const ansButton = document.getElementById("answer=button");
const resultButton = document.getElementById("result-button");

//add event listener to numbers
numberButtons.forEach(button => button.addEventListener("click", appendToDisplayOperation));

//add event listeners to operations
operationButtons.forEach(button => button.addEventListener("click",))

function operationClicked(e) {
    
}

function appendToDisplayOperation(e) {

    //TODO: Handle multiple points

    //if text not too long
    if (displayValue.textContent.length < 26) {

        if (displayValue.textContent === "0") {
            displayValue.textContent = this.textContent;
        } else {
            displayValue.textContent += this.textContent;
        }
    
    } else {
        //TODO: print error message
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
        case "sum":
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