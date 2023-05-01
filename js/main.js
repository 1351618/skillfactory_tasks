
// смена цвета кнопки для первого задания
const task1Button = document.getElementById('index-main__task-1_button');
const task2Button = document.getElementById('index-main__task-2_button');
const task3Button = document.getElementById('index-main__task-3_button');
const task4Button = document.getElementById('index-main__task-4_button');
const task5Button = document.getElementById('index-main__task-5_button');

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
task3Button.addEventListener('click', function () {
    changeButtonColor(task3Button);
});
task4Button.addEventListener('click', function () {
    changeButtonColor(task4Button);
});
task5Button.addEventListener('click', function () {
    changeButtonColor(task5Button);
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
let input_2 = document.getElementById("index-main__task-4_input-2")
let input_1 = document.getElementById("index-main__task-4_input-1")
let button_task_4 = document.getElementById("index-main__task-4_button")
let result_4 = document.getElementById("index-main__task-4_result")

button_task_4.addEventListener("click", function () {
    if (input_1.value >= 100 && input_1.value <= 300
        && input_2.value >= 100 && input_2.value <= 300) {
        fetch(`https://picsum.photos/${input_1.value}/${input_2.value}`)
            .then(response => {
                result_4.innerHTML = `<img src="https://picsum.photos/${input_1.value}/${input_2.value}" alt="photos">`
            })
    } else {
        result_4.innerHTML = "одно из чисел вне диапазона от 100 до 300"
    }
})


// Задание 5.
// Написать код приложения, интерфейс которого состоит из двух input и кнопки.
// В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является
// числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является
// числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить
// ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос
// по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это 
// число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет
// вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны
// показываться картинки из последнего успешно выполненного
// запроса (использовать localStorage).

let task_5_input_1 = document.getElementById("index-main__task-5_input-1")
let task_5_input_2 = document.getElementById("index-main__task-5_input-2")
let task_5_button = document.getElementById("index-main__task-5_button")
let task_5_result = document.getElementById("index-main__task-5_result")


task_5_button.addEventListener("click", function () {
    function condition_check(check) {
        if (check.value >= 1 && check.value <= 10) {
            return true;
        } else {
            return false;
        }
    }
    let check_pages = condition_check(task_5_input_1)
    let check_limit = condition_check(task_5_input_2)

    if (check_pages === true && check_limit === true) {
        fetch(`https://picsum.photos/v2/list?page=${task_5_input_1.value}&limit=${task_5_input_2.value}`)
            .then(response => response.json())
            .then(data => {
                const randomImage = data[Math.floor(Math.random() * data.length)];
                task_5_result.innerHTML =
                    `<img src="${randomImage.download_url}" alt="Random image" max-width="300px">
                  <p>Author: ${randomImage.author}</p>
                  <p>Image ID: ${randomImage.id}</p>
                  <p>Image size: ${randomImage.width}x${randomImage.height}</p>`
                localStorage.setItem("lastRandomImage", JSON.stringify(randomImage));
            })
    } else if (check_pages === false && check_limit === true) {
        task_5_result.innerHTML = "Номер страницы вне диапазона от 1 до 10"
    } else if (check_pages === true && check_limit === false) {
        task_5_result.innerHTML = "Лимит вне диапазона от 1 до 10"
    } else {
        task_5_result.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10"
    }
})

window.onload = function () {
    let savedRandomImage = JSON.parse(localStorage.getItem("lastRandomImage"));
    if (savedRandomImage) {
        task_5_result.innerHTML =
            `<img src="${savedRandomImage.download_url}" alt="Random image" max-width="300px">
        <p>Author: ${savedRandomImage.author}</p>
        <p>Image ID: ${savedRandomImage.id}</p>
        <p>Image size: ${savedRandomImage.width}x${savedRandomImage.height}</p>`;
    }
}