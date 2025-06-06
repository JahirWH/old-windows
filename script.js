// Variables globales
let ventanasActivas = new Set();
let indiceZ = 1000;

// Función para actualizar el reloj
function actualizarReloj() {
    const ahora = new Date();
    const horaString = ahora.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('reloj').textContent = horaString;
}

// Actualizar el reloj cada segundo
setInterval(actualizarReloj, 1000);
actualizarReloj();

// Función para alternar el menú de inicio
function alternarMenuInicio() {
    const menuInicio = document.getElementById('menuInicio');
    menuInicio.style.display = menuInicio.style.display === 'none' ? 'block' : 'none';
}

// Cerrar el menú de inicio al hacer clic fuera
document.addEventListener('click', (e) => {
    const menuInicio = document.getElementById('menuInicio');
    const botonInicio = document.querySelector('.boton-inicio');
    
    if (!menuInicio.contains(e.target) && !botonInicio.contains(e.target)) {
        menuInicio.style.display = 'none';
    }
});

// Función para abrir una ventana
function abrirVentana(idVentana) {
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        ventana.style.display = 'block';
        ventana.style.zIndex = ++indiceZ;
        ventanasActivas.add(idVentana);
        actualizarBarraTareas();
    }
}

// Función para cerrar una ventana
function cerrarVentana(idVentana) {
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        ventana.style.display = 'none';
        ventanasActivas.delete(idVentana);
        actualizarBarraTareas();
    }
}

// Función para minimizar una ventana
function minimizarVentana(idVentana) {
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        ventana.style.display = 'none';
        actualizarBarraTareas();
    }
}

// Función para maximizar una ventana
function maximizarVentana(idVentana) {
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        if (ventana.style.width === '100%') {
            ventana.style.width = '600px';
            ventana.style.height = 'auto';
            ventana.style.top = '50%';
            ventana.style.left = '50%';
            ventana.style.transform = 'translate(-50%, -50%)';
        } else {
            ventana.style.width = '100%';
            ventana.style.height = 'calc(100vh - 28px)';
            ventana.style.top = '0';
            ventana.style.left = '0';
            ventana.style.transform = 'none';
        }
    }
}

// Función para actualizar la barra de tareas
function actualizarBarraTareas() {
    const programasActivos = document.getElementById('programasActivos');
    programasActivos.innerHTML = '';
    
    ventanasActivas.forEach(idVentana => {
        const boton = document.createElement('div');
        boton.className = 'programa-activo';
        boton.textContent = obtenerTituloVentana(idVentana);
        boton.onclick = () => {
            const ventana = document.getElementById(idVentana);
            if (ventana.style.display === 'none') {
                ventana.style.display = 'block';
                ventana.style.zIndex = ++indiceZ;
            } else {
                ventana.style.zIndex = ++indiceZ;
            }
        };
        programasActivos.appendChild(boton);
    });
}

// Función para obtener el título de la ventana
function obtenerTituloVentana(idVentana) {
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        const elementoTitulo = ventana.querySelector('.texto-titulo');
        return elementoTitulo ? elementoTitulo.textContent : idVentana;
    }
    return idVentana;
}

// Hacer las ventanas arrastrables
document.querySelectorAll('.ventana').forEach(ventana => {
    const barraTitulo = ventana.querySelector('.barra-titulo');
    let arrastrando = false;
    let posXActual;
    let posYActual;
    let posXInicial;
    let posYInicial;
    let offsetX = 0;
    let offsetY = 0;

    barraTitulo.addEventListener('mousedown', iniciarArrastre);
    document.addEventListener('mousemove', arrastrar);
    document.addEventListener('mouseup', finalizarArrastre);

    function iniciarArrastre(e) {
        posXInicial = e.clientX - offsetX;
        posYInicial = e.clientY - offsetY;

        if (e.target === barraTitulo || barraTitulo.contains(e.target)) {
            arrastrando = true;
            ventana.style.zIndex = ++indiceZ;
        }
    }

    function arrastrar(e) {
        if (arrastrando) {
            e.preventDefault();
            posXActual = e.clientX - posXInicial;
            posYActual = e.clientY - posYInicial;

            offsetX = posXActual;
            offsetY = posYActual;

            establecerPosicion(posXActual, posYActual, ventana);
        }
    }

    function finalizarArrastre() {
        posXInicial = posXActual;
        posYInicial = posYActual;
        arrastrando = false;
    }

    function establecerPosicion(xPos, yPos, elemento) {
        elemento.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
});

// Funcionalidad básica de la calculadora
document.querySelectorAll('.botones-calculadora button').forEach(boton => {
    boton.addEventListener('click', () => {
        const pantalla = document.querySelector('.pantalla-calculadora');
        const valor = boton.textContent;
        
        if (valor === '=') {
            try {
                pantalla.textContent = eval(pantalla.textContent);
            } catch (e) {
                pantalla.textContent = 'Error';
            }
        } else {
            if (pantalla.textContent === '0' || pantalla.textContent === 'Error') {
                pantalla.textContent = valor;
            } else {
                pantalla.textContent += valor;
            }
        }
    });
}); 