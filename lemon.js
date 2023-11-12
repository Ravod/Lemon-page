"use strict";


/* ********** ----------   СЕКЦИЯ NAV   ---------- **********  */


(function () {

    //кнопка бургер

    const navBurger = document.querySelector (`.nav--button__BURGER`);
    const navMenu = document.querySelector (`.nav--ul__MENU`);

    navBurger.addEventListener (`click`, function () {
        navMenu.classList.toggle (`open`);
    });


    //выпадающее подменю для сенсорных устройств

    const navI = document.querySelector (`.nav--i`);
    const navSubmenu = document.querySelector (`.nav--ul__SUBMENU`);

    navI.addEventListener (`click`, function (event) {
        event.preventDefault ();
        navI.classList.toggle (`rotateChevron`);
        navSubmenu.classList.toggle (`open`);
    });

}) ();







/* ********** ----------   СЕКЦИЯ HERO   ---------- **********  */


(function () {

    //слайдер1

    const swiper1 = new Swiper ('.hero--div__SWIPER', {
        loop: true,
        pagination: {
            el: '.hero--div__SWIPER_PAGINATION',
            clickable: true,
        },
        initialSlide: 2,
    });

}) ();







/* ********** ----------   СЕКЦИЯ SORRY&AUTHOR   ---------- **********  */


(function () {

    //кнопка возврата на предыдущую станицу

    const saButton = document.querySelector (`.sa1--button`);

    saButton.addEventListener (`click`, function () {
        history.back ();
    });

}) ();







/* ********** ----------   СЕКЦИЯ MISCELLANEA   ---------- **********  */


// СЛАЙДЕР2

(function () {

    const swiper2 = new Swiper ('.misc11--div__SWIPER', {
        loop: true,
        pagination: {
            el: '.misc11--div__SWIPER_PAGINATION',
            clickable: true,
        },
        initialSlide: 2,
    });

}) ();





// РАСПЕЧАТКА БЛОКОВ ПО ОТДЕЛЬНОСТИ

(function () {

    //находим блоки, которые можно распечатать
    const toPrint = Array.from (document.querySelectorAll (`.toPrint`));
    const toPrintMob = document.querySelector (`.misc21`);

    //находим ссылки, запускающие печать
    const printLink = Array.from (document.querySelectorAll (`.printLink`));
    const printMobLink = document.querySelector (`.printMobLink`);


    //добавляем этим ссылкам обработчики событий -
    //сначала ссылкам немобильных версий распечатываемых блоков
    printLink.forEach (function (v, i, a) {

        a[i].addEventListener (`click`, function (event) {

            event.preventDefault ();

            
            let oldHtml = document.body.innerHTML;
            let newHtml = toPrint[i].outerHTML;
            document.body.innerHTML = newHtml;
            print ();
            document.body.innerHTML = oldHtml;
            location.reload ();
    
        });
    })


    //затем ссылке мобильной версии одного из блоков
    printMobLink.addEventListener (`click`, function (event) {
        
        event.preventDefault ();

        let oldHtml = document.body.innerHTML;
        let newHtml = toPrintMob.outerHTML;
        document.body.innerHTML = newHtml;
        print ();
        document.body.innerHTML = oldHtml;
        location.reload ();

    });

}) ();





// ТАБЫ

(function () {

    const buttons = Array.from (document.querySelectorAll (`.misc21--button__TAB_BUTTON`));
    const blocks = Array.from (document.querySelectorAll (`.misc21--div__BLOCK`));

    buttons.forEach (function (v, i, a) {
        a[i].addEventListener (`click`, function (event) {
            event.preventDefault ();
            
            //изменение стилей кнопок
            a[i].style.fontWeight = `700`;
            a.filter ((v1, i1, a1) => a1[i1] !== a[i]).forEach ((v2, i2, a2) => {
                a2[i2].style.fontWeight = `300`;
            });

            //замена блоков
            blocks[i].style.display = `flex`;
            blocks.filter ((v3, i3, a3) => a3[i3] !== blocks[i]).forEach ((v4, i4, a4) => {
                a4[i4].style.display = `none`;
            });
        })
    });

}) ();





// КАЛЕНДАРЬ

(function () {

    let date = new Date ();



    // 1. Переключатели

    const left = document.querySelector (`.misc23--i__LEFT`);
    const right = document.querySelector (`.misc23--i__RIGHT`);

    left.addEventListener (`click`, function () {
        date.setMonth (date.getMonth () - 1);
        showTable ();
    });

    right.addEventListener (`click`, function () {
        date.setMonth (date.getMonth () + 1);
        showTable ();
    });



    // 2. Функция формирования шапки и таблицы

    function showTable () {

        //2.1 Шапка

        let currentM = date.getMonth ();
        let currentY = date.getFullYear ();

        const months = [
            `January`,
            `February`,
            `March`,
            `April`,
            `May`,
            `June`,
            `July`,
            `August`,
            `September`,
            `October`,
            `November`,
            `December`,
        ];

        const month = document.querySelector (`.misc23--span__MONTH`);
        month.textContent = months[currentM];

        const year = document.querySelector (`.misc23--span__YEAR`);
        year.textContent = currentY;


        //2.2 Календарь

        //а) начало месяца

        //число последнего дня предыдущего месяца
        const lastDateLM = new Date (currentY, currentM, 0).getDate ();

        //день недели первого дня месяца
        const firstDay = new Date (currentY, currentM, 1).getDay ();

        //массив первой недели (с помеченными днями предыдущего месяца)
        const week1 = [];
        for (let i = lastDateLM; i > lastDateLM - firstDay; i--) {
            week1.unshift (i + ``);
        }
        for (let i = 1; i < 8 - firstDay; i++) {
            week1.push (i);
        }



        //б) конец месяца

        //число последнего дня месяца
        const lastDate = (currentM !== 11) ? new Date (currentY, currentM + 1, 0).getDate () : new Date (currentY + 1, 0, 0).getDate ();

        //день недели последнего дня месяца
        const lastDay = (currentM !== 11) ? new Date (currentY, currentM + 1, 0).getDay () : new Date (currentY + 1, 0, 0).getDay ();

        //массив последней недели (с помеченными днями следующего месяца)
        const weekLast = [];
        for (let i = lastDate; i >= lastDate - lastDay; i--) {
            weekLast.unshift (i);
        }
        for (let i = 1; i < 7 - lastDay; i++) {
            weekLast.push (i + ``);
        }



        //в) промежуточные недели
        
        //количество промежуточных недель
        let weeksNumber = (lastDate - (7 - firstDay) - (1 + lastDay)) / 7;

        //первый день промежуточных недель
        let firstCenterDate = 1 + (7 - firstDay);

        //последний день промежуточных недель
        let lastCenterDate = lastDate - (lastDay + 1);

        //массив промежуточных недель-массивов
        const weeksCenter = [];

        let counter = firstCenterDate;
        for (let i = 0; i < weeksNumber; i++) {
            weeksCenter.push ([]);
            for (let j = firstCenterDate; j < firstCenterDate + 7; j++) {
                weeksCenter[i].push (counter);
                counter++;
            }
        }
    


        //г) массив с пустыми ячейками

        const weekEmpty = new Array (7);
        weekEmpty.fill (`  `);



        //д) итоговый массив - календарь

        const calendar = [week1, ...weeksCenter, weekLast];
        
        //при необходимости добавляем пустые недели
        if (weeksNumber < 4) {
            for (let i = 0; i < 4 - weeksNumber; i++) {
                calendar.push (weekEmpty);
            }
        }



        //е) добавляем календарь на страницу

        let trs = Array.from (document.querySelectorAll (`.misc23--tr`));

        trs.forEach (function (v, i, a) {
            let row = ``;
            for (let el of calendar[i]) {
                if (typeof (el) === `string` ) {
                    row += `<td class="misc23--tdx">${el}</td>`;
                } else {
                    row += `<td class="misc23--td">${el}</td>`;
                }
            }
            a[i].innerHTML = row;
        });
    }

    showTable ();

}) ();