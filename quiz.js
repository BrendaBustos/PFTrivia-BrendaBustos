let nameJugador;
let regularPreg = 0;
let respOk = 0;
let respSelect = [];
let trivia = [];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submitButton');
const startButton = document.getElementById('startButton');
const retryButton = document.getElementById('retryButton');
const messageContainer = document.getElementById('message');
const nameInputContainer = document.getElementById('nameInputContainer');
const nameInput = document.getElementById('nameInput');

// Cargar preguntas de trivia desde JSON
fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        trivia = data;
        if (localStorage.getItem('nameJugador')) {
            nameJugador = localStorage.getItem('nameJugador');
            startButton.style.display = 'none';
            nameInputContainer.style.display = 'none';
            quizContainer.style.display = 'block';
            submitButton.style.display = 'block';
            showNextPreg();
        }
    })
    .catch(error => console.error('Error al cargar preguntas:', error));

startButton.addEventListener('click', () => {
    const nameInputValue = nameInput.value.trim();
    if (!nameInputValue) {
        showMessage("Debes ingresar un nombre para continuar.");
        return;
    }

    nameJugador = nameInputValue;
    localStorage.setItem('nameJugador', nameJugador);

    startButton.style.display = 'none';
    nameInputContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';

    showNextPreg();
});

submitButton.addEventListener('click', () => {
    const regular = trivia[regularPreg];
    const acierto = respSelect[regularPreg];

    if (!acierto) {
        showMessage("Por favor, selecciona una respuesta antes de continuar.");
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
});

retryButton.addEventListener('click', () => {
    regularPreg = 0;
    respOk = 0;
    respSelect = [];
    localStorage.removeItem('nameJugador');
    nameInputContainer.style.display = 'block';
    nameInput.value = '';
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    resultsContainer.innerHTML = '';
});

function showMessage(message) {
    messageContainer.innerText = message;
    messageContainer.style.display = 'block';
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
    retryButton.style.display = 'block';

    showMessage("Finalizar trivia");

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
