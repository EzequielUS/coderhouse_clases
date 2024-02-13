// Como imitar la funcionalidad de los kwargs de Python, al instanciar una clase en JavaScript

// Objeto de opciones:
class Producto {
    constructor(options) {
        options = options || {};
        this.nombre = options.nombre || 'Producto';
        this.precio = options.precio || 0;
    }
}

// Uso de la clase Producto con un objeto de opciones
let producto1 = new Producto({ nombre: 'Camisa', precio: 20 });
console.log(producto1.nombre); // Salida: 'Camisa'
console.log(producto1.precio); // Salida: 20

// Si no se proporcionan opciones, se utilizan los valores predeterminados
let producto2 = new Producto();
console.log(producto2.nombre); // Salida: 'Producto'
console.log(producto2.precio); // Salida: 0



// Desestructuración de objetos:
class Producto {
    constructor(options) {
        const { nombre = 'Producto', precio = 0 } = options || {};
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Uso de la clase Producto con desestructuración de objetos
let producto1 = new Producto({ nombre: 'Camisa', precio: 20 });
console.log(producto1.nombre); // Salida: 'Camisa'
console.log(producto1.precio); // Salida: 20

// Si no se proporcionan opciones, se utilizan los valores predeterminados
let producto2 = new Producto();
console.log(producto2.nombre); // Salida: 'Producto'
console.log(producto2.precio); // Salida: 0



// Valores predeterminados:
class Producto {
    constructor(nombre = 'Producto', precio = 0) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Uso de la clase Producto con valores predeterminados
let producto1 = new Producto('Camisa', 20);
console.log(producto1.nombre); // Salida: 'Camisa'
console.log(producto1.precio); // Salida: 20

// Si no se proporcionan valores, se utilizan los valores predeterminados
let producto2 = new Producto();
console.log(producto2.nombre); // Salida: 'Producto'
console.log(producto2.precio); // Salida: 0
