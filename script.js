const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const saveBtn = document.getElementById('saveBtn');

let isDrawing = false;

canvas.addEventListener('mousedown', () => {
    isDrawing = true;
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.beginPath(); // This ensures a new line starts when drawing begins again.
});

canvas.addEventListener('mousemove', draw);

colorPicker.addEventListener('input', (event) => {
    ctx.strokeStyle = event.target.value;
});

saveBtn.addEventListener('click', saveDrawing);

ctx.lineWidth = 5; // Default line width
ctx.lineCap = 'round'; // This makes the line a bit rounded at the ends.

// Fill the canvas with a white background initially
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function draw(event) {
    if (!isDrawing) return;

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function saveDrawing() {
    // Temporarily draw a white background before saving
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const link = document.createElement('a');
    link.href = canvas.toDataURL(); // Converts the canvas drawing into a data URL
    link.download = 'drawing.png';
    link.click();

    // After saving, restore the original canvas content
    ctx.putImageData(imageData, 0, 0);
}
