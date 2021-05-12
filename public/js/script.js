const burger = document.getElementById('menu')
const burgerLineSecond = document.getElementById('c-humburger-line2')
const burgerLineFirst = document.getElementById('c-humburger-line1')
const burgerLineThird = document.getElementById('c-humburger-line3')
const ul_menu = document.getElementById('header_hidden-ul')
const ul_item = document.getElementsByClassName('header_hidden-ul-item')
console.log(ul_item)

function toogleVisible() {
    burgerLineSecond.classList.toggle('c-humburger-line2Hidden')
    burgerLineFirst.classList.toggle('c-hamburger-lineTransformFirst')
    burgerLineThird.classList.toggle('c-hamburger-lineTransformThird')
    ul_menu.classList.toggle('ul_visible')
   Array.from(ul_item).forEach(element => {
       element.classList.toggle('visible')
   });
   document.body.classList.toggle('no-scroll')
}

burger.addEventListener('click', toogleVisible)