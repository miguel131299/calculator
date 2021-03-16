const add = (a, b) => a + b;

const substract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

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
    
        default:
            break;
    }
}