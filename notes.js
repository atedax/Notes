'use strict';

const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const tools = document.querySelector('.tools');
const savedNotes = document.querySelector('.saved-notes');
const blockConfirmBtns = document.querySelector('.block-confirm-buttons');
const mask = document.querySelector('.mask');
const confirm = document.querySelector('.confirm');
const clearAllBtn = document.getElementById('clear-all-btn');
const noteTitle = document.getElementById('note-title');
const noteText = document.getElementById('note-text');
const currentNote = document.querySelector('.current-note');


let dbOfSavedNote = []; // тут будет храниться массив объектов.
let idCurrentSavedNote; // тут будет храниться id заметки, готовое к уадлению.
let index = 0; // при создании новой заметки - индекс будет увеличиваться. index - это data-value li элемента.
let dataValue; // тут будет храниться значение элемента li.
let previousDv; // старое значение dataValue. Нужна для нахождения элемента по dV.


function getRandomId() {
    return new Date().getTime();
} // Генерирует кол-во милисекунд. В моём случае используется для id заметки.

function toolsFunctional(txtElement, event) {
    if (event.target.id === 'bold-block') {
        txtElement.classList.toggle('bold');
    } else if (event.target.id === 'italic-block') {
        txtElement.classList.toggle('italic');
    } else if (event.target.id === 'underline-text') {
        txtElement.classList.toggle('underline');
    } else if (event.target.id === 'overline-text') {
        txtElement.classList.toggle('overline');
    } else {
        txtElement.classList.toggle('line-through');
    }
} // Отвечает за функционал инструментов. (Жирный текст, курсив и т.д.)

function togglesDisplayStatus(status) {
    mask.style.display = status;
    confirm.style.display = status;
} // только для элементов с классом 'mask' и 'confirm'

function textConfirmation(text) {
    document.querySelector('.text-in-confirm-body').textContent = text;
} // текст в модальном окне удаления.

function addNoteInDb(id, b, p) {
    dbOfSavedNote.push({
        id: 'note-' + id,
        title: b.textContent,
        text: p.textContent,
    });

    // массиву dbOfSavedNote добавляем объект с:
        // id: хранится id эллемента.
        // title: хранится заголовок заметки.
        // text: хранится текст заметки.
} // Добавляем заметку в database (dbOfSavedNote).

function createNewNote() {
    if ( !savedNotes.firstChild ) { // Если в savedNotes нет дочернего эллемента -->
        const createUl = document.createElement('ul'); // Создаём элемент 'ul'.

        savedNotes.appendChild(createUl); // добавляем элементу savedNotes дочерний элемент.
    }

    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const b = document.createElement('b');
    const p = document.createElement('p');
    const divFooter = document.createElement('div');
    const time = document.createElement('time');
    const divDelete = document.createElement('div');
    const imgDelete = document.createElement('img');

    let id = getRandomId(); // id заметки.

    divFooter.classList.add('note-footer');

    divDelete.classList.add('note-delete');

    time.classList.add('time');

    imgDelete.classList.add('trash-can');
    imgDelete.src = './icon/trash-can.png';
    imgDelete.alt = 'Удалить';

    b.textContent = 'Без названия';
    b.classList.add('text-in-saved-notes');

    p.textContent = 'Пустой';
    p.classList.add('text-in-saved-notes');

    time.textContent = '20 минут(ы) назад'; // (для себя) сделать время (сколько прошло с момента создания заметки).

    li.appendChild(b);
    li.appendChild(p);
    li.appendChild(divFooter);
    li.id = 'note-' + id;
    li.classList.add('notes');
    li.dataset.value = `${index}`; // присваиваем в атрибут data-value значение index.

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(li);

    addNoteInDb(id, b, p);
}

function removeNoteFromDb(blockConfirmBtnsId) {
    if (blockConfirmBtnsId === 'from-trash-can') {
        dbOfSavedNote.splice(dataValue, 1); // из массива dataBase удаляем элемент под индексом dataValue.
    }

    if (blockConfirmBtnsId === 'from-clear-all-btn') {
        dbOfSavedNote = []; // очищаем массив dataBase.
    }
}

function reWriteDataValue() {
    for (let i = dataValue; i < document.getElementsByTagName('li').length; i++) {
        document.getElementsByTagName('li')[i].dataset.value = i;
    }
}

function switchingClassesForCreateNewNote(className) {
    const lists = document.querySelectorAll('li');

    if (previousDv !== undefined && lists[previousDv] !== undefined) {
        lists[previousDv].classList.remove(className);
    }

    lists[index].classList.add(className);


    previousDv = index;

    dataValue = index;

    index++;
}  // !!!!!!!!!

function switchingClasses(className) {
    const lists = document.querySelectorAll('li');

    if (previousDv !== undefined && lists[previousDv] !== undefined) {
        lists[previousDv].classList.remove(className);
    }

    lists[dataValue].classList.add(className);

    previousDv = dataValue;
} // !!!!!!!!

function fillingOfFieldsCurrentNote() {
    if (dbOfSavedNote[dataValue].title === 'Без названия') {
        noteTitle.value = '';
    } else {
        noteTitle.value = dbOfSavedNote[dataValue].title;
    }

    if (dbOfSavedNote[dataValue].text === 'Пустой') {
        noteText.value = '';
    } else {
        noteText.value = dbOfSavedNote[dataValue].text;
    }
}

function valueOfSavedNote(tag, value) {
    document.querySelectorAll('li')[dataValue].querySelector(tag).textContent = value; // тегу 'b' или 'p' задаём значение value.
}


tools.addEventListener('click', function(event) {
    const mainText = document.querySelector('.main-text');

    if (event.target.className === 'tools-icon') { // Если нажали на иконку -->
        toolsFunctional(mainText, event); // --> В поле с основным текстом (textArea), меняем стиль текста.

        event.target.closest('.tools-icons-blocks').classList.toggle('tools-icons-blocks-active'); // -->
        // Элементу с классом '.tools-icons-blocks' переключаем класс 'tools-icons-blocks-active'. (Появляется обводка иконки)
    }
})

menuBtn.addEventListener('click', function() {
    const tools = document.querySelector('.tools');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');

    tools.classList.toggle('tools-active');
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-active');
    currentNote.classList.toggle('current-note-active');
})

createNoteBtn.addEventListener('click', function() {
    createNewNote(); // Создаём заметку

    noteTitle.value = ''; // Очищаем поле
    noteText.value = ''; // Очищаем поле

    switchingClassesForCreateNewNote('active-list'); // Выделяем новую заметку (делаем темнее фон).
}) // При нажатии на кнопку 'Создать новую заметку'

savedNotes.addEventListener('click', function(event) {
    if ( event.target.closest('.notes') ) {
        dataValue = event.target.closest('li').dataset.value; // сохраняем значение аттрибута dataValue.

        switchingClasses('active-list'); // Выделяем серым цветом активную заметку.

        fillingOfFieldsCurrentNote(); //
    } // при клике на сохр. заметку.

    if (event.target.className === 'trash-can') { // Если нажали на 'мусорное ведро' -->
        textConfirmation('Вы уверены, что хотите удалить эту заметку?'); // --> Указываем текст подтверждения.

        blockConfirmBtns.id = 'from-trash-can'; // --> элементу с кнопками подтвеждения удаления, присваиваем id.

        togglesDisplayStatus('flex'); // --> показываем модальное окно удаления.

        idCurrentSavedNote = event.target.closest('li').id; // сохраняем id удаляемого элемента.
    } // при удалении заметки.
}) // Для сохранённых заметок.

blockConfirmBtns.addEventListener('click', function(event) {
    if (event.target.id === 'del-yes') { // Если нажали на кнопку 'Да' -->
        if (blockConfirmBtns.id === 'from-trash-can') { // Если id элемента подтверждения === 'from-trash-can' -->
            if (document.querySelectorAll('li').length !== 1) {
                document.getElementById(idCurrentSavedNote).remove(); // --> удаляем элемент по id.

                index--; // После удаления заметки, index (значение атрибута data-value) уменьшаем.

                removeNoteFromDb('from-trash-can'); // Удаляем заметку из database.

                noteTitle.value = ''
                noteText.value = '';


                reWriteDataValue(); // Перезаписываем значение атрибута data-value для всех эллементов, начиная со следующего элемента.
                // (удаляем 2-ой, остальные перезаписываем на -1.)

                if (dbOfSavedNote[dataValue] === undefined) {
                    dataValue--;
                }

                switchingClasses('active-list'); // Выделяем серым цветом активную заметку.

                fillingOfFieldsCurrentNote();

                idCurrentSavedNote = undefined; // очищаем переменную.
            } else {
                document.getElementById(idCurrentSavedNote).remove(); // --> удаляем элемент по id.

                index--; // После удаления заметки, index (значение атрибута data-value) уменьшаем.

                removeNoteFromDb('from-trash-can'); // Удаляем заметку из database.

                noteTitle.value = ''
                noteText.value = '';
            }
        }

        if (blockConfirmBtns.id === 'from-clear-all-btn') { // Если id элемента подтверждения === 'from-clear-all-btn' -->
            document.querySelector('ul').remove(); // --> удаляем весь тег ul. (соответсвенно все сохранённые заметки удаляются).

            removeNoteFromDb('from-clear-all-btn');

            index = 0; // После удаления всех заметок, index (значение атрибута data-vale) обнуляем.
        }

        togglesDisplayStatus('none'); // убираем модальное окно удаления.
    }

    if (event.target.id === 'del-no') { // Если нажали кнопку 'Нет' -->
        idCurrentSavedNote = undefined; // очищаем переменную.

        togglesDisplayStatus('none'); // убираем модальное окно удаления.
    }
})

clearAllBtn.addEventListener('click', function() {
    textConfirmation('Вы уверены, что хотите навсегда удалить все сохраненные заметки?'); // --> Указываем текст подтверждения.

    blockConfirmBtns.id = 'from-clear-all-btn'; // --> элементу с кнопками подтверждения удаления, присваиваем id.

    togglesDisplayStatus('flex'); // --> показываем модальное окно удаления.
})

currentNote.addEventListener('input', function (event) {
    if (!savedNotes.firstChild || document.querySelectorAll('li').length === 0) {
        createNewNote();

        switchingClassesForCreateNewNote('active-list');
    }

    if (noteTitle.value !== '') {
        dbOfSavedNote[dataValue].title = noteTitle.value;

        valueOfSavedNote('b', noteTitle.value);
    } else {
        dbOfSavedNote[dataValue].title = 'Без названия';

        valueOfSavedNote('b', 'Без названия');
    }

    if (noteText.value !== '') {
        dbOfSavedNote[dataValue].text = noteText.value;

        valueOfSavedNote('p', noteText.value);
    } else {
        dbOfSavedNote[dataValue].text = 'Пустой';

        valueOfSavedNote('p', 'Пустой');
    }
})


