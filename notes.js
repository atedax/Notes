const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const tools = document.querySelector('.tools');
const saveNotes = document.querySelector('.save-notes');
const blockConfirmBtns = document.querySelector('.block-confirm-buttons');
const mask = document.querySelector('.mask');
const confirm = document.querySelector('.confirm');
const clearAllBtn = document.getElementById('clear-all-btn');
const db = [];

let idCurrentSavedNote; // тут будет храниться id заметки, готовое к уадлению.
let index = 0;

function getRandomId() {
    return new Date().getTime();
}

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
}

function togglesDisplayStatus(status) {
    mask.style.display = status;
    confirm.style.display = status;
} // только для элементов с классом 'mask' и 'confirm'

function textConfirmation(text) {
    return document.querySelector('.text-in-confirm-body').textContent = text;
}


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
    if ( !saveNotes.firstChild ) {
        const createUl = document.createElement('ul');

        saveNotes.appendChild(createUl);
    }

    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const b = document.createElement('b');
    const p = document.createElement('p');
    const divFooter = document.createElement('div');
    const time = document.createElement('time');
    const divDelete = document.createElement('div');
    const imgDelete = document.createElement('img');

    let id = getRandomId();

    divFooter.classList.add('note-footer');

    divDelete.classList.add('note-delete');

    time.classList.add('time');

    imgDelete.classList.add('trash-can');
    imgDelete.src = './icon/trash-can.png';
    imgDelete.alt = 'Удалить';

    autocompleteSavedNotes('note-title', b);
    autocompleteSavedNotes('note-text', p);

    time.textContent = '20 минут(ы) назад';

    b.classList.add('text-in-saved-notes');
    p.classList.add('text-in-saved-notes');

    li.appendChild(b);
    li.appendChild(p);
    li.appendChild(divFooter);
    li.id = 'note-' + id;
    li.classList.add('notes');
    li.dataset.value = index++;

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(li);


    db.push({
       id: id,
       title: b.textContent,
       text: p.textContent,
    });
}) // использовать функцию создания заметки

saveNotes.addEventListener('click', function(event) {
    if (event.target.className === 'trash-can') {
        textConfirmation('Вы уверены, что хотите удалить эту заметку?');

        blockConfirmBtns.id = 'from-trash-can';

        togglesDisplayStatus('flex');

        idCurrentSavedNote = event.target.closest('li').id;
    }

    if ( event.target.closest('li') ) {
        console.log( event.target.closest('li').getAttribute('data-value') );
    }
})

blockConfirmBtns.addEventListener('click', function(event) {
    if (event.target.id === 'del-yes') {
        if (blockConfirmBtns.id === 'from-trash-can') {
            document.getElementById(idCurrentSavedNote).remove();
        }

        if (blockConfirmBtns.id === 'from-clear-all-btn') {
            document.querySelector('ul').remove();
        }
    }

    togglesDisplayStatus('none');
})

clearAllBtn.addEventListener('click', function() {
    textConfirmation('Вы уверены, что хотите навсегда удалить все сохраненные заметки?');

    blockConfirmBtns.id = 'from-clear-all-btn';

    togglesDisplayStatus('flex');
})


function autocompleteSavedNotes(elementById, tag) {
    let element = document.getElementById(elementById).value;

    if (element === '') {
        tag.textContent = 'Без названия';
    } else {
        tag.textContent = element;
    }
}

function autoCreateSaveNote() {
    if ( (document.getElementById('note-title').value !== '' ||
        document.getElementById('note-text').value !== '') && saveNotes.firstChild === null ) {
        if ( !saveNotes.firstChild ) {
            const createUl = document.createElement('ul');

            saveNotes.appendChild(createUl);
        }

        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const b = document.createElement('b');
        const p = document.createElement('p');
        const divFooter = document.createElement('div');
        const time = document.createElement('time');
        const divDelete = document.createElement('div');
        const imgDelete = document.createElement('img');

        let id = getRandomId();

        divFooter.classList.add('note-footer');

        divDelete.classList.add('note-delete');

        time.classList.add('time');

        imgDelete.classList.add('trash-can');
        imgDelete.src = './icon/trash-can.png';
        imgDelete.alt = 'Удалить';

        autocompleteSavedNotes('note-title', b);
        autocompleteSavedNotes('note-text', p);

        time.textContent = '20 минут(ы) назад';

        b.classList.add('text-in-saved-notes');
        p.classList.add('text-in-saved-notes');

        li.appendChild(b);
        li.appendChild(p);
        li.appendChild(divFooter);
        li.id = 'note-' + id;
        li.classList.add('notes');
        li.dataset.value = index++;

        divDelete.appendChild(imgDelete);

        divFooter.appendChild(time);
        divFooter.appendChild(divDelete);

        ul.appendChild(li);


        db.push({
            id: id,
            title: b.textContent,
            text: p.textContent,
        });
    } // написать функцию создания заметки.
} // переделать условие


setInterval(autoCreateSaveNote, 500);


