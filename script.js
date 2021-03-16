//select elements
const numberButtons = document.querySelectorAll(".number-button");
const operationButtons = document.querySelectorAll(".operation-button");
const displayOperation = document.getElementById("display-operation");
const displayResult = document.getElementById("display-result");
const acButton = document.getElementById("AC-button");
const delButton = document.getElementById("delete-button");
const ansButton = document.getElementById("answer=button");
const resultButton = document.getElementById("result-button");

//add event listener to numbers
numberButtons.forEach(button => button.addEventListener("click", appendToDisplayOperation));


function appendToDisplayOperation(e) {
    if (displayOperation.textContent.length < 26) {

        if (displayOperation.textContent === "0") {
            displayOperation.textContent = this.textContent;
        } else {
            displayOperation.textContent += this.textContent;
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