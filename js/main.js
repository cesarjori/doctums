document.addEventListener("DOMContentLoaded", function () { 
    crearTablero();
});

// Función para crear el tablero con 362 casillas
function crearTablero() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 1; i <= 362; i++) {
        const casilla = document.createElement('div');
        casilla.classList.add('celda');
        if (i % 7 !== 6 && i % 7 !== 0) {
            const eventLevel = Math.floor(Math.random() * 6) + 1;
            casilla.classList.add(`event-level-${eventLevel}`);
            casilla.dataset.level = eventLevel;
        }
        gameBoard.appendChild(casilla);
    }
}

const jugador1 = { posicion: 0, presupuesto: 5000 };

document.getElementById('roll-dice').addEventListener('click', () => {
    const posiciones = lanzarDados(5);
    moverJugador(posiciones);
});

function toggleSound() {
    const soundIcon = document.getElementById('sound-icon');
    const currentSrc = soundIcon.src;
    soundIcon.src = currentSrc.includes('sound-off.png') ? 'assets/pngwing.com.png' : 'assets/dr.png';
}

function showInstructions() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('rules-section').style.display = 'block';
}

function hideRules() {
    document.getElementById('rules-section').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

function showPlayers() {
    document.getElementById('main-menu').style.visibility = 'hidden';
    document.getElementById('players-section').style.visibility = 'visible';
}

function hidePlayers() {
    document.getElementById('players-section').style.visibility = 'hidden';
    document.getElementById('main-menu').style.visibility = 'visible';
}

function startGame() {
    const numPlayers = document.getElementById('num-players').value;
    window.numPlayers = numPlayers;
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    iniciarJuego(numPlayers);
}

function iniciarJuego(numPlayers) {
    alert(`Juego iniciado con ${numPlayers} jugador(es)`);
}

document.getElementById('roll-dice').addEventListener('click', () => {
    const diceImages = document.querySelectorAll('#dice-container img');
    diceImages.forEach(img => img.classList.add('roll-animation'));

    setTimeout(() => {
        const posiciones = lanzarDados(5);
        jugador1.posicion += posiciones;
        jugador1.presupuesto += posiciones * 10;

        actualizarEstadoJugador();
        diceImages.forEach(img => img.classList.remove('roll-animation'));
    }, 500);
});

function lanzarDados(numDados) {
    let total = 0;
    let resultadosDados = [];

    for (let i = 0; i < numDados; i++) {
        const resultado = Math.floor(Math.random() * 6) + 1;
        total += resultado;
        resultadosDados.push(resultado);
    }

    actualizarImagenesDados(resultadosDados);
    return total;
}

function moverJugador(posiciones) {
    jugador1.posicion += posiciones;
    if (jugador1.posicion >= 362) jugador1.posicion = 361;

    actualizarEstadoJugador();

    const casillaActual = document.querySelector(`#game-board .celda:nth-child(${jugador1.posicion + 1})`);
    if (casillaActual && casillaActual.dataset.level) {
        mostrarEvento(casillaActual.dataset.level);
    }
}

function mostrarEvento(level) {
    const eventPanel = document.getElementById('event-panel');
    if (eventPanel) eventPanel.style.display = 'block';

    document.getElementById('event-description').textContent = `Enfrentas un evento de nivel ${level}`;
    document.getElementById('event-level').textContent = level;
    document.getElementById('event-result').textContent = '';
}

function resolveEvent() {
    const eventLevel = parseInt(document.getElementById('event-level').textContent);
    const exito = Math.random() < 0.5;

    if (exito) {
        jugador1.presupuesto += eventLevel * 100;
        document.getElementById('event-result').textContent = '¡Éxito! Presupuesto aumentado.';
    } else {
        jugador1.presupuesto -= eventLevel * 100;
        document.getElementById('event-result').textContent = 'Fracaso. Presupuesto reducido.';
    }

    actualizarEstadoJugador();
    document.getElementById('event-panel').style.display = 'none';
}

function actualizarImagenesDados(resultados) {
    resultados.forEach((resultado, i) => {
        const dadoImagen = document.getElementById(`dice-image-${i + 1}`);
        if (dadoImagen) {
            dadoImagen.src = `assets/d${resultado}.png`;
        }
    });
}

function actualizarEstadoJugador() {
    document.getElementById('posicion-jugador').textContent = jugador1.posicion;
    document.getElementById('presupuesto-jugador').textContent = jugador1.presupuesto;
}
