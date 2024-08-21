//empiezo con array de palabras
//escogi palabras relacionadas con programacion
const todasLasPalabras = [
    "JAVASCRIPT", "VARIABLE", "FUNCION", "ARRAY", "OBJETO", "LOOP", "CODIGO", "CLASE", 
    "HTML", "CSS", "API", "DEBUG", "BROWSER", "SERVER", "CLIENTE", "ALGORITMO", "FRAMEWORK", 
    "REPOSITORIO", "GIT", "JAVA", "PYTHON", "NODE", "REACT", "ANGULAR", "SQL", "DATABASE", 
    "LOOPING", "SCRIPT", "FUNCTION", "CLASS", "METHOD", "PARAMETER", "RETURN", "EXCEPTION", 
    "CONSOLE", "QUERY", "AJAX", "ASYNCHRONOUS", "PROMISE", "EVENT", "DEBUGGER", "VARIABLES", 
    "OBJECTS", "PROTOTYPE", "MODULE", "PACKAGE", "COMPILER", "INTERPRETER", "CONSTRUCTOR"
];
const gridSize = 14;
let grid = [];
let palabras = [];
let seleccion = [];
// Función para seleccionar un subconjunto aleatorio de palabras
function seleccionarPalabras() {
    const numPalabras = 10; // Número de palabras a colocar en la sopa de letras
    palabras = [];
    const palabrasDisponibles = todasLasPalabras.slice(); // Copia el array usando slice()
    for (let i = 0; i < numPalabras; i++) {
        const index = Math.floor(Math.random() * palabrasDisponibles.length);
        palabras.push(palabrasDisponibles.splice(index, 1)[0]);
    }
}
// Inicializar la cuadrícula con letras aleatorias
function inicializarCuadricula() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
}

// Función para colocar una palabra en la cuadrícula// FATEN //
function colocarPalabraEnCuadricula(palabra) {
    let colocado = false;
    while (!colocado) {
        const orientacion = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
        const fila = Math.floor(Math.random() * gridSize);
        const columna = Math.floor(Math.random() * gridSize);

        if (orientacion === 0 && columna + palabra.length <= gridSize) { // Horizontal
            if (puedeColocarHorizontal(fila, columna, palabra)) {
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila][columna + i] = palabra[i];
                }
                colocado = true;
            }
        } else if (orientacion === 1 && fila + palabra.length <= gridSize) { // Vertical
            if (puedeColocarVertical(fila, columna, palabra)) {
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila + i][columna] = palabra[i];
                }
                colocado = true;
            }
        }
    }
}
