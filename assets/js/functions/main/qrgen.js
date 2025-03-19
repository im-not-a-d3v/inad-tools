function generateQRCode() {
    const text = document.getElementById("text").value;

    if (text.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please enter a valid text or URL.',
        });
        return;
    }

    // Crear una alerta de SweetAlert2 con el código QR
    Swal.fire({
        title: 'You QR code',
        html: `
                        <p>Texto/URL: ${text}</p>
                        <div id="qrcode-alert"></div>
                    `,
        showConfirmButton: true,
        confirmButtonText: 'Close',
        didOpen: () => {
            // Generar el código QR dentro de la alerta
            new QRCode(document.getElementById("qrcode-alert"), {
                text: text,
                width: 200,
                height: 200
            });
        }
    });
}

// Función para limpiar el input y el contenedor del QR
function clearInput() {
    document.getElementById("text").value = ""; // Limpiar el input
    document.getElementById("qrcode").innerHTML = ""; // Limpiar el código QR generado (si hubiese)
}