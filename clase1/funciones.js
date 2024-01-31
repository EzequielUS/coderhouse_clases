// Varaibles
let valor = 1
const CONSTANTE = 'GL'

// Funciones

// Declaración de función:
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("John")); // Output: Hello, John!

// Expresión de función:
var greet = function(name) {
    return "Hello, " + name + "!";
};

console.log(greet("John")); // Output: Hello, John!

// Función de flecha:
var greet = (name) => {
    return "Hello, " + name + "!";
};

console.log(greet("John")); // Output: Hello, John!

// La función flecha permite un return implícito, lo cual permite utilizar instrucciones sin llaves. Esto sólo es posible si la función tiene una instrucción. Verás muchas de estas en un ambiente laboral.

// Si la función flecha sólo tiene un argumento, no es necesario encerrar el parámetro en un paréntesis. Esto sólo es necesario al utilizar dos argumentos o más.


// Template String
const name = "John";
const age = 30;

// Usando template strings para combinar variables dentro de una cadena de texto
const message = `Hello, my name is ${name} and I am ${age} years old.`;

console.log(message); // Output: Hello, my name is John and I am 30 years old.


// Implementación de una clase
class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        console.log(`Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`);
    }

    static cantidadPersonas = 0; // Variable estática

    static contarPersonas() {
        console.log(`Hay ${Persona.cantidadPersonas} personas.`);
    }
}

// Crear una instancia de la clase Persona
const persona1 = new Persona("Juan", 25);
const persona2 = new Persona("María", 30);

// Llamar al método saludar de la instancia persona1
persona1.saludar(); // Output: Hola, mi nombre es Juan y tengo 25 años.

// Incrementar la cantidad de personas
Persona.cantidadPersonas++;

// Llamar al método contarPersonas de la clase Persona
Persona.contarPersonas(); // Output: Hay 1 personas.
