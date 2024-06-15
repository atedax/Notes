const menuBtn = document.getElementById('menu-btn');
const createNoteBtn = document.getElementById('create-note-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-active');
})

createNoteBtn.addEventListener('click', function() {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    const b = document.createElement('b');
    const p = document.createElement('p');
    const divFooter = document.createElement('div');
    const time = document.createElement('time');
    const divDelete = document.createElement('div');
    const imgDelete = document.createElement('img');

    divFooter.classList.add('note-footer');
    divDelete.classList.add('note-delete');

    time.classList.add('time');

    imgDelete.classList.add('trash-can');
    imgDelete.src = './icon/trash-can.png';
    imgDelete.alt = 'Удалить';

    b.textContent = 'Lorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumque';
    p.textContent = 'Lorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumqueLorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumqueLorem ipsum dolor sit amet, consecteturm? Ab, accusamus consequatur culpa cumque'
    time.textContent = '20 минут(ы) назад';

    li.appendChild(b);
    li.appendChild(p);
    li.appendChild(divFooter);

    divDelete.appendChild(imgDelete);

    divFooter.appendChild(time);
    divFooter.appendChild(divDelete);

    ul.appendChild(li);
})
