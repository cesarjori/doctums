class Evento {
    constructor(nivel, eficiencia) {
        this.nivel = nivel;
        this.eficiencia = eficiencia;
    }

    resolverEvento(jugador) {
        const fortaleza = jugador.eficiencias[this.eficiencia];
        const resultadoDados = lanzarDados(this.nivel);
        if (resultadoDados <= fortaleza) {
            console.log(`${jugador.nombre} superó el evento!`);
        } else {
            console.log(`${jugador.nombre} falló el evento!`);
        }
    }
}

function lanzarDados(numDados) {
    let total = 0;
    for (let i = 0; i < numDados; i++) {
        total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
}
