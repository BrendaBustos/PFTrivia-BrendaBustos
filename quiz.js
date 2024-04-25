let nameJugador;
let regularPreg = 0;
let respOk = 0;
let respSelect = [];
const trivia = [
    {
        preg: "¿Qué es más saludable para el corazón?",
        ops: {
            a: "Aceite de coco",
            b: "Aceite de oliva",
            c: "Aceite de palma"
        },
        respOk: "b",
        detalle: "El aceite de oliva es una excelente opción para el corazón debido a su alto contenido de grasas monoinsaturadas y antioxidantes."
    },
    {
        preg: "¿Cuál es una buena fuente de proteínas magras?",
        ops: {
            a: "Salchichas",
            b: "Tofu",
            c: "Bistec graso"
        },
        respOk: "b",
        detalle: "El tofu es una excelente fuente de proteínas magras, y es una buena opción para las personas que desean reducir su ingesta de carnes rojas."
    },
    {
        preg: "¿Cuál es la mejor manera de hidratarse?",
        ops: {
            a: "Café",
            b: "Agua",
            c: "Gaseosa"
        },
        respOk: "b",
        detalle: "El agua es la mejor opción para hidratarse, ya que no tiene calorías y es esencial para el funcionamiento de nuestro cuerpo."
    },
    {
        preg: "¿Cuál es una buena fuente de fibra?",
        ops: {
            a: "Arroz blanco",
            b: "Arroz integral",
            c: "Pastel"
        },
        respOk: "b",
        detalle: "El arroz integral es una buena fuente de fibra, que ayuda a mantener la salud digestiva y puede reducir el riesgo de enfermedades cardíacas."
    },
    {
        preg: "¿Cuál es una buena manera de mantener la salud mental?",
        ops: {
            a: "Hacer ejercicio",
            b: "Dormir menos",
            c: "Comer alimentos azucarados"
        },
        respOk: "a",
        detalle: "Hacer ejercicio regularmente es una excelente manera de mantener la salud mental, ya que libera endorfinas que mejoran el estado de ánimo y reduce el estrés."
    },
    {
        preg: "¿Cuál es una fuente de vitaminas y minerales?",
        ops: {
            a: "Comida chatarra",
            b: "Frutas y verduras",
            c: "Dulces"
        },
        respOk: "b",
        detalle: "Las frutas y verduras son excelentes fuentes de vitaminas y minerales esenciales para la salud, como vitamina C, potasio y fibra."
    },
    {
        preg: "¿Cuál es un buen sustituto del azúcar?",
        ops: {
            a: "Stevia",
            b: "Jarabe de maíz",
            c: "Miel"
        },
        respOk: "a",
        detalle: "La stevia es un buen sustituto del azúcar, ya que es mucho más dulce y no afecta los niveles de azúcar en la sangre."
    },
    {
        preg: "¿Cuál es una buena fuente de calcio?",
        ops: {
            a: "Leche",
            b: "Soda",
            c: "Galletas"
        },
        respOk: "a",
        detalle: "La leche es una buena fuente de calcio, que es esencial para la salud de los huesos y los dientes."
    },
    {
        preg: "¿Cuál es una buena fuente de vitamina D?",
        ops: {
            a: "Sol",
            b: "Leche",
            c: "Café"
        },
        respOk: "a",
        detalle: "El sol es una excelente fuente de vitamina D, ya que el cuerpo puede producir esta vitamina cuando la piel está expuesta a la luz solar."
    },
    {
        preg: "¿Cuál es una buena manera de mantener la salud mental?",
        ops: {
            a: "Tomar alcohol",
            b: "Meditar",
            c: "Mirar televisión"
        },
        respOk: "b",
        detalle: "La meditación es una excelente manera de mantener la salud mental, ya que puede reducir el estrés y mejorar el estado de ánimo."
    }
];


const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submitButton');
const showResultsButton = document.getElementById('showResultsButton');
const startButton = document.getElementById('startButton');
const retryButton = document.getElementById('retryButton');

startButton.onclick = function () {
    nameJugador = prompt("Por favor, ingresa tu nombre para comenzar:");
    if (!nameJugador) {
        alert("Debes ingresar un nombre para continuar.");
        return;
    }

    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';

    showNextPreg();
}

function showNextPreg() {
    const regular = trivia[regularPreg];
    const ops = Object.entries(regular.ops).map(([letter, resp]) =>
        `<label>
            <input type="radio" name="preg${regularPreg}" value="${letter}" onclick="handleRespSelect(this)">
            ${letter}: ${resp}
        </label>`
    ).join('<br>');

    const output = `
        <div class="preg">${regularPreg + 1}. ${regular.preg}</div>
        <div class="ops">${ops}</div>
    `;

    quizContainer.innerHTML = output;

    if (regularPreg < trivia.length - 1) {
        submitButton.innerText = 'Siguiente';
    } else {
        submitButton.innerText = 'Enviar Respuestas';
    }
}

function handleRespSelect(element) {
    respSelect[regularPreg] = element.value;
}

function showFinalResults() {
    let output = '';
    const scorePercentage = Math.round(respOk / trivia.length * 100);
    const totaltrivia = trivia.length;
    const correctPercentage = (respOk / totaltrivia * 100).toFixed(2);

    output += `<br>Total correcto: ${respOk} de ${totaltrivia} preguntas (${correctPercentage}%).<br>`;

    trivia.forEach(function (preg, index) {
        const result = preg.respOk === respSelect[index];
        const resultText = result ? 'Correcto!' : 'Incorrecto.';
        const resultClass = result ? 'correct' : 'incorrect';
        const resultSymbol = result ? '✔️' : '❌';

        output += `
            <div class="preg">${index + 1}. ${preg.preg}</div>
            <div class="ops">
                <div>${respSelect[index]}: ${preg.ops[respSelect[index]]}</div>
                <div class="${resultClass} result">${resultSymbol} ${resultText}</div>
                <div class="detalle">${preg.detalle}</div>
            </div>
        `;
    });

    resultsContainer.innerHTML = output;
    submitButton.style.display = 'none';
    showResultsButton.style.display = 'none';
    retryButton.style.display = 'block';

    alert("Finalizar trivia");

    const finalResults = `
        <h2>Resultados de la trivia</h2>
        <p>Nombre del jugador: ${nameJugador}</p>
        <p>Puntaje: ${respOk} de ${trivia.length}</p>
        <p>Puntaje final: ${Math.round(respOk / trivia.length * 100)}%</p>
        <h3>Respuestas:</h3>
        ${resultsContainer.innerHTML}
    `;
    resultsContainer.innerHTML = finalResults;
}

submitButton.onclick = function () {
    const regular = trivia[regularPreg];
    const acierto = respSelect[regularPreg];

    if (!acierto) {
        alert("Por favor, selecciona una respuesta antes de continuar.");
        return;
    }

    if (regular.respOk === acierto) {
        respOk++;
    }

    regularPreg++;

    if (regularPreg < trivia.length) {
        showNextPreg();
    } else {
        showFinalResults();
    }
}

retryButton.onclick = function () {
    regularPreg = 0;
    respOk = 0;
    respSelect = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
    resultsContainer.innerHTML = '';
    showNextPreg();
}

showResultsButton.onclick = function () {
    const scorePercentage = Math.round((respOk / trivia.length) * 100);

    let output = ``;

    trivia.forEach((preg, i) => {
        const acierto = respSelect[i];
        const result = acierto === preg.respOk;
        const resultText = result ? 'Correcto!' : 'Incorrecto.';
        const resultClass = result ? 'correct' : 'incorrect';
        const resultSymbol = result ? '✔️' : '❌';
        const detalle = result ? '' : `<div>${preg.detalle}</div>`;

        output += `
            <div class="preg">${i + 1}. ${preg.preg}</div>
            <div class="ops-container">
                <div class="${resultClass} result">${resultSymbol} ${resultText}</div>
                ${detalle}
            </div>
        `;
    });

    output += `
        <p>Nombre del jugador: ${nameJugador}</p>
        <p>Puntaje: ${respOk} de ${trivia.length}</p>
        <p>Puntaje final: ${scorePercentage}%</p>
        <p>
            <button id="showResultsButton">Mostrar resultados</button>
        </p>
    `;

    resultsContainer.innerHTML = output;
    submitButton.style.display = 'none';
    showResultsButton.style.display = 'none';
    retryButton.style.display = 'block';
}
