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
    function showTabContent(i = 0){
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    //Использование делегирования событий на род. элементе, в котором лежат все табы
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, index) => {
                if(target == item){
                    hideTabContent()
                    showTabContent(index)
                }
            })
        }
    })

    hideTabContent()
    showTabContent()

    //Timer
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
        if(num >= 0 && num < 10){
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

            if(t.total === 0){
                clearInterval(timeInterval);
            }
        }
    }

    clockTime('.timer', deadline);

    //Modal
    const $modalTrigger = document.querySelectorAll('[data-modal]'),
        $modal = document.querySelector('.modal'),
        $modalCloseBtn = document.querySelector('[data-close]');

    $modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            $modal.classList.remove('hide');
            $modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        })
    })

    function closeModal(){
        $modal.classList.remove('show');
        $modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    $modalCloseBtn.addEventListener('click', closeModal);

    $modal.addEventListener('click', event => {
        if(event.target === $modal){
            closeModal();
        }
    })

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape'){
            closeModal();
        }
    })

})