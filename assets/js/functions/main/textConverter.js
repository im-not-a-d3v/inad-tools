
// Función para actualizar la cantidad de caracteres, palabras, oraciones y líneas
function actualizarCantidadCaracteresPalabrasOracionesLineas() {
    const textArea = document.getElementById("inputText");
    const contadorCaracteres = document.getElementById("cantidadCaracteres");
    const contadorPalabras = document.getElementById("cantiPalabras");
    const contadorOraciones = document.getElementById("cantidadOraciones");
    const contadorLineas = document.getElementById("cantidadLineas");

    // Contar caracteres
    contadorCaracteres.textContent = "Character Count: " + textArea.value.length + " | ";

    // Contar palabras (remueve espacios extras y cuenta solo palabras)
    const palabras = textArea.value.trim().split(/\s+/).filter(word => word.length > 0);
    contadorPalabras.textContent = "Word Count: " + palabras.length + " | ";

    // Contar oraciones (basado en los delimitadores de oración como ".", "!" y "?")
    const oraciones = textArea.value.split(/[.!?]+/).filter(oracion => oracion.trim().length > 0);
    contadorOraciones.textContent = "Sentence Count: " + oraciones.length + " | ";

    // Contar líneas (basado en los saltos de línea '\n')
    const lineas = textArea.value.split(/\n/).filter(linea => linea.trim().length > 0);
    contadorLineas.textContent = "Line Count: " + lineas.length + "";
}

// Función para insertar el texto "Lorem ipsum"
function insertarLoremIpsum() {
    const textArea = document.getElementById("inputText");
    textArea.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut maximus enim, sit amet volutpat dui. Nullam tincidunt erat sit amet ullamcorper fringilla. Nunc auctor elementum magna, in condimentum neque. Ut id nulla nulla. Integer placerat cursus tortor, vel faucibus sem euismod non. Etiam erat neque, maximus eu pellentesque ac, fermentum sit amet felis. Nunc urna nibh, dignissim nec iaculis eu, volutpat cursus arcu. Aliquam erat volutpat. Cras vulputate eleifend volutpat. Vestibulum et turpis nibh. Duis accumsan metus at commodo lobortis. Nullam faucibus varius sollicitudin.";
}

// Asocia el evento click del botón lorem-btn a la función insertarLoremIpsum
const loremBtn = document.getElementById("lorem-btn");
loremBtn.addEventListener('click', insertarLoremIpsum);

// Detecta el evento de entrada de texto
const textArea = document.getElementById("inputText");
textArea.addEventListener('input', actualizarCantidadCaracteresPalabrasOracionesLineas);

// Función para convertir texto a mayúsculas
function convertToUppercase() {
    textArea.value = textArea.value.toUpperCase();
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

// Función para convertir texto a minúsculas
function convertToLowercase() {
    textArea.value = textArea.value.toLowerCase();
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

// Función para capitalizar cada palabra
function convertToCapitalized() {
    var words = textArea.value.split(" ");
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    textArea.value = words.join(" ");
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

function capitalizeFirstAndAfterPeriod() {
    let text = textArea.value.toLowerCase();
    // Capitalizar la primera letra del texto
    text = text.charAt(0).toUpperCase() + text.slice(1);

    // Capitalizar después de los puntos
    text = text.replace(/([.!?]\s*)([a-z])/g, function (match, separator, char) {
        return separator + char.toUpperCase();
    });

    textArea.value = text;
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

function convertToAlternatingCase() {
    let text = textArea.value;
    let newText = '';

    // Alternar entre mayúsculas y minúsculas
    for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
            newText += text.charAt(i).toLowerCase();
        } else {
            newText += text.charAt(i).toUpperCase();
        }
    }

    textArea.value = newText;
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

// Función para eliminar espacios extra
function removeExtraSpaces() {
    let text = textArea.value;
    // Elimina los espacios al inicio, al final y convierte múltiples espacios en uno solo
    text = text.replace(/\s+/g, ' ').trim();
    textArea.value = text;
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}


function downloadText() {
    // Obtener el contenido del textarea
    const text = document.getElementById('inputText').value;

    // Crear un blob con el contenido en formato de texto
    const blob = new Blob([text], { type: 'text/plain' });

    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'textContent.txt'; // Nombre del archivo

    // Simular el clic en el enlace para iniciar la descarga
    link.click();

    // Liberar el objeto URL creado
    URL.revokeObjectURL(link.href);
}

// Asignar el evento de clic al botón download-btn
const downloadBtn = document.getElementById('download-btn');
downloadBtn.addEventListener('click', downloadText);

// Función para copiar el texto al portapapeles
function copiarTexto() {
    if (textArea.value.trim() === "") {
        mostrarMensaje("No hay contenido para copiar.", "danger"); // Muestra el mensaje de error
    } else {
        textArea.select(); // Selecciona el texto del textarea
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                mostrarMensaje("Texto copiado al portapapeles con éxito.", "success"); // Muestra el mensaje de éxito
            })
            .catch(err => {
                mostrarMensaje("Error al copiar el texto.", "danger"); // Muestra el mensaje de error
                console.error('Error al copiar el texto: ', err);
            });
    }
}

// Función para limpiar el textarea
function limpiarTextArea() {
    textArea.value = '';
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

// Evento para botón limpiar
const limpiarBtn = document.getElementById('limpiar-btn');
limpiarBtn.addEventListener('click', limpiarTextArea);

// Evento para botón copiar
const copiarBtn = document.getElementById('copiar-btn');
copiarBtn.addEventListener('click', copiarTexto);

// Actualiza el contador al cargar la página
actualizarCantidadCaracteresPalabrasOracionesLineas();