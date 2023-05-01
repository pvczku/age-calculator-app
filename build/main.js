"use strict";
// all the consts declared below
const [dayInput, monthInput, yearInput, dayOutput, monthOutput, yearOutput, button] = [
    document.querySelector("#day"),
    document.querySelector("#month"),
    document.querySelector("#year"),
    document.querySelector("#days"),
    document.querySelector("#months"),
    document.querySelector("#years"),
    document.querySelector("#submit"),
];
let allGood = false;
const monthDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};
button.onclick = () => {
    checkInputs();
    if (allGood) {
        parseInt(yearInput.value) % 4 === 0 ? (monthDays[2] = 29) : (monthDays[2] = 28);
        const outputs = calculateDifference(new Date().getDay(), new Date().getMonth() + 1, new Date().getFullYear());
        dayOutput.innerHTML = outputs[0].toString();
        monthOutput.innerHTML = outputs[1].toString();
        yearOutput.innerHTML = outputs[2].toString();
    }
    else {
        dayOutput.innerHTML = "--";
        monthOutput.innerHTML = "--";
        yearOutput.innerHTML = "--";
    }
};
function checkInputs() {
    const [thisDay, thisMonth, thisYear] = [
        new Date().getDay(),
        new Date().getMonth() + 1,
        new Date().getFullYear(),
    ];
    // check if the inputs are empty
    const correctInputs = checkIfEmpty();
    // check if the year is before this year or this year
    const correctNumbers = checkIfNumbers();
    const correctNumbersInputs = correctNumberInputs(thisDay, thisMonth, thisYear);
    correctInputs && correctNumbers && correctNumbersInputs ? (allGood = true) : (allGood = false);
}
function checkIfEmpty() {
    dayInput.value === ""
        ? (document.querySelector("#dayError").innerHTML = "This field is required")
        : (document.querySelector("#dayError").innerHTML = "");
    monthInput.value === ""
        ? (document.querySelector("#monthError").innerHTML = "This field is required")
        : (document.querySelector("#monthError").innerHTML = "");
    yearInput.value === ""
        ? (document.querySelector("#yearError").innerHTML = "This field is required")
        : (document.querySelector("#yearError").innerHTML = "");
    if (dayInput.value && monthInput.value && yearInput.value) {
        return true;
    }
    return false;
}
function checkIfNumbers() {
    if (dayInput.value !== "" && isNaN(Number(dayInput.value))) {
        document.querySelector("#dayError").innerHTML = "Must be a number";
    }
    if (monthInput.value !== "" && isNaN(Number(monthInput.value))) {
        document.querySelector("#monthError").innerHTML = "Must be a number";
    }
    if (yearInput.value !== "" && isNaN(Number(yearInput.value))) {
        document.querySelector("#yearError").innerHTML = "Must be a number";
    }
    if ((yearInput.value !== "" && isNaN(Number(dayInput.value))) ||
        (monthInput.value !== "" && isNaN(Number(monthInput.value))) ||
        (dayInput.value !== "" && isNaN(Number(yearInput.value)))) {
        return false;
    }
    return true;
}
function correctNumberInputs(thisDay, thisMonth, thisYear) {
    let correctDay = false;
    let correctMonth = false;
    let correctYear = false;
    if (parseInt(dayInput.value) > monthDays[parseInt(monthInput.value)] ||
        parseInt(dayInput.value) < 1 ||
        parseInt(dayInput.value) > 31) {
        document.querySelector("#dayError").innerHTML = "Must be a valid date";
        correctDay = false;
    }
    else
        correctDay = true;
    if (parseInt(monthInput.value) > 12 || parseInt(monthInput.value) < 1) {
        document.querySelector("#monthError").innerHTML = "Must be a valid month";
        correctMonth = false;
    }
    else
        correctMonth = true;
    if (parseInt(yearInput.value) > thisYear) {
        document.querySelector("#yearError").innerHTML = "Must be in the past";
        correctYear = false;
    }
    else
        correctYear = true;
    if (parseInt(yearInput.value) === thisYear) {
        correctYear = true;
        if (parseInt(monthInput.value) === thisMonth) {
            correctMonth = true;
            if (parseInt(dayInput.value) <= thisDay) {
                correctDay = true;
            }
            else {
                document.querySelector("#dayError").innerHTML = "Must be a valid date";
                correctDay = false;
            }
        }
        else if (parseInt(monthInput.value) < thisMonth) {
            correctMonth = true;
        }
        else {
            document.querySelector("#monthError").innerHTML = "Must be a valid month";
            correctMonth = false;
        }
    }
    else if (parseInt(yearInput.value) < thisYear) {
        correctYear = true;
        correctMonth = true;
        correctDay = true;
        if (parseInt(dayInput.value) <= monthDays[parseInt(monthInput.value)]) {
            correctDay = true;
        }
        else {
            document.querySelector("#dayError").innerHTML = "Must be a valid date";
            correctDay = false;
        }
    }
    else {
        correctYear = false;
    }
    if (!correctDay && !correctMonth && !correctYear) {
        document.querySelector("#dayError").innerHTML = "Must be a valid date";
        document.querySelector("#monthError").innerHTML = "Must be a valid month";
        document.querySelector("#yearError").innerHTML = "Must be in the past";
    }
    if (correctDay && correctMonth && correctYear) {
        return true;
    }
    else {
        return false;
    }
}
function calculateDifference(thisDay, thisMonth, thisYear) {
    let days = 0;
    let months = 0;
    let years = 0;
    years = thisYear - parseInt(yearInput.value);
    if (thisMonth < parseInt(monthInput.value)) {
        years--;
        months = 12 - (parseInt(monthInput.value) - thisMonth);
    }
    else {
        months = thisMonth - parseInt(monthInput.value);
    }
    if (thisDay < parseInt(dayInput.value)) {
        months--;
        days = monthDays[thisMonth - 1] - (parseInt(dayInput.value) + thisDay - 1) + 1;
    }
    else {
        days = thisDay - parseInt(dayInput.value);
    }
    return [days, months, years];
}
