import moment from 'moment';
// moment().format();
// console.log(moment().format())

let goalName = document.querySelector('#goal-name');
let sumRequired = document.querySelector('#sum-required');
let period = document.querySelector('#period');
let initialSum = document.querySelector('#initial-sum');
let percent = document.querySelector('#percent');
let monthlyPayment = document.querySelector('#monthly-payment');
let formSaveBtn = document.querySelector('#form-save-btn');
let formCancelBtn = document.querySelector('#form-cancel-btn');


// Написать функцию  которая возвращает количество месяцев от текущего дня до введенного месяца. 
// Ограничить ввод даты из прошлого
function calcMonths() {

    let start =  moment().format('YYYY-MM')
    let end = period.value;
    let a = moment(start, "YYYY-MM");
    let b = moment(end, "YYYY-MM");
    let  months = b.diff(a, 'month');

    if (months > 0) {
        console.log(months) 
        return months;
    } else {
        alert('Введите корректную дату')
    }  
}




// Функция, которая проверяет - заполнены ли все 5 инпутов. Функция срабатывает при изменении в каждом из пяти инпутов
function isEmptyInputs() {

  if( goalName.value.trim() !== "" && sumRequired.value.trim() !== "" && period.value.trim() !== "" && period.value.length >= 6 && initialSum.value.trim() !== ""&& 
      percent.value.trim() !== "") {

    console.log("Все поля заполнены" )


    // calcMonths()

    // Теперь здесь запускаем функцию , которая РАССЧИТЫВАЕТ размер ежемесячного пополнения   и  ВЫВОДИТ его , как результат,   в инпут   monthlyPayment
    calculatedSumOfPaymant()
  }

  // В противном случае, если хотя бы один из инпутов НЕ пустой, то ничего не срабатывает
  else {

    console.log("Одно из полей пустое")

  }

}






// Функция, которая берёт значения 4 инпутов (требуемая сумма, период, начальная сумма, процент)   и на их основе рассчитывает размер ежемесячного платежа и выводит его в инпут monthlyPayment
function calculatedSumOfPaymant() {


  let someMonth = calcMonths()


  // Итоговый доход (берём его из инпута sumRequired "Требуемая сумма"  ). Допустим 80 000 р
  let sumRequire = sumRequired.value

  // Начальный депозит. Берём из инпута.  Например, у нас в самом начале было 5000р, и мы их положили в банк, как вклад 
  let initialSumm = initialSum.value

  // Процентная ставка. Допустим  6%
  let percen = percent.value

  // Срок/период.  Берём его из условной переменной  someMonth
  // someMonth


  // Получаем коэффициент 
  let koeff = ( 1 + ( percen / 100 / 12 ) )**someMonth

  console.log("Коэффициент koeff", koeff)


  // Получаем начальный депозит (по формуле).   Например, получим 77 641, 446237102.   И от этого значения отнимем те средства, которые мы уже положили на вклад (5000 руб.)
  let initiaDeposite = ( sumRequire / koeff ) - initialSumm

  console.log("Начальный депозит, по формуле", initiaDeposite)


  // Получаем ежемесячный платёж.   

  // например, при требуемой сумме 80 000 р,  и начальном депозите в 5 000 р.   РАЗМЕР ЕЖЕМЕСЯЧНОГО ПОПОЛНЕНИЯ      В ТЕЧЕНИЕ 6 МЕСЯЦЕВ     СОСТАВИТ  12.106907706183 Р

  let monthlyPaymen = initiaDeposite / someMonth
  
  console.log("Размер ежемесячного платежа", monthlyPaymen)

  // Вставили в инпут результат рассчётов
  monthlyPayment.value = monthlyPaymen

}










// Навешиваю обработчики
goalName.addEventListener("input", isEmptyInputs)

sumRequired.addEventListener("input", isEmptyInputs)

period.addEventListener("input", isEmptyInputs)

initialSum.addEventListener("input", isEmptyInputs)

percent.addEventListener("input", isEmptyInputs)



