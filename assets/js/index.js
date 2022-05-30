const mathExpressionDisplay = document.querySelector(".math-expression");
const historyDisplay = document.querySelector(".history");
const DISPLAY_FONT = $(mathExpressionDisplay).css("font-size"); //unit px
let operand;

let global = {
    result: false,
    updateHistory: false,
    digitArray: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    operators: ['/', '*', '-', '+', '%'],
    keyValue: ""
}

const buttons = document.querySelector('.single-button-container');
// console.log(mathExpressionDisplay.scrollHeight, mathExpressionDisplay.clientHeight, mathExpressionDisplay.style.fontSize);

// function removeDisplayOverflow() {

// }
// if (mathExpressionDisplay.scrollHeight > mathExpressionDisplay.clientHeight) {
//     mathExpressionDisplay.style.fontSize -= "4px";
//     console.log(mathExpressionDisplay.scrollHeight, mathExpressionDisplay.clientHeight, mathExpressionDisplay.style.overflow);

// }
// const size = $('.math-expression').css('font-size');
// console.log(size);
(function() {
    removeOverflow(mathExpressionDisplay)
    console.log("hey")
})();


function removeOverflow(targetElem) {
    // get size without px attached
    let size = parseInt($(targetElem).css("font-size"));
    size = size - 2;
    $(targetElem).css("font-size", `${size}px`)
    if (targetElem.scrollHeight > targetElem.clientHeight) {
        removeOverflow(targetElem);
    }

}
// buttons.addEventListener("click", function(e) {
//     console.log(e.target);
// })

document.addEventListener("click", function(e) {
    if (global.updateHistory == true) {
        // set history display to the previous evaluated expression
        historyDisplay.textContent += " " + mathExpressionDisplay.textContent
        global.updateHistory = false;
    }
    let targetElem = e.target;
    $(mathExpressionDisplay).css("font-size", DISPLAY_FONT);
    if (targetElem.classList.contains('fa-solid')) {
        targetElem = targetElem.parentNode;
    }
    console.log(targetElem);
    if (targetElem.classList.contains('number-btn')) {
        let data = targetElem.textContent;
        // check is it first number to entered without any operators 
        if (isFirstNumberToBeEntered() || global.result == true) {
            mathExpressionDisplay.textContent = "";
            global.result = false;

        }
        // operand+=data;

        addToDisplay(data);
    }
    if (targetElem.classList.contains('operation-button')) {
        global.result = false;
        let operation = targetElem.getAttribute('data-value');
        addToDisplay(` ${operation} `);
    }
    if (targetElem.classList.contains('dot')) {


        addToDisplay('.');
    }
    if (targetElem.getAttribute('data-value') == 'clear') {
        clearDisplay();

    }
    if (targetElem.getAttribute('data-value') == 'del') {
        deleteLast();

    }
    if (targetElem.getAttribute('data-value') == 'sign') {
        appendSign();

    }
    if (targetElem.getAttribute('data-value') == 'equal-to') {
        evaluateExpression();

    }

})

function checkOverflow(targetElem) {
    if (targetElem.scrollHeight > targetElem.clientHeight) {
        return true;
    }
    return false;

}

function addToDisplay(data) {
    if (checkOverflow(mathExpressionDisplay)) {
        removeOverflow(mathExpressionDisplay);
    }

    let content = document.createTextNode(data);
    mathExpressionDisplay.appendChild(content);

}

function setHistory() {

}

function getDisplayExpression() {
    return mathExpressionDisplay.textContent;

}

function isFirstNumberToBeEntered() {
    let content = getDisplayExpression().trim();

    if (content.length == 1 && content === '0') {
        return true;
    }
    return false;

}

function evaluateExpression() {
    let expression = getDisplayExpression();
    let ans = eval(expression);
    setResultToDisplay(ans)
    global.result = true;
    global.updateHistory = true;



}

function setResultToDisplay(ans) {
    let fontSize = parseInt(DISPLAY_FONT) + 9;
    // displaying result in bigger font size
    $(mathExpressionDisplay).css("font-size", `${fontSize}px`);
    let expression = getDisplayExpression();
    mathExpressionDisplay.textContent = ans;
    historyDisplay.textContent = `${expression} = `





}

function clearDisplay() {
    // clear display 
    mathExpressionDisplay.innerHTML = '0';
    // set font size to normal size
    $(mathExpressionDisplay).css("font-size", DISPLAY_FONT);
    global.result = false;
}

function deleteLast() {
    global.result = false;
    let content = getDisplayExpression().trim();

    if (content.length == 1 && content == '0') {
        return;
    }
    mathExpressionDisplay.textContent = content.slice(0, -1)
    appendZeroToEmptyDisplay();

}

function appendZeroToEmptyDisplay() {
    let content = getDisplayExpression();

    if (content.length == 0) {
        mathExpressionDisplay.textContent = '0'

    }




}

function appendOperator(expression) {

}

function appendSign() {
    let content = getDisplayExpression().trim();
    if (content.length == 1 && content == '0') {
        mathExpressionDisplay.textContent = `-`;
    } else if (content.length == 1 && content == '-') {
        mathExpressionDisplay.textContent = `0`;

    } else if (isNaN(content)) {
        return;
    } else if (content < 0) {
        mathExpressionDisplay.textContent = `${Math.abs(content)}`;

    } else {
        mathExpressionDisplay.textContent = `-${content}`;

    }


}


document.addEventListener('keydown', function(e) {
        global.keyValue = e.key;

        if (global.updateHistory == true) {
            // set history display to the previous evaluated expression
            historyDisplay.textContent += " " + mathExpressionDisplay.textContent
            global.updateHistory = false;
        }
        $(mathExpressionDisplay).css("font-size", DISPLAY_FONT);

        if (global.digitArray.includes(global.keyValue)) {
            if (isFirstNumberToBeEntered() || global.result == true) {
                mathExpressionDisplay.textContent = "";
                global.result = false;

            }
            // operand+=data;

            addToDisplay(global.keyValue);

        }
        if (global.operators.includes(global.keyValue)) {
            global.result = false;

            addToDisplay(` ${global.keyValue} `);
        }


        if (global.keyValue == 'Backspace') {
            deleteLast();

        }
        // if (targetElem.getAttribute('data-value') == 'sign') {
        //     appendSign();

        // }
        if (global.keyValue == '=' || global.keyValue == 'Enter') {
            evaluateExpression();

        }

    })
    // appendCommaToThousandth(data) {
    //     let data = parseInt(data);
    //     return (data).toLocaleString('en-US', { maximumFractionDigits: 10 });

// }