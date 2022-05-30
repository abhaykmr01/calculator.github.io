const mathExpressionDisplay = document.querySelector(".math-expression");
const DISPLAY_FONT = $(mathExpressionDisplay).css("font-size");


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
    let targetElem = e.target;
    if (targetElem.classList.contains('fa-solid')) {
        targetElem = targetElem.parentNode;
    }
    console.log(targetElem);
    if (targetElem.classList.contains('number-btn')) {
        let data = targetElem.textContent;
        addToDisplay(data);
    }
    if (targetElem.getAttribute('data-value') == 'clear') {
        clearDisplay();

    }
    if (targetElem.getAttribute('data-value') == 'del') {
        deleteLast();

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

function evaluateExpression(data) {
    return eval(data);


}

function clearDisplay() {
    // clear display 
    mathExpressionDisplay.innerHTML = '';
    // set font size to normal size
    $(mathExpressionDisplay).css("font-size", DISPLAY_FONT);
}

function deleteLast() {
    let content = getDisplayExpression();
    console.log(content);
    console.log(content.length);
    if (content.length == 0 || content == 0) {
        return;
    }
    mathExpressionDisplay.textContent = content.slice(0, -1)

}