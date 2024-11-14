class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.posicion = 0; // Empieza en la casilla de salida
        this.presupuesto = 5000;
        this.eficiencias = {
            sistemaGobierno: 0,
            conocimientoNegocio: 0,
            // Otras eficiencias...
        };
        this.productos = [];
        this.proyectos = [];
        this.recursos = [];
        this.posicion = 0;
    }

    mover(posiciones) {
        this.posicion += posiciones;
        if (this.posicion > 360) {
            this.posicion = 360;
        }
        
    }

    actualizarEficiencias(eficiencia, valor) {
        this.eficiencias[eficiencia] += valor;
    }

    comprarProducto(producto) {
        if (this.presupuesto >= producto.costo) {
            this.productos.push(producto);
            this.presupuesto -= producto.costo;
            producto.efectos.forEach(ef => this.actualizarEficiencias(ef.eficiencia, ef.valor));
        }
    }
}
