import moment from 'moment';
moment().format();
console.log(moment().format())

let goalName = document.querySelector('#goal-name');
let sumRequired = document.querySelector('#sum-required');
let period = document.querySelector('#period');
let initialSum = document.querySelector('#initial-sum');
let percent = document.querySelector('#percent');
let monthlyPayment = document.querySelector('#monthly-payment');
let formSaveBtn = document.querySelector('#form-save-btn');
let formCancelBtn = document.querySelector('#form-cancel-btn');

// Написать функцию  которая возвращает количество месяцев от сегодняшнего дня до введенной даты. 
// Ограничить ввод даты из прошлого

function calcMonths () {

    let start =  moment().format('YYYY-MM')
    let end = period.innerHTML;
    let a = moment(start, "YYYY-MM");
    let b = moment(end, "YYYY-MM");
    let  months = b.diff(a, 'month') ;
    if (months > 0) {
        console.log(months) 
    return months;
    } else {
        alert('Введите корректную дату')
    }  
}
