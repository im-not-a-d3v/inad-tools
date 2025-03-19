// Función para copiar texto del textarea de entrada
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
        navigator.clipboard.writeText(textArea.value)
            .then(() => {
                Swal.fire({
                    text: "'Input' text copied to clipboard.",
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            })
            .catch(() => {
                Swal.fire({
                    text: "Failed to copy text.",
                    toast: true,
                    position: 'bottom-left',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            });
    }
}

// Función para copiar texto del textarea de salida
function copiarTextoOutput() {
    const outputTextArea = document.getElementById("outputText");
    const textToCopy = outputTextArea.innerText;
    if (textToCopy.trim() === "") {
        Swal.fire({
            text: "There is no content to copy in output.",
            toast: true,
            position: 'bottom-left',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    } else {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                Swal.fire({
                    text: "'Output' text copied to clipboard.",
                    toast: true,
                    position: 'bottom-left',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            })
            .catch(() => {
                Swal.fire({
                    text: "Failed to copy text.",
                    toast: true,
                    position: 'bottom-left',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
            });
    }
}

// Función para limpiar los textareas
function clearTextArea() {
    document.getElementById("inputText").value = '';
    document.getElementById("outputText").innerHTML = '';
}

function replaceText() {
    const inputText = document.getElementById("inputText").value;
    const searchText = document.getElementById("searchText").value;
    const replaceText = document.getElementById("remplaceText").value;

    if (searchText.trim() === "") {
        Swal.fire({
            text: "Please enter a word to search for.",
            toast: true,
            position: 'bottom-left',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
        return;
    }

    // Expresión regular para buscar todas las ocurrencias (caso sensible)
    const regex = new RegExp(searchText, 'g');

    // Contar el número de ocurrencias que coinciden
    const matches = inputText.match(regex);
    const occurrences = matches ? matches.length : 0;

    // Reemplazamos las palabras y envolvemos las reemplazadas en <mark> con color personalizado
    const output = inputText.replace(regex, `<mark style="background-color: #ffa500;">${replaceText}</mark>`);
    document.getElementById("outputText").innerHTML = output;

    // Mostrar la cantidad de ocurrencias reemplazadas
    document.getElementById("occurrencesReplaceNum").innerText = occurrences;
}


// Eventos de botones
document.getElementById('clear-btn').addEventListener('click', clearTextArea);
document.getElementById('copy-btn').addEventListener('click', copiarTexto);
document.getElementById('copy-output-btn').addEventListener('click', copiarTextoOutput);
document.getElementById('replaceBtn').addEventListener('click', replaceText);