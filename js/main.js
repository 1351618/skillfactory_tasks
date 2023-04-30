
// смена цвета кнопки для первого задания
const task1Button = document.getElementById('index-main__task-1_button');
const task2Button = document.getElementById('index-main__task-2_button');

function changeButtonColor(button) {
    if (button.classList.contains('red')) {
        button.classList.remove('red');
        button.classList.add('blue');
    } else {
        button.classList.remove('blue');
        button.classList.add('red');
    }
}

task1Button.addEventListener('click', function () {
    changeButtonColor(task1Button);
});

task2Button.addEventListener('click', function () {
    changeButtonColor(task2Button);
});





// Задание 1
// Вам дана заготовка и результат, который вы должны получить. 
// Ваша задача — написать код, который будет преобразовывать XML в 
// JS-объект и выводить его в консоль.
const task_1_button = document.getElementById('index-main__task-1_button');
task_1_button.addEventListener('click', function () {
    const task_xml_one = new XMLHttpRequest();
    task_xml_one.open('GET', '../xml/my_xml.xml');
    task_xml_one.onreadystatechange = function () {
        if (task_xml_one.readyState === 4 && task_xml_one.status === 200) {
            const xmlDoc = task_xml_one.responseXML;
            const students = xmlDoc.querySelectorAll('student');
            if (students.length > 0) {
                const list = [];
                students.forEach((student) => {   // Проходим по всем элементам student                    
                    const lang = student.querySelector('name').getAttribute('lang');    // Получаем значение name lang                    
                    const firstName = student.querySelector('first').textContent;    // значение first и second
                    const lastName = student.querySelector('second').textContent;
                    const age = parseInt(student.querySelector('age').textContent);     // значение age
                    const prof = student.querySelector('prof').textContent;     // значение prof                    
                    const studentObj = { name: `${firstName} ${lastName}`, age, prof, lang };       // содерж информ о студенте                    
                    list.push(studentObj);      // Добавляем объект studentObj в массив list
                });
                const result = document.getElementById('index-main__task-1_result');    // Выводим объект list
                result.textContent = JSON.stringify({ list });
            } else {
                console.log('Элемент не найден');
            }
        }
    };
    task_xml_one.send();
});




// Задание 2
// Вам дана заготовка и результат, который вы должны получить. Ваша задача
// — написать код, который будет преобразовывать JSON в JS-объект и выводить
// его в консоль.
const task_2_button = document.getElementById('index-main__task-2_button');
task_2_button.addEventListener('click', function () {
    const task2Result = document.querySelector('#index-main__task-2_result');
    fetch('../json/my_json.json')
        .then(response => response.json())
        .then(data => {
            const jsonStr = JSON.stringify(data);
            task2Result.innerHTML = jsonStr;
        });
});



// Задание 3
// Напишите код приложения, интерфейс которого представляет собой input и кнопку.
//  В input можно ввести любое число. При клике на кнопку происходит следующее:
// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

const task_3_button = document.getElementById("index-main__task-3_button");
const task_3_result = document.getElementById("index-main__task-3_result");

task_3_button.addEventListener("click", function () {
    const task_3_input = document.getElementById("index-main__task-3_input").value;
    let result;

    if (task_3_input >= 1 && task_3_input <= 10) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://picsum.photos/v2/list?limit=10");
        xhr.send();

        xhr.addEventListener("load", function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const image = data[task_3_input - 1].download_url;  // выбираем изображение и -1 тк начинаются с 0 
                task_3_result.innerHTML = `<img src="${image}" alt="image">`;
            } else {
                result = 'Ошибка запроса: ' + xhr.status;
                task_3_result.innerHTML = result;
                console.log(result);
            }
        });
    } else {
        result = "число вне диапазона от 1 до 10";
        task_3_result.innerHTML = result;
        console.log(result);
    }
});



// Задание 4
// Напишите код приложения, интерфейс которого представляет
// собой 2 input и кнопку submit. В input можно ввести любое число.
// При клике на кнопку происходит следующее:
// Если оба числа не попадают в диапазон от 100 до 300 или введено
// не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c
// помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида
// https://picsum.photos/150/200.
// После получения данных вывести ниже картинку на экран.
