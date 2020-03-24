var hamburger = document.querySelector('.nav-hamburger');
var menuList = document.querySelector('.nav-list');
var menuLiItems = document.querySelectorAll('li');

// ovo je za mobile query gde hamburger otvara meni
function toggleMenu(e) {
    e.preventDefault();
    menuList.classList.toggle('visible');
}

hamburger.addEventListener("click", toggleMenu);

// ovo je za dodeljivanje aktivnih klasa u nav bar-u

function toggleActiveClass() {
    for (li of menuLiItems) {
        li.children[0].classList.remove('active');
        li.children[0].children[1].style.visibility = 'hidden';
    }
    this.classList.toggle('active');
    this.children[1].style.visibility = 'visible';
}

for (li of menuLiItems) {
    li.children[0].addEventListener('click', toggleActiveClass);
}





