let myChart = null;

// Función para actualizar el input de color
function updateColorInput(selectId, colorPickerId) {
    const selectedColor = document.getElementById(selectId).value;
    document.getElementById(colorPickerId).value = selectedColor;
    generateChart();
}

function randomizeData() {
    // Lista de colores predefinidos
    const predefinedColors = ["#4bc0c0", "#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ff9800"];

    // Recorre las etiquetas y asigna valores aleatorios
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach(label => {
        const checkbox = document.getElementById(`checkChart${label}`);
        
        if (checkbox.checked) {
            // Asignar un valor aleatorio entre 0 y 100
            document.getElementById(`data${label}`).value = Math.floor(Math.random() * 101);
            
            // Asignar un color aleatorio de la lista de colores predefinidos
            const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];
            document.getElementById(`color${label}`).value = randomColor;

            // Mantener la opacidad fija en 1
            document.getElementById(`opacity${label}`).value = 1;
        }
    });

    // Actualizar el gráfico con los nuevos valores aleatorios
    generateChart();
}


function resetChartConfig() {
    document.getElementById('chartType').value = 'bar';
    document.getElementById('tittleChartInput').value = '';
    document.getElementById('subTittleChartInput').value = '';
    document.getElementById('labelChartValue').value = '';
    document.getElementById('innerValue').value = '20';
    document.getElementById('colorInnerValue').value = '#000';

    // Reiniciar checkboxes
    document.getElementById('tittleDisable').checked = false;
    document.getElementById('subTittleDisable').checked = false;
    document.getElementById('labelDisable').checked = false;

    generateChart();
}

// Función para descargar el gráfico como PNG
// Función para descargar el gráfico como PNG
function downloadChart() {
    const originalCanvas = document.getElementById('myChart');
    const tempCanvas = document.createElement('canvas');
    const scaleFactor = 1;
    tempCanvas.width = originalCanvas.width * scaleFactor;
    tempCanvas.height = originalCanvas.height * scaleFactor;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.scale(scaleFactor, scaleFactor);

    const fontSize = parseInt(document.getElementById('innerValue').value, 10);
    const textColor = document.getElementById('colorInnerValue').value;

    // Crear el gráfico temporal con los mismos datos y opciones, incluyendo ChartDataLabels
    const tempChart = new Chart(tempCtx, {
        type: myChart.config.type,
        data: myChart.config.data,
        options: {
            ...myChart.config.options,
            plugins: {
                ...myChart.config.options.plugins,
                datalabels: {
                    font: {
                        size: fontSize > 0 ? fontSize : 0,
                        weight: "bold"
                    },
                    anchor: 'center',
                    align: 'center',
                    color: textColor,
                    formatter: (value) => value,
                }
            },
            animation: false,
            responsive: false,
        },
        plugins: [ChartDataLabels]
    });

    // Esperar a que se complete el renderizado
    setTimeout(() => {
        const link = document.createElement('a');
        link.href = tempCanvas.toDataURL('image/png', 1.0);
        link.download = 'gráfico.png';
        link.click();
        tempChart.destroy(); // Destruir el gráfico temporal
    }, 1000);
}


// Sincronización de sliders
const sliders = document.querySelectorAll('input[type="range"]');
sliders.forEach(slider => {
    slider.addEventListener('input', function () {
        let value = this.value;
        sliders.forEach(s => s.value = value);
    });
});

// Generar el gráfico
function generateChart() {
    const chartType = document.getElementById('chartType').value;
    const labels = [];
    const data = [];
    const backgroundColors = [];
    const borderColors = [];

    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach(label => {
        const isChecked = document.getElementById(`checkChart${label}`).checked;
        if (isChecked) {
            labels.push(document.getElementById(`label${label}`).value);
            data.push(parseFloat(document.getElementById(`data${label}`).value) || 0);
            const color = document.getElementById(`color${label}`).value;
            const opacity = document.getElementById(`opacity${label}`).value;
            backgroundColors.push(hexToRgba(color, opacity));
            borderColors.push(color);
        }
    });

    // Configuración de título, subtítulo y datalabels
    const chartLabel = document.getElementById('labelChartValue').value || 'Label';
    const chartTitle = document.getElementById('tittleChartInput').value || 'Tittle';
    const fontSize = parseInt(document.getElementById('innerValue').value, 10);
    const textColor = document.getElementById('colorInnerValue').value;

    // Verificar si ya existe el gráfico
    if (myChart) {
        if (myChart.config.type !== chartType) {
            myChart.destroy();
            createChart(chartType, labels, data, backgroundColors, borderColors, chartLabel, chartTitle, fontSize, textColor);
        } else {
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.data.datasets[0].backgroundColor = backgroundColors;
            myChart.data.datasets[0].borderColor = borderColors;
            myChart.data.datasets[0].label = chartLabel;
            myChart.options.plugins.title.text = chartTitle;
            myChart.options.plugins.datalabels.font.size = fontSize;
            myChart.options.plugins.datalabels.color = textColor;
            myChart.update(); 
        }
    } else {
        createChart(chartType, labels, data, backgroundColors, borderColors, chartLabel, chartTitle, fontSize, textColor);
    }
}

// Crear el gráfico con opción horizontal
function createChart(chartType, labels, data, backgroundColors, borderColors, chartLabel, chartTitle, fontSize, textColor) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Si el tipo es horizontal, configura `indexAxis` como 'y'
    const isHorizontal = chartType === 'horizontalBar';
    const actualChartType = isHorizontal ? 'bar' : chartType;

    myChart = new Chart(ctx, {
        type: actualChartType,
        data: {
            labels: labels,
            datasets: [{
                label: chartLabel,
                data: data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                borderRadius: 2
            }]
        },
        options: {
            indexAxis: isHorizontal ? 'y' : 'x',
            plugins: {
                title: {
                    display: !!chartTitle,
                    text: chartTitle,
                    font: {
                        family: 'Arial',
                        size: 25,
                        weight: 'bold',
                    },
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    font: {
                        size: fontSize > 0 ? fontSize : 0,
                        weight: "bold"
                    },
                    anchor: 'center',
                    align: 'center',
                    formatter: (value) => value,
                    color: textColor
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    display: chartType === 'bar' || chartType === 'line' || isHorizontal
                }
            },
            animation: {
                duration: 1300
            }
        },
        plugins: [ChartDataLabels]
    });
}



// Convertir hex a rgba
function hexToRgba(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Eventos de entrada
document.getElementById('chartType').addEventListener('change', generateChart);
['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'].forEach(label => {
    document.getElementById(`checkChart${label}`).addEventListener('change', generateChart);
    document.getElementById(`label${label}`).addEventListener('input', generateChart);
    document.getElementById(`data${label}`).addEventListener('input', generateChart);
    document.getElementById(`color${label}`).addEventListener('change', generateChart);
    document.getElementById(`opacity${label}`).addEventListener('input', generateChart);
});

function updateInputsBasedOnCheckboxes() {
    // Verificar el estado de cada checkbox y actualizar los inputs
    if (document.getElementById('tittleDisable').checked) {
        document.getElementById('tittleChartInput').value = ' ';
    }

    if (document.getElementById('subTittleDisable').checked) {
        document.getElementById('subTittleChartInput').value = ' ';
    }

    if (document.getElementById('labelDisable').checked) {
        document.getElementById('labelChartValue').value = ' ';
    }

    // Actualizar el gráfico
    generateChart();
}
document.getElementById('randomizeData').addEventListener('click', randomizeData);

document.getElementById('tittleDisable').addEventListener('change', updateInputsBasedOnCheckboxes);
document.getElementById('subTittleDisable').addEventListener('change', updateInputsBasedOnCheckboxes);
document.getElementById('labelDisable').addEventListener('change', updateInputsBasedOnCheckboxes);
document.getElementById('downloadChart').addEventListener('click', downloadChart);
document.getElementById('subTittleChartInput').addEventListener('input', generateChart);
document.getElementById('tittleChartInput').addEventListener('input', generateChart); // Añadido para título
document.getElementById('labelChartValue').addEventListener('input', generateChart); // Añadido para etiqueta

window.onload = generateChart;
