// 🟡 The getContext() method returns an object that provides the methods and properties for drawing on the canvas.
// 🟡 The moveTo() method moves the path to the specified point in the canvas, without creating a line.
// 🟡 The lineTo() method adds a new point and creates a line to that point from the last specified point in the canvas.
// 🟡 Use the stroke() method to actually draw the path on the canvas.


const canvas = document.getElementById('canvas');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const sizeElement = document.getElementById('size');
const colorElement = document.getElementById('color');
const clearButton = document.getElementById('clear');
const ctx = canvas.getContext('2d');

// 🟡 a way to draw a circle
// ctx.beginPath();
// ctx.arc(100, 60, 50, 0, Math.PI*2);
// ctx.stroke();

// let x = 50;
// let y = 50;
let size = 30;
let color = 'black'; 
let x = undefined;
let y = undefined;

let isPressed = false;

canvas.addEventListener('mousedown', (e)=>{
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener('mouseup', (e)=>{
    isPressed = false;

    x = undefined;
    y = undefined;
});

canvas.addEventListener('mousemove', (e)=>{
    // console.log(e);
    /*The offsetX property returns the x-coordinate of the mouse pointer, relative to the target element.
    To get the y-coordinate, use the offsetY property.*/
    if(isPressed){
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        drawCircle(x2, y2)
        joinDots(x,y,x2,y2);
        x = x2;
        y = y2;
    }
    

});

function drawCircle(x, y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
}

//make the arcs to join the dots in the canvas
function joinDots(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1); //starting point of the line
    ctx.lineTo(x2, y2); //end point of the same line
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2; //to remove the circles points in between the lines 
    ctx.stroke();
}


increaseBtn.addEventListener('click', ()=>{
    size += 5;
    if(size > 50){
        size = 50;
    }

    updateSize();
});

decreaseBtn.addEventListener('click', ()=>{
    size -= 5;
    if(size < 5){
        size = 5;
    }

    updateSize();
});

colorElement.addEventListener('change', (e)=>{
    color = e.target.value;
});

clearButton.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function updateSize(){
    sizeElement.innerText = size;
}