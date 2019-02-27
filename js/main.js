var loadActive =[];
for(var i=0;i<3;i++){
    loadActive[i] = true;
}
function makeFile(file) {
    return file.name + ' (' + Math.ceil(file.size/1024) + 'Кб)';
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function fileChecked(inputs,state,imgs,name,result,inputNumber) {
    if (getRandomInt(0, 1) === 1) {
        switch (inputNumber) {
            case 0: {
                state[inputNumber].innerHTML = 'Загрузить скан страницы с фотографией';
                break;
            }
            case 1: {
                state[inputNumber].innerHTML = 'Загрузить скан паспорта';
                break;
            }
            case 2: {
                state[inputNumber].innerHTML = 'Загрузить скан ИНН';
                break;
            }
        }
        inputs[inputNumber].value = '';
        state[inputNumber].style.textDecoration = 'underline';
        imgs[inputNumber].src = 'img/upload.svg';
        name[inputNumber].innerHTML = 'Размер файла не более 5Мб';
        result[inputNumber].innerHTML = 'Отклонено';
        result[inputNumber].style.color = 'red';
        loadActive[inputNumber] = true;
        console.log(loadActive);
    }
    else {
        inputs[inputNumber].outerHTML = '';
        imgs[inputNumber].src = 'img/ok.svg';
        result[inputNumber].innerHTML = 'Проверено';
        result[inputNumber].style.color = 'green';
        switch (inputNumber) {
            case 0: {
                state[inputNumber].innerHTML = 'Страница с фотографией';
                break;
            }
            case 1: {
                state[inputNumber].innerHTML = 'Скан паспорта';
                break;
            }
            case 2: {
                state[inputNumber].innerHTML = 'Скан ИНН';
                break;
            }
        }

    }
}
function fileLoaded (inputs,state,imgs,name,result,inputNumber) {
    state[inputNumber].innerHTML = 'Файл загружен';
    imgs[inputNumber].src = 'img/wait.svg';
    name[inputNumber].innerHTML = makeFile(inputs[inputNumber].files[0]);
    result[inputNumber].innerHTML = 'Идет проверка';
    result[inputNumber].style.color = 'grey';
    setTimeout(function () {fileChecked(inputs,state,imgs,name,result,inputNumber)}, getRandomInt(500,5000))
}
function loadFile() {
    var inputs = document.querySelectorAll(".input__file");
    var imgs = document.querySelectorAll(".input__img");
    var state = document.querySelectorAll(".input__state");
    var name = document.querySelectorAll(".input__name");
    var result = document.querySelectorAll(".input__result");
    for(var i=0;i<3;i++){
        (function (inputNumber){
            inputs[inputNumber].onchange = function () {
                if(loadActive[inputNumber] === true){
                    loadActive[inputNumber] = false;
                    console.log(loadActive);
                    imgs[inputNumber].src = 'img/loading.gif';
                    state[inputNumber].style.textDecoration = 'none';
                    result[inputNumber].innerHTML = '';
                    setTimeout(function(){fileLoaded (inputs,state,imgs,name,result,inputNumber)}, getRandomInt(500,5000))
            }
            }

        })(i)
    }
}
loadFile();

