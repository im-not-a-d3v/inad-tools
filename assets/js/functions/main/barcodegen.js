function generateBarcode() {
    var input = document.getElementById('barcodeInput').value;
    var displayValue = document.getElementById('displayValueCheckbox').checked;
    var size = document.getElementById('sizeSelect').value.split('x');
    var height = size[0];
    var width = size[1];
    var color = document.getElementById('colorSelect').value;

    // Generar el código de barras en el canvas
    JsBarcode("#barcode", input, {
        format: "CODE128",
        displayValue: displayValue,
        height: parseInt(height),
        width: parseInt(width),
        lineColor: color,
        background: "transparent" // Fondo transparente
    });
}

function downloadBarcode() {
    var canvas = document.getElementById('barcode');
    var pngFile = canvas.toDataURL("image/png");

    var link = document.createElement("a");
    link.href = pngFile;
    link.download = "barcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.onload = generateBarcode;