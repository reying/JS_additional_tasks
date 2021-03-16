'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brushColor = document.getElementById('brush-color'),
    brushWidth = document.getElementById('brush-width'),
    widthValue = document.getElementById('width-value'),
    restartCanvas = document.getElementById('restart-canvas');

widthValue.textContent = brushWidth.value;

const drawingOlimpicRings = () => {
    const angle = (degres = 360) => (Math.PI / 180) * degres;

    const lightBlue = '#1E90FF';

    ctx.lineWidth = '10';

    // Кольца:
    // голубое
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, angle(), false);
    ctx.stroke();
    ctx.closePath();

    // черное
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(235, 75, 70, 0, angle(), false);
    ctx.stroke();
    ctx.closePath();

    // красное
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(395, 75, 70, 0, angle(), false);
    ctx.stroke();
    ctx.closePath();

    // желтое
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.arc(155, 150, 70, 0, angle(), false);
    ctx.stroke();
    ctx.closePath();

    // зеленое
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.arc(315, 150, 70, 0, angle(), false);
    ctx.stroke();
    ctx.closePath();


    // Наложения колец:
    // синего на желтое
    ctx.strokeStyle = lightBlue;
    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, angle(40), false);
    ctx.stroke();
    ctx.closePath();

    // черного на желтое
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(235, 75, 70, angle(90), angle(135), false);
    ctx.stroke();
    ctx.closePath();

    // черного на зеленое
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(235, 75, 70, 0, angle(45), false);
    ctx.stroke();
    ctx.closePath();

    // красного на зеленое
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(395, 75, 70, angle(90), angle(135), false);
    ctx.stroke();
};

drawingOlimpicRings();

ctx.strokeStyle = 'black';
ctx.lineWidth = '2';

canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;

    if (event.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }
});

brushColor.addEventListener('input', () => ctx.strokeStyle = brushColor.value);

brushWidth.addEventListener('input', () => {
    widthValue.textContent = brushWidth.value;
    ctx.lineWidth = brushWidth.value;
});

restartCanvas.addEventListener('click', () => {
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawingOlimpicRings();
    ctx.restore();
});