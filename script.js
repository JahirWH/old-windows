// Variables globales
let ventanasActivas = new Set();
let indiceZ = 1000;

// Funcionalidad del reloj y calendario
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();

function reloj() {
    const relojCalendario = document.getElementById('relojCalendario');
    relojCalendario.style.display = relojCalendario.style.display === 'none' ? 'flex' : 'none';
}

function actualizarReloj() {
    const ahora = new Date();
    const horaString = ahora.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('reloj').textContent = horaString;
    document.getElementById('horaDigital').textContent = horaString;

    // Actualizar manecillas del reloj analógico
    const horas = ahora.getHours() % 12;
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    const manecillaHora = document.querySelector('.manecilla-hora');
    const manecillaMinuto = document.querySelector('.manecilla-minuto');
    const manecillaSegundo = document.querySelector('.manecilla-segundo');

    manecillaHora.style.transform = `rotate(${(horas * 30) + (minutos * 0.5)}deg)`;
    manecillaMinuto.style.transform = `rotate(${minutos * 6}deg)`;
    manecillaSegundo.style.transform = `rotate(${segundos * 6}deg)`;
}

function cambiarMes(delta) {
    mesActual += delta;
    if (mesActual > 11) {
        mesActual = 0;
        añoActual++;
    } else if (mesActual < 0) {
        mesActual = 11;
        añoActual--;
    }
    actualizarCalendario();
}

function actualizarCalendario() {
    const nombresMeses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    document.getElementById('mesAnio').textContent = `${nombresMeses[mesActual]} ${añoActual}`;

    const primerDia = new Date(añoActual, mesActual, 1);
    const ultimoDia = new Date(añoActual, mesActual + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const diaInicio = primerDia.getDay();

    const diasMes = document.getElementById('diasMes');
    diasMes.innerHTML = '';

    // Agregar días del mes anterior
    const ultimoDiaMesAnterior = new Date(añoActual, mesActual, 0).getDate();
    for (let i = diaInicio - 1; i >= 0; i--) {
        const dia = document.createElement('div');
        dia.className = 'dia otro-mes';
        dia.textContent = ultimoDiaMesAnterior - i;
        diasMes.appendChild(dia);
    }

    // Agregar días del mes actual
    const hoy = new Date();
    for (let i = 1; i <= diasEnMes; i++) {
        const dia = document.createElement('div');
        dia.className = 'dia';
        if (i === hoy.getDate() && mesActual === hoy.getMonth() && añoActual === hoy.getFullYear()) {
            dia.classList.add('actual');
        }
        dia.textContent = i;
        diasMes.appendChild(dia);
    }

    // Agregar días del mes siguiente
    const diasRestantes = 42 - (diaInicio + diasEnMes);
    for (let i = 1; i <= diasRestantes; i++) {
        const dia = document.createElement('div');
        dia.className = 'dia otro-mes';
        dia.textContent = i;
        diasMes.appendChild(dia);
    }
}

// Inicializar el calendario
actualizarCalendario();

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

// --- Explorador de archivos ---

const sistemaArchivos = {
    'Mi PC': {
        tipo: 'carpeta',
        icono: 'img/ocup/computer-0.png',
        contenido: {
            'Disco C:': {
                tipo: 'carpeta',
                icono: 'img/ocup/hard_disk_drive-0.png',
                contenido: {
                    'Windows': { tipo: 'carpeta', icono: 'img/ocup/directory_closed-0.png', contenido: {
                        'System32': { tipo: 'carpeta', icono: 'img/ocup/directory_closed-0.png', contenido: {} },
                        'notepad.exe': { tipo: 'archivo', icono: 'img/ocup/notepad-0.png' },
                    } },
                    'Archivos de programa': { tipo: 'carpeta', icono: 'img/ocup/directory_closed-0.png', contenido: {} },
                    'Usuarios': { tipo: 'carpeta', icono: 'img/ocup/directory_closed-0.png', contenido: {
                        'Usuario': { tipo: 'carpeta', icono: 'img/ocup/directory_closed-0.png', contenido: {
                            'Documentos': { tipo: 'carpeta', icono: 'img/ocup/directory_open_file_mydocs-0.png', contenido: {} },
                            'Imágenes': { tipo: 'carpeta', icono: 'img/ocup/image_old_jpeg-0.png', contenido: {} },
                        } }
                    } },
                    'autoexec.bat': { tipo: 'archivo', icono: 'img/ocup/ms_dos-0.png' },
                }
            },
            'Disco D:': { tipo: 'carpeta', icono: 'img/ocup/hard_disk_drive-0.png', contenido: {} },
            'Panel de control': { tipo: 'carpeta', icono: 'img/ocup/settings_gear-0.png', contenido: {} },
            'Red': { tipo: 'carpeta', icono: 'img/ocup/network_cool_two_pcs-0.png', contenido: {} },
        }
    },
    'Escritorio': { tipo: 'carpeta', icono: 'img/ocup/desktop-0.png', contenido: {} },
    'Documentos': { tipo: 'carpeta', icono: 'img/ocup/directory_open_file_mydocs-0.png', contenido: {} },
    'Descargas': { tipo: 'carpeta', icono: 'img/ocup/download.png', contenido: {} },
    'Imágenes': { tipo: 'carpeta', icono: 'img/ocup/image_old_jpeg-0.png', contenido: {} },
    'Música': { tipo: 'carpeta', icono: 'img/ocup/file_blue_grad_paint-0.png', contenido: {} },
    'Videos': { tipo: 'carpeta', icono: 'img/ocup/video_-0.png', contenido: {} },
};

let rutaActual = ['Mi PC'];
let historialRutas = [];

function abrirVentana(idVentana) {
    if (idVentana === 'miPC') {
        document.getElementById('exploradorArchivos').style.display = 'block';
        document.getElementById('exploradorArchivos').style.zIndex = ++indiceZ;
        ventanasActivas.add('exploradorArchivos');
        actualizarBarraTareas();
        renderizarExplorador();
        return;
    }
    const ventana = document.getElementById(idVentana);
    if (ventana) {
        ventana.style.display = 'block';
        ventana.style.zIndex = ++indiceZ;
        ventanasActivas.add(idVentana);
        actualizarBarraTareas();
    }
}

function renderizarExplorador() {
    const panel = document.getElementById('panelPrincipal');
    const ruta = [...rutaActual];
    let actual = sistemaArchivos;
    for (const parte of ruta) {
        actual = actual[parte]?.contenido || {};
    }
    panel.innerHTML = '';
    for (const nombre in actual) {
        const item = actual[nombre];
        const div = document.createElement('div');
        div.className = 'item-explorador';
        div.onclick = () => {
            if (item.tipo === 'carpeta') {
                historialRutas.push([...rutaActual]);
                rutaActual.push(nombre);
                renderizarExplorador();
                actualizarRutaExplorador();
            }
        };
        const icono = document.createElement('img');
        if (item.icono) {
            icono.src = item.icono;
        } else if (item.tipo === 'carpeta') {
            icono.src = 'https://win98icons.alexmeub.com/icons/png/folder-2.png';
        } else {
            icono.src = 'https://win98icons.alexmeub.com/icons/png/file-2.png';
        }
        icono.alt = item.tipo;
        div.appendChild(icono);
        const nombreDiv = document.createElement('div');
        nombreDiv.className = 'nombre-item';
        nombreDiv.textContent = nombre;
        div.appendChild(nombreDiv);
        panel.appendChild(div);
    }
    actualizarRutaExplorador();
}

function actualizarRutaExplorador() {
    document.getElementById('rutaExplorador').textContent = rutaActual.join(' / ');
}

function volverAtras() {
    if (historialRutas.length > 0) {
        rutaActual = historialRutas.pop();
        renderizarExplorador();
        actualizarRutaExplorador();
    }
}

function abrirRuta(nombre) {
    if (sistemaArchivos[nombre]) {
        historialRutas.push([...rutaActual]);
        rutaActual = [nombre];
        renderizarExplorador();
        actualizarRutaExplorador();
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

// Menú contextual del escritorio al dar click 
const menuContextual = document.getElementById('menuContextual');
const escritorio = document.querySelector('.escritorio');

escritorio.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    menuContextual.style.display = 'block';
    menuContextual.style.left = e.pageX + 'px';
    menuContextual.style.top = e.pageY + 'px';
});

document.addEventListener('click', function(e) {
    if (!menuContextual.contains(e.target)) {
        menuContextual.style.display = 'none';
    }
}); 