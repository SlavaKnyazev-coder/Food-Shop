'use strict';

window.addEventListener('DOMContentLoaded', () => {
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
})