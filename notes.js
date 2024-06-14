const menuBtn = document.getElementById('menu-btn');
const sidebar = document.querySelector('.sidebar');
const content = document.querySelector('.content');

menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('sidebar-active');
    content.classList.toggle('content-active');
})