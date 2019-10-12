const dataOfSelect = [
    ["Необхідна надійність ПЗ", 0.75, 0.88, 1, 1.15, 1.40, "n/a"],
    ["Розмір БД додатка",  "n/a", 0.94, 1, 1.08, 1.16, "n/a"],
    ["Складність продукту", 0.70, 0.85, 1, 1.15, 1.30, 1.65],
    ["Обмеження швидкодії при виконанні програми",  "n/a", "n/a", 1, 1.11, 1.30, 1.66],
    ["Обмеження пам'яті", "n/a", "n/a", 1, 1.06, 1.21, 1.56],
    ["Нестійкість оточення віртуальної машини", "n/a", 0.87, 1, 1.15, 1.30, "n/a"],
    ["Необхідний час відновлення", "n/a", 0.87, 1, 1.07, 1.15, "n/a"],
    ["Аналітичні здібності", 1.46, 1.19, 1, 0.86, 0.71, "n/a"],
    ["Досвід розробки", 1.29, 1.13, 1, 0.91, 0.82, "n/a"],
    ["Здібності до розробки ПЗ", 1.42, 1.17, 1, 0.86, 0.70, "n/a"],
    ["Досвід використання віртуальних машин", 1.21, 1.10, 1, 0.90, "n/a", "n/a"],
    ["Досвід розробки на мовах програмування", 1.14, 1.07, 1, 0.95, "n/a", "n/a"],
    ["Застосування методів розробки ПЗ", 1.24, 1.10, 1, 0.91, 0.82, "n/a"],
    ["Використання інструментарію розробки", 1.24, 1.10, 1, 0.91, 0.83, "n/a"],
    ["Вимоги дотримання графіка розробки", 1.23, 1.08, 1, 1.04, 1.10, "n/a"],
];

const type = {
    "organic" : [[2.4, 1.05, 2.5, 0.38],[3.2, 1.05]],
    "semidetach" : [[3, 1.12, 2.5, 0.35],[3, 1.12]],
    "embedded" : [[3.6, 1.2, 2.5, 0.32],[2.8, 1.2]],
};

document.querySelector("#levelSelection").onchange = function () {
    let select = document.querySelector("#levelSelection");
    let valueSelect = select.options[select.selectedIndex].value;
    let input = document.querySelector(".input");

    if (valueSelect == "basic") {
        if (input.children.length > 0) {
            input.innerHTML = "";
        }
    }
    else {
        creatingAdditionalParameters();
    }
};

document.querySelector("#btn").onclick = function () {
    let select = document.querySelector("#levelSelection");
    let valueSelect = select.options[select.selectedIndex].value;
    let sizeCode = getSizeOfCode(document.querySelector("#sizeCode").value);
    let dataType;
    let chooseType = chooseValueType();

    valueSelect === "basic" ?  dataType = type[chooseType][0] : dataType = type[chooseType][1];
    valueSelect === "basic" ? basicMode(sizeCode,dataType) : intermediateMode(sizeCode,dataType);
};

function chooseValueType() {
    let inputs = document.querySelectorAll(".chooseType input");
    let chooseType;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            chooseType = inputs[i].getAttribute("data");
        }
    }
    return chooseType;
}

function getSizeOfCode(sizeCode) {
    return (sizeCode < 1000) ? (sizeCode / 1000) : (sizeCode * 0.001);
}

function basicMode(sizeCode,dataType) {
    let [a,b,c,d] = dataType;
    let peopleMonth = a * (sizeCode ** b);
    let timeAtMonth = c * (peopleMonth ** d);
    let averageNumberOfStaff = peopleMonth / timeAtMonth;
    let productivity = sizeCode / peopleMonth;
    let outputData = {
        "Трудоємкість" : peopleMonth,
        "Час розробки в календарних місяцях" : timeAtMonth,
        "Середня чисельність персоналу" : averageNumberOfStaff,
        "Продуктивність" : productivity,
    };
    outputResult(outputData);
}

function intermediateMode(sizeCode, dataType) {
    let [a,b] = dataType;
    let arraySelectors = [];
    let selectors = [];
    let valueSelectors = 1;

    for (let i = 0; i < 15; i++) {
        arraySelectors.push("#select" + [i]);
        selectors.push(document.querySelector(arraySelectors[i]));
        if (selectors[i].options[selectors[i].selectedIndex].value === "n/a") {
            continue;
        }
        else {
            valueSelectors *= selectors[i].options[selectors[i].selectedIndex].value;
        }
    }

    let peopleMonth = valueSelectors * a * (sizeCode ** b);
    let outputData = {
        "Трудоємкість" : peopleMonth,
    };
    outputResult(outputData);
}

function outputResult(outputDate) {
    let key;
    let out = document.querySelector(".calculator__output");

    for (key in outputDate) {
        out.innerHTML += `<p>${key} = ${outputDate[key].toFixed(4)}</p>`;
    }

    out.innerHTML += "<hr>";
    clearOutput();
}

function clearOutput() {
    let btn = document.querySelector("#btn__clear");
    let output = document.querySelector(".calculator__output");

    btn.onclick = () => {
        output.innerHTML = "";
    }
}

function creatingAdditionalParameters() {
    createSelect();
    addIdToSelect();
    createOption();
    addValueToOption();
    addDataToOption();
    addTitleToSelect();
}

function createSelect() {
    let out = document.querySelector(".input");
    let newSelect = document.createElement('select');

    for (let i = 0; i < dataOfSelect.length; i++) {
        out.appendChild(newSelect.cloneNode(true));
        out.innerHTML += "<br>";
    }
}

function addIdToSelect() {
    let str = "select";
    let selects = document.querySelectorAll('.input select');

    for (let i = 0; i < selects.length; i++) {
        selects[i].id = str + i;
    }
}

function createOption() {
    let selects = document.querySelectorAll('.input select');
    let option = document.createElement('option');

    for (let i = 0; i < selects.length; i++) {
        for (let j = 0; j < dataOfSelect[i].length - 1; j++) {
            selects[i].appendChild(option.cloneNode(true));
        }
    }
}

function addValueToOption() {
    let selects = document.querySelectorAll('.input select');

    for (let i = 0; i < selects.length; i++) {
        for (let j = 0; j < selects[i].children.length; j++) {
            (selects[i].children[j]).value = dataOfSelect[i][j + 1];
        }
    }
}

function addDataToOption() {
    let params = ["Дуже низький", "Низький", "Середній", "Високий", "Дуже високий", "Критичний"];
    let selects = document.querySelectorAll(".input select");

    for (let i = 0; i < selects.length; i++) {
        for (let j = 0; j < params.length; j++) {
            selects[i].children[j].innerText = params[j] + " " + dataOfSelect[i][j + 1];
        }
    }
}

function addTitleToSelect() {
    let selects = document.querySelectorAll('.input select');

    for (let i = 0; i < dataOfSelect.length; i++) {
        selects[i].insertAdjacentHTML("beforebegin", `<p>${dataOfSelect[i][0]}</p>`);
    }
}