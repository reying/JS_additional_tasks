const filterByType = (type, ...values) => values.filter(value => typeof value === type), // фильтрация данных по их типу (принимает тип и переменные)

    // получает и скрывает блоки с ответами
    hideAllResponseBlocks = () => {
        const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получает блоки с ответами и записывает их в массив
        responseBlocksArray.forEach(block => block.style.display = 'none'); // перебирает блоки и скрывает их со страницы
    },

    // выводит блок и добавляет сообщение
    showResponseBlock = (blockSelector, msgText, spanSelector) => { // принимает селетор элемента, содержание сообщения, 
        hideAllResponseBlocks(); // вызывает функцию, которая скрывает блоки с ответами
        document.querySelector(blockSelector).style.display = 'block'; // ищет блок с ответом по полученному селектору и показывает его на странице
        if (spanSelector) { // проверяет передан ли селектор элемента для вывода сообщения
            document.querySelector(spanSelector).textContent = msgText; // ищет элемент по полученному селектору и записывает в него полученное содержимое 
        }
    },

    // выводит сообщение об ошибке
    showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // получает сообщение, вызывает функцию по выводу блока и добавления сообщения и передает в нее селектор блока, сообщение и селектор элемента для вывода сообщения

    //выводит сообщение с результатом
    showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // делает тоже, что и предыдущая функция

    // выводит сообщение об отсутствии результата
    showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // вызывает функцию по выводу блока и добавления сообщения и передает в нее селектор блока

    // родительская функция по фильтрации данных по выбранному типу
    tryFilterByType = (type, values) => { //получает переменные и их тип
        try { // начало конструкции отлавливания ошибок
            const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // выполнение фильтрации данных по их типу (передаются тип и данные), записываются через запятую в массив
            const alertMsg = (valuesArray.length) ? // формирование сообщения, проверка массива на наличие элементов
                `Данные с типом ${type}: ${valuesArray}` : // если массив не пустой, то формирует сообщение с указанием типа и массивом данных
                `Отсутствуют данные типа ${type}`; // если массив пуст, то формирует сообщение об утсутствии данных с указаннцм типом
            showResults(alertMsg); //вызов функции вывода сообщения с результатом и передача сформированного сообщения
        } catch (e) { // конец конструкции отлавливания ошибок, начало конструкции, которая выполниться в случае ошибк в предыдущей конструкции, передача ошибки
            showError(`Ошибка: ${e}`); // вызов функции по выводу сообщения об ошибке, передача ошибки в функцию
        } // конец конструкции, которая выполниться в случае ошибк в предыдущей конструкции
    };

const filterButton = document.querySelector('#filter-btn'); // получение кнопки "фильтравать" по селектору (id)

filterButton.addEventListener('click', e => { // навешивание обработчика события клика по кнопке "фильтравать", передача собитыия в callback ф-ю
    const typeInput = document.querySelector('#type'); // получение элемента select по селектору (id)
    const dataInput = document.querySelector('#data'); // получение элемента input по селектору (id)

    if (dataInput.value === '') { // проверка элемента input на наличие данных
        dataInput.setCustomValidity('Поле не должно быть пустым!'); // если данных нет выводить сообщение об ошибке с переданным в него сообщением
        showNoResults(); // вызов функции для вывода сообщения об отсутствии результата
    } else { // если данные имеются, то выполняются следующие инструкции:
        dataInput.setCustomValidity(''); // очищает состояние ошибки, на случай, если было раннее вызвано
        e.preventDefault(); // отменяет стандарное поведение переданного события (клик по кнопке)
        tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызываюет родительскую функцию по фильтрации данных по выбранному типу, передает значания элементов select и input, предварительно удалив все пробелы в начале и конце значений
    }
});