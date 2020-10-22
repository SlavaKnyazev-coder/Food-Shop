'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    //получение элементов со страницы
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    //Функция которая скрывает контент и удаляет класс активности у элемента
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade')
        })
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        })
    }

    //Функция которая отображает контент на странице по индексу элемента
    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    //Использование делегирования событий на род. элементе, в котором лежат все табы
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(index)
                }
            })
        }
    })

    hideTabContent()
    showTabContent()

    //Timer---------------------------------
    const deadline = '2020-11-06';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function clockTime(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total === 0) {
                clearInterval(timeInterval);
            }
        }
    }

    clockTime('.timer', deadline);

    //Modal---------------------------------------
    const $modalTrigger = document.querySelectorAll('[data-modal]'),
        $modal = document.querySelector('.modal'),
        $modalCloseBtn = document.querySelector('[data-close]');

    //Function that opens a modal window
    function openModal() {
        $modal.classList.remove('hide');
        $modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimeoutId);
    }

    //A function that closes a modal window
    function closeModal() {
        $modal.classList.remove('show');
        $modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    $modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    })

    $modalCloseBtn.addEventListener('click', closeModal);

    $modal.addEventListener('click', event => {
        if (event.target === $modal) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape') {
            closeModal();
        }
    })

    const modalTimeoutId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            console.log('log')
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)
})

//Использование классов для карточек----------------------------------------
const menuItem = document.querySelectorAll('.menu__item');

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH();
    }

    changeToUAH() {
        this.price = this.price * this.transfer;
    }

    render() {
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>
        `
        this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Фитнес",
    "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. " +
    "Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Премиум",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд." +
    "Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Постное",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, " +
    "молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    '.menu .container'
).render();