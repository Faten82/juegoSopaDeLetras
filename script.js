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
        const orientacion = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical, 2: diagonal ascendente, 3: diagonal descendente
        const fila = Math.floor(Math.random() * gridSize);
        const columna = Math.floor(Math.random() * gridSize);

        if (orientacion === 0 && columna + palabra.length <= gridSize) { // Horizontal
            if (puedeColocarHorizontal(fila, columna, palabra)) {
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila][columna + i] = palabra[i];
                }
        } else if (orientacion === 1 && fila + palabra.length <= gridSize) { // Vertical
            if (puedeColocarVertical(fila, columna, palabra)) {
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila + i][columna] = palabra[i];
                }
       } else if (orientacion === 2) { // Diagonal Descendente
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila + i][columna + i] = palabra[i];
                }
            } else if (orientacion === 3) { // Diagonal Ascendente
                for (let i = 0; i < palabra.length; i++) {
                    grid[fila - i][columna + i] = palabra[i];
                }
            }
            colocado = true;
            }
        }
    }
    
// Función para colocar todas las palabras en la cuadrícula
function colocarPalabras() {
    palabras.forEach(palabra => {
        colocarPalabraEnCuadricula(palabra);
    });
}
// Initialize empty grid
for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
        grid[i][j] = '';
    }
}
// Añadir evento al botón "Rendirse"
document.getElementById('botonRendirse').addEventListener('click', () => {
    mostrarPalabrasOcultas();
});

document.getElementById('botonReiniciar').addEventListener('click', () => {
    document.getElementById('palabrasOcultas').style.display = 'none'; // Ocultar palabras ocultas
    inicializarJuego(); // Reiniciar el juego
});

    // Llenar las celdas vacías restantes con letras aleatorias--Faten//
for (let i = 0; i < tamañoCuadricula; i++) {
    for (let j = 0; j < tamañoCuadricula; j++) {
        if (cuadricula[i][j] === '') {
            cuadricula[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
}
    // Inicializar el juego
function inicializarJuego() {
    seleccionarPalabras();
    inicializarCuadricula();
    colocarPalabras();

    // Completar el grid con letras aleatorias en espacios vacíos
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
      // Mostrar la cuadrícula
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.id = `cell-${i}-${j}`;
            cell.className = 'cell';
            cell.textContent = grid[i][j];
            cell.addEventListener('click', () => seleccionarCelda(i, j));
            gridElement.appendChild(cell);
        }
    }
}

// Ejecutar inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});
    
