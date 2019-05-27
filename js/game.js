let color = ['red','red','green','green','orange','orange','deeppink','deeppink','blue','blue','silver','silver','lime','lime','yellow','yellow'];
let opened = [];//массив открытых полей
let selected = [0, 0]; // массив пар последовательно выбранных полей
let first = true; //первый клик
let block = false;
let finished = 0;// флаг окончания игры. Увеличивается на 1 каждый раз когда совпадают цвета
let time_spent = '';//таймер в строковом формате
let t = 0;//общее время от старта в миллисекундах
let x,//перемешанный массив цветов
    timerId,// числовой идентификатор таймера
    sec,//секунды
    min,//минуты
    ms;//миллисекунды

function init() {
  clearTimeout(timerId);
  opened = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selected = [0, 0];
  finished = 0;
  t = 0;
  first = true;
  x = shuffle(color);
  for (let i = 0; i < 19; i++) {
    $('#'+i).css('background', 'white');
  }
}

function timer() {
  t++; //Увеличивается на 1 раз в миллисекунду
  ms = t%1000;
  sec = Math.floor(t/1000);
  min = Math.floor(t/60000);
 
  if (sec >= 60) sec = 0;
  if (min >= 60) min = 0;
  if (ms >= 1000) ms = 0;
  
  time_spent = min+':'+sec+'.'+ms;
        
  $('#timer').html(time_spent);
  timerId = setTimeout(timer, 1);
}

function shuffle(arr){
  let j, temp;
  
  arr.forEach((item, i, arr) => {
    j = Math.floor(Math.random()*(i + 1));//генерируем целое число j от 0 до 15
    temp = arr[j]; // меняем местами 
    arr[j] = item; // элемент массива с индексом j 
    arr[i] = temp; // и текущий элемент массива 
  });
    
  return arr; // на выходе перемешанный массив
}

function secondClic() {
  if ((selected[0] == selected[1]) && (!opened[selected[0]])) {//если кликнули по тому же полю
      $('#'+selected[1]).css('background', 'white');// то возвращаем ему белый цвет 
  } else {
    if (color[selected[0]] != color[selected[1]]) {//если выбранные квадраты не совпадают по цвету то возвращаем им белый цвет 
      if (opened[selected[0]] == 0) $('#'+selected[0]).css('background', 'white');
      if (opened[selected[1]] == 0) $('#'+selected[1]).css('background', 'white');
    }
    if (color[selected[0]] == color[selected[1]]) {//если выбранные квадраты совпали по цвету
      if (opened[selected[0]] == 0&&opened[selected[1]] == 0) {
          finished++; 
      }
      opened[selected[0]] = 1;
      opened[selected[1]] = 1;
    }
    
  }
  block = false;//разблокируем
  if (finished >= 8) {
    alert('Вы выиграли \n Затраченное время: '+time_spent+'!');
    init();
  }
}

$('body').on('click', '.box .square', function(e) {
  e.preventDefault();
  if (t==0 || block) return; //если не запущен таймер или не отработал второй клик
  let id = $(this).attr('id');//получаем id поля по которому кликнули
  console.log(id);
  $('#'+id).css('background', x[id]); //меняем цвет этого поля
  if (first){//если первый клик из пары
    selected[0] = id;
    first = false;
  } else {//если второй клик из пары
    selected[1] = id;
    first = true;
    block = true;//блокируем от третьего клика пока не отработает второй
    setTimeout(secondClic, 600);
  }
  
  console.log(selected);
  
});

$('body').on('click', '.btn', function(e) {
  e.preventDefault();
  init();
  timer();
});

console.log(x);