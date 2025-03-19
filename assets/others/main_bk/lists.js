function actualizarCantidadCaracteresPalabrasOracionesLineas() {
    const textArea = document.getElementById("inputText");
    const textAreaOutput = document.getElementById("outputText");
    const contadorCaracteres = document.getElementById("cantidadCaracteres");
    const contadorPalabras = document.getElementById("cantiPalabras");
    const contadorOraciones = document.getElementById("cantidadOraciones");
    const contadorLineas = document.getElementById("cantidadLineas");

    contadorCaracteres.textContent = "Character Count: " + textArea.value.length + " | ";

    const palabras = textArea.value.trim().split(/\s+/).filter(word => word.length > 0);
    contadorPalabras.textContent = "Word Count: " + palabras.length + " | ";

    const oraciones = textArea.value.split(/[.!?]+/).filter(oracion => oracion.trim().length > 0);
    contadorOraciones.textContent = "Sentence Count: " + oraciones.length + " | ";

    const lineas = textArea.value.split(/\n/).filter(linea => linea.trim().length > 0);
    contadorLineas.textContent = "Line Count: " + lineas.length + "";
}

const textArea = document.getElementById("inputText");
textArea.addEventListener('input', actualizarCantidadCaracteresPalabrasOracionesLineas);


function copiarTexto() {
    const textArea = document.getElementById("inputText");
    if (textArea.value.trim() === "") {
        Swal.fire({
            text: "There is no content to copy.",
            toast: true,
            position: 'bottom-left',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    } else {
        textArea.select();
        document.execCommand('copy');
        Swal.fire({
            text: "'Input' text copied to clipboard.",
            toast: true,
            position: 'bottom-left',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }
}

function copiarTextoOutput() {
    const textAreaOutput = document.getElementById("outputText");
    if (textAreaOutput.value.trim() === "") {
        Swal.fire({
            text: "There is no content to copy.",
            toast: true,
            position: 'bottom-left',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    } else {
        textAreaOutput.select();
        document.execCommand('copy');
        Swal.fire({
            text: "'Output' text copied to clipboard.",
            toast: true,
            position: 'bottom-left',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    }
}

function clearTextArea() {
    document.getElementById("inputText").value = '';
    document.getElementById("outputText").value = '';
    actualizarCantidadCaracteresPalabrasOracionesLineas();
}

function aleatorizarLista() {
    const textInput = document.getElementById("inputText").value;
    const lista = textInput.split(/\n/).filter(linea => linea.trim().length > 0);

    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    document.getElementById("outputText").value = lista.join("\n");
}

function ordenarAZ() {
    const textInput = document.getElementById("inputText").value;
    const lista = textInput.split(/\n/).filter(linea => linea.trim().length > 0);

    lista.sort();

    document.getElementById("outputText").value = lista.join("\n");
}

// Función para ordenar de Z-A
function ordenarZA() {
    const textInput = document.getElementById("inputText").value;
    const lista = textInput.split(/\n/).filter(linea => linea.trim().length > 0);

    lista.sort().reverse();

    document.getElementById("outputText").value = lista.join("\n");
}

// Eventos de botones
document.getElementById('clear-btn').addEventListener('click', clearTextArea);
document.getElementById('copy-btn').addEventListener('click', copiarTexto);
document.getElementById('random').addEventListener('click', aleatorizarLista); // Aleatorizar lista
document.getElementById('a-z').addEventListener('click', ordenarAZ); // Ordenar A-Z
document.getElementById('z-a').addEventListener('click', ordenarZA); // Ordenar Z-A

document.getElementById('copy-output-btn').addEventListener('click', copiarTextoOutput);

actualizarCantidadCaracteresPalabrasOracionesLineas();