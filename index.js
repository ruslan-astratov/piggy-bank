import moment from 'moment';
// moment().format();
// console.log(moment().format())

// Наш массив для сохранённых целей.  Сюда будут попадать все наши сохранённые цели    (При клике на кнопку "Сохранить" в форме)
const arrForOurSaveTargets = []




let goalName = document.querySelector('#goal-name');
let sumRequired = document.querySelector('#sum-required');
let period = document.querySelector('#period');
let initialSum = document.querySelector('#initial-sum');
let percent = document.querySelector('#percent');
let monthlyPayment = document.querySelector('#monthly-payment');
let formSaveBtn = document.querySelector('#form-save-btn');
let formCancelBtn = document.querySelector('#form-cancel-btn');

// Сама форма form 
let form = document.querySelector('#goal-form');


// Список целей.  В правой части экрана 
let targetsList = document.querySelector('#saved-goals');







// Написать функцию  которая возвращает количество месяцев от текущего месяца  до   месяца, который ввёл пользователь
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











// Функция, которая СОХРАНЯЕТ цель.   Сохраняет в виде объекта и пушит в массив arrForOurSaveTargets
function saveOurTargetInTargetsArray() {

  // В случае, если все наши поля были заполнены...
  if( goalName.value.trim() !== "" && sumRequired.value.trim() !== "" && period.value.trim() !== "" && period.value.length >= 6 && initialSum.value.trim() !== ""&& 
  percent.value.trim() !== "" && monthlyPayment.value.trim()  !== "") {

  
    //...мы можем сформировать объект 
    let targetObj = {

      id: Date.now(),

      goalName: goalName.value,

      sumRequired: sumRequired.value,

      period: period.value,

      initialSum: initialSum.value,

      percent: percent.value,

      monthlyPayment: monthlyPayment.value,

    }

    // .. и теперь, когда мы сформировали объект с данными по нашей цели,  мы можем запушить этот объект в массив (где будут храниться ВСЕ наши цели)
    arrForOurSaveTargets.push(targetObj)



    // А вот здесь будет срабатывать функция, которая удаляет из массива-целей   ДУБЛИКАТЫ
    let newTargetsArrayWithoutDublicates = removeDuplicates(arrForOurSaveTargets)

    console.log("Массив без дубликатов newTargetsArrayWithoutDublicates", newTargetsArrayWithoutDublicates)

    // Форма очищается от прежних введённых в неё значений 
    form.reset()


    // А здесь отработает функция, которая смотрит на массив-целей, перебирает его и для каждой цели рисует карточку  (в правой части экрана)
    renderTargetInRightList(newTargetsArrayWithoutDublicates)

  }


}


// Функция, которая удаляет из массива-целей дубликаты.  Что имеется в виду под дубликатами: допустим, пользователь, когда заполнил форму, нажал на кнопку "Сохранить" два или три раза подряд.

// И, чтобы в массиве одинаковые объекты не дублировались, мы удаляем эти дубликаты ,   ПРЕЖДЕ ЧЕМ сработает функция,   которая рисует разметку - перебирая массив целей


function removeDuplicates(arr) {

  const result = [];
  const duplicatesIndices = [];

  // Перебираем каждый элемент в исходном массиве
  arr.forEach((current, index) => {
  
      if (duplicatesIndices.includes(index)) return;
  
      result.push(current);
  
      // Сравниваем каждый элемент в массиве после текущего
      for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
      
          const comparison = arr[comparisonIndex];
          const currentKeys = Object.keys(current);
          const comparisonKeys = Object.keys(comparison);
          
          // Проверяем длину массивов
          if (currentKeys.length !== comparisonKeys.length) continue;
          
          // Проверяем значение ключей
          const currentKeysString = currentKeys.sort().join("").toLowerCase();
          const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase();
          if (currentKeysString !== comparisonKeysString) continue;
          
          // Проверяем индексы ключей
          let valuesEqual = true;
          for (let i = 0; i < currentKeys.length; i++) {
              const key = currentKeys[i];
              if ( current[key] !== comparison[key] ) {
                  valuesEqual = false;
                  break;
              }
          }
          if (valuesEqual) duplicatesIndices.push(comparisonIndex);
          
      } // Конец цикла
  });  

  console.log("Нам массив целей БЕЗ дубликатов", result)

  return result;
}



// Функция, которая берёт очищенный от дубликатов массив-целей ,   перебирает его и для каждого объекта,  то есть для каждой цели - рисует  карточку в списке, 
// который находится в правой части экрана
function renderTargetInRightList(newTargetsArrayWithoutDublicates) {

  targetsList.innerHTML = ""
  

  newTargetsArrayWithoutDublicates.forEach( target => {

    let targetHTML = `
                    <div class="target-card" data-id=${target.id}>

                      <p class="target-card-title">${target.goalName}</p>

                      <div class="target-card-hidden-block">

                        <p>Необходимая сумма: ${target.sumRequired}</p>

                        <p>Хочу реализовать к: ${target.period}</p>

                        <p>Банковский процент: ${target.percent}</p>

                        <p>Необходимо вносить в месяц: ${target.monthlyPayment}</p>

                        <div class="target-card-row-for-buttons">
                          <button type="button">Изменить</button>
                          <button type="button">Удалить</button>
                        </div>
                        
                      </div>
                      <!-- // Скрытый блок, который появляется-выезжает   при наведении на  карточку -->


                    </div>
                    `

    // Теперь эту разметку карточки нужно физически вставить на страницу -->  в список наших целей
    targetsList.insertAdjacentHTML("beforeend", targetHTML)



  } )

}






// Функция, которая при нажатии на кнопку ОТМЕНА  очищает форму
function resetForm() {
  form.reset()
}







// Навешиваю обработчики
goalName.addEventListener("input", isEmptyInputs)

sumRequired.addEventListener("input", isEmptyInputs)

period.addEventListener("input", isEmptyInputs)

initialSum.addEventListener("input", isEmptyInputs)

percent.addEventListener("input", isEmptyInputs)

formSaveBtn.addEventListener("click", saveOurTargetInTargetsArray)

formCancelBtn.addEventListener("click", resetForm)





