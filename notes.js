const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const tools = document.querySelector('.tools');
const saveNotes = document.querySelector('.save-notes');
const blockConfirmBtns = document.querySelector('.block-confirm-buttons');
const mask = document.querySelector('.mask');
const confirm = document.querySelector('.confirm');

let idCurrentSavedNote; // тут будет храниться id заметки, готовое к уадлению.

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
    const li = document.createElement('li');
    const ul = document.querySelector('ul');
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

    b.textContent = 'Lorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumque';
    p.textContent = 'Lorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumqueLorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumqueLorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumque'
    time.textContent = '20 минут(ы) назад';

    b.classList.add('text-in-saved-notes');
    p.classList.add('text-in-saved-notes');

    li.appendChild(b);
    li.appendChild(p);
    li.appendChild(divFooter);
    li.id = 'note-' + id;
    li.classList.add('notes');

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(li);
})

saveNotes.addEventListener('click', function(event) {
    if (event.target.className === 'trash-can') {
        togglesDisplayStatus('flex');

        idCurrentSavedNote = event.target.closest('li').id;
    }
})

blockConfirmBtns.addEventListener('click', function(event) {
    if (event.target.id === 'del-no') {
        togglesDisplayStatus('none');
    }

    if (event.target.id === 'del-yes') {
        document.getElementById(idCurrentSavedNote).remove();

        togglesDisplayStatus('none');
    }
})