const burger = document.getElementById('menu')
const burgerLineSecond = document.getElementById('c-humburger-line2')
const burgerLineFirst = document.getElementById('c-humburger-line1')
const burgerLineThird = document.getElementById('c-humburger-line3')
const ul_menu = document.getElementById('header_hidden-ul')
const ul_item = document.getElementsByClassName('header_hidden-ul-item')
const commandTitle = document.getElementById('command-title-h2')
const bloggerButtonsContainer = document.getElementById('blogger_buttonS')
const blogerTitleSpec = document.getElementById('loger_title-spec')
let pageWidth = window.innerWidth
let pageHeight = document.documentElement.scrollHeight
let bloggerPhotos = document.getElementsByClassName('bloggerPhotos')
const arrowPink = document.getElementById('arrow-pink')
const srcArray = ['assets/static_white.png', 'assets/static_black.png']
const advBtn = document.getElementById('adv_btn-hidden')
console.log(bloggerPhotos)
let i = 0
if (advBtn && window.innerWidth <= 700) {
    advBtn.classList.toggle('hidden')
}
if (commandTitle) {
    window.innerWidth <= 700 ? commandTitle.innerHTML = 'Подать заявку' : commandTitle.innerHTML = 'Стань частью команды'
}

if (bloggerButtonsContainer) changeContent2()

if (bloggerPhotos) changeContent3()

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

function changeContent() {
    pageWidth = window.innerWidth
    pageHeight = document.documentElement.scrollHeight
    if (commandTitle) {
        window.innerWidth <= 700 ? commandTitle.innerHTML = 'Подать заявку' : commandTitle.innerHTML = 'Стань частью команды'
    }
}

function changeContent3() {
    if (window.innerWidth <= 700 && Array.from(bloggerPhotos).length != 0) {
        bloggerPhotos[0].parentNode.removeChild(bloggerPhotos[1])
        arrowPink.classList.toggle('hidden')
    }
}

function changeSrc() {
    console.log('123')
    if (i == 1) {
        i = 0;
        bloggerPhotos[0].setAttribute('src', srcArray[i])
        return
    }
    bloggerPhotos[0].setAttribute('src', srcArray[++i])
}

function changeContent2() {
    if (window.innerWidth <= 700 && bloggerButtonsContainer) {
        bloggerButtonsContainer.innerHTML = ''
        blogerTitleSpec.classList.toggle('hidden')
        bloggerButtonsContainer.innerHTML = `
        <div class="blogger_card-inner">
        <div class="bloger_card-info">
            <span class="bloger_card-info-span">
                jimmyprotonn
                <br>
            </span>
            <span class="bloger_card-info-span">
                inst: 28 000 подписчиков
            </span>
            <span class="bloger_card-info-span">
                tiktok: 56 000 подписчиков
            </span>
            <button class="blogger_btn blogger_btn-blue">
             Instargam
        </button>
        <button class="blogger_btn blogger_btn-purple">
        Tiktok
    </button>
        </div>
    </div>
        `
    }
}
window.addEventListener('resize', changeContent)
window.addEventListener('resize', changeContent2)
arrowPink ? arrowPink.addEventListener('click', changeSrc) : null