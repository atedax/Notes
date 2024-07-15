const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const tools = document.querySelector('.tools');
const savedNotes = document.querySelector('.saved-notes');
const blockConfirmBtns = document.querySelector('.block-confirm-buttons');
const mask = document.querySelector('.mask');
const confirm = document.querySelector('.confirm');
const clearAllBtn = document.getElementById('clear-all-btn');

let dbOfSavedNote = []; // тут будет храниться массив объектов.
let idCurrentSavedNote; // тут будет храниться id заметки, готовое к уадлению.
let index = 0; // при создании новой заметки - индекс будет увеличиваться. index - это data-value li элемента.
let dataValue; // тут будет храниться значение элемента li.

function getRandomId() {
    return new Date().getTime();
} // Возвращет кол-во миллисекунд прошедших с 1 января 1970 года. В моём случае используется для id заметки.

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

function autocompleteTextInSavedNotes(elementById, tag) {
    let element = document.getElementById(elementById).value;

    if (element === '') { // Если значение элемента (input или textArea) пустое -->
        tag.textContent = 'Без названия'; // --> tag(b, p) в сохранённых заметках (savedNotes) вставляем текст заглушку.
    } else {
        tag.textContent = element; // --> значение элемента (input или textArea)
    }
} // Автоматически вставляет текст в сохранённых заметках. (savedNotes).

function autoCreateSaveNote() {
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');

    if ( (noteTitle.value !== '' || noteText.value !== '') && savedNotes.firstChild === null ) {
        createNewNote();
    }
} // Автоматически создаём заметку,
    // если в savedNote нет дочернего элемента (не нажали кнопку 'Создать новую заметку'),
    // а пользователь начал набирать текст.

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

    autocompleteTextInSavedNotes('note-title', b); // автозаполнение тега 'b'.
    autocompleteTextInSavedNotes('note-text', p); // автозаполнение тега 'p'.

    time.textContent = '20 минут(ы) назад'; // (для себя) сделать время (сколько прошло с момента создания заметки).

    b.classList.add('text-in-saved-notes');
    p.classList.add('text-in-saved-notes');

    li.appendChild(b);
    li.appendChild(p);
    li.appendChild(divFooter);
    li.id = 'note-' + id;
    li.classList.add('notes');
    li.dataset.value = `${index++}`; // присваиваем в атрибут data-value значение index.

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(li);

    addNoteInDb(id, b, p);
} //

function removeNoteFromDb() {

} // (доделать)

setInterval(autoCreateSaveNote, 100);


tools.addEventListener('click', function(event) {
    const mainText = document.querySelector('.main-text');

    if (event.target.className === 'tools-icon') {
        toolsFunctional(mainText, event);
    }
})

menuBtn.addEventListener('click', function() {
    const tools = document.querySelector('.tools');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const currentNote = document.querySelector('.current-note');

    tools.classList.toggle('tools-active');
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-active');
    currentNote.classList.toggle('current-note-active');
})

createNoteBtn.addEventListener('click', function() {
    createNewNote();
})

savedNotes.addEventListener('click', function(event) {
    if (event.target.className === 'trash-can') { // Если нажали на 'мусорное ведро' -->
        textConfirmation('Вы уверены, что хотите удалить эту заметку?'); // --> Указываем текст подтверждения.

        blockConfirmBtns.id = 'from-trash-can'; // --> элементу с кнопками подтвеждения удаления, присваиваем id.

        togglesDisplayStatus('flex'); // --> показываем модальное окно удаления.

        idCurrentSavedNote = event.target.closest('li').id; // сохраняем id удаляемого элемента.
        dataValue = event.target.closest('li').dataset.value; // сохраняем dataValue удаляемого элемента.
    }
})

blockConfirmBtns.addEventListener('click', function(event) {
    if (event.target.id === 'del-yes') { // Если нажали на кнопку 'Да' -->
        if (blockConfirmBtns.id === 'from-trash-can') { // Если id элемента подтверждения === 'from-trash-can' -->
            document.getElementById(idCurrentSavedNote).remove(); // --> удаляем элемент по id.

            dbOfSavedNote.splice(dataValue, 1); // из массива dataBase удаляем элемент под индексом dataValue.

            idCurrentSavedNote = undefined; // очищаем переменную.
        }

        if (blockConfirmBtns.id === 'from-clear-all-btn') { // Если id элемента подтверждения === 'from-clear-all-btn' -->
            document.querySelector('ul').remove(); // --> удаляем весь тег ul. (соответсвенно все сохранённые заметки удаляются).

            dbOfSavedNote = []; // очищаем массив dataBase.
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


