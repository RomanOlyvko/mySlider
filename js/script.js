window.onload = function () {
    let main = document.getElementById("main"); // доступ до головної діви
    let buttonLeft = document.getElementById("leftArrow"); // доступ до лівої стрілки
    let buttonRight = document.getElementById("rightArrow"); // доступ до правої стрілки
    let bigImg = document.getElementById("bigImg"); // доступ до тегу img з великими фото
    let smallImg = document.getElementById("smallImg"); // доступ до img з маленькими фото
    let radioButtons = document.getElementsByName("currentPicture"); // доступ до радіобатоннів
    let smallPictureForm = document.forms.smallPicture; // доступ до форми з радіобатоннами
    let autoSlide = document.getElementsByName("autoSlade")[0]; // доступ до кнопки запуску і зупинки слайдера
    let pictures = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg"]; // масив великих фото
    let smallPictures = ["img/11.jpg", "img/22.jpg", "img/33.jpg", "img/44.jpg", "img/55.jpg", "img/66.jpg", "img/77.jpg", "img/88.jpg", "img/99.jpg"] // масив маленьких фото

    let i = 0,
        firstPath = 410,
        step = 25;

    function goRight() { // функція яка підключається до правої стрілки для переходу слайдів
        ++i;
        if (i > pictures.length - 1) i = 0;
        bigImg.src = pictures[i]; // значення і генерує фото з масиву
        smallPictureForm.elements[i].checked = true; // при кожному переключенні радіобатон checked
    }

    buttonRight.onclick = goRight; // функція записана в кнопку
    buttonLeft.onclick = function () {
        i--;
        if (i < 0) i = pictures.length - 1;
        smallPictureForm.elements[i].checked = true; // при кожному переключенні радіобатон checked
        bigImg.src = pictures[i]; // значення і генерує фото з масиву
    }

    function pictureRadioView(n) { // функція появи маленьких фото ( let n - грає роль параметра який копіює в себе числове значення псевдомасиву картинок в одній функції і радіобатоннів у іншій )
        for (let j = n; j <= n; j++) {
            radioButtons[j].onmouseover = function () {
                smallImg.src = smallPictures[j - 1]; // від псевдомасиву віднімаєм 1 отримуємо потрібну кількість індексів
                if (smallPictureForm.elements[j - 1].checked) { // якщо один з перебору радіо checked тоді картинка знову ховається
                    smallImg.style.display = "none";
                } else smallImg.style.display = "inline-block"; // вибудовуємо маленькі фото в ряд
                smallImg.style.left = firstPath + step * n + "px"; // посуваємо від лівого краю на задану кількість пікселів з кожним onmouseover
            }
        }
    }

    function pictureRadioSet(n) { // функція вибору радіобатонна ( let n - грає роль параметра який копіює в себе числове значення псевдомасиву картинок в одній функції і радіобатоннів у іншій )
        for (let j = n; j <= n; j++) {
            radioButtons[j].onclick = function () {
                bigImg.src = pictures[j - 1]; // від псевдомасиву елеменів відняти 1 отримаємо потрібну кількість індексів
                smallImg.style.display = "none";
            }
        }
    }

    for (let j = 0; j < smallPictureForm.length; j++) {
        radioButtons[j] = pictureRadioSet(j); // викликаєм функцію вибору радіобатонна підставляєм в параметр j
    }
    for (let j = 0; j < smallPictureForm.length; j++) {
        radioButtons[j] = pictureRadioView(j); // викликаєм функцію підставляєм в параметр j
    }
    for (let j = 0; j < radioButtons.length; j++) {
        radioButtons[j].onmouseout = function () { // подія відводу мишки
            smallImg.style.display = "none"; // ховаєм маленькі фото
        }
    }

    // Play & Stop function;

    let runSlide;
    autoSlide.onclick = function () {
        if (this.value == "Play") { // якщо значення кнопки "Play"
            runSlide = setInterval(goRight, 3000); // запускаєм слайдер і викликаємо функцію goRight кожні 3 сек
            this.value = "Pause"; // і міняємо значення кнопки на "Pause"
        } else {
            this.value = "Play"; // В іншому випадку значення "Play"
            clearInterval(runSlide); // і зупиняємо перехід
        }
    }
}
