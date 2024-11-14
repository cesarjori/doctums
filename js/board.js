const boardContainer = document.getElementById('game-board');
const rows = 10;
const columns = 10;

for (let i = 0; i < rows * columns; i++) {
    const cell = document.createElement('div');
    cell.innerText = i + 1; // Puedes cambiar el contenido de la celda según necesites
    boardContainer.appendChild(cell);
}


function obtenerCasilla(posicion) {
    // Asegúrate de que la posición no exceda el tamaño del tablero
    if (posicion >= 1 && posicion <= tablero.length) {
        return tablero[posicion - 1]; // Restamos 1 porque los arrays empiezan en 0
    } else {
        console.error('Posición fuera del tablero: ', posicion);
        return null; // Devuelve null si la posición es inválida
    }
}

function lanzarDados(numDados) {
    let total = 0;
    let resultadosDados = [];

    for (let i = 0; i < numDados; i++) {
        const resultado = Math.floor(Math.random() * 6) + 1; // Dado de 1 a 6
        total += resultado;
        resultadosDados.push(resultado); // Guardar el resultado de cada dado
    }

    // Actualizar las imágenes de los dados según los resultados
    actualizarImagenesDados(resultadosDados);

    return total;
}

function actualizarImagenesDados(resultados) {
    for (let i = 0; i < resultados.length; i++) {
        const dadoNumero = resultados[i];
        const dadoImagen = document.getElementById(`dice-image-${i+1}`);
        dadoImagen.src = `assets/dado${dadoNumero}.png`; // Cambiar la imagen del dado
        dadoImagen.alt = `Dado ${dadoNumero}`; // Actualizar el texto alternativo
    }
}


