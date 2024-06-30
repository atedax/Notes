const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');

menuBtn.addEventListener('click', function () {
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
    const Li = document.createElement('li');
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

    Li.appendChild(b);
    Li.appendChild(p);
    Li.appendChild(divFooter);
    Li.id = 'note-' + id;

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(Li);
})

function getRandomId() {
    return new Date().getTime();
}
