console.log('waves.js loaded');

const gui = new dat.GUI();
// console.log(gui);
const canvas = document.getElementById('sin-wave');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -100;
console.log(canvas.width, canvas.height);

const ctx = canvas.getContext('2d');

// make stroke with 2px red.
let amplitude = 100;
let frequency = 0.01;

ctx.beginPath();
ctx.moveTo(0, canvas.height/2);

for (let i = 0; i < canvas.width; i++) {
  ctx.lineTo(i, (canvas.height/2) + Math.sin(i * frequency) * amplitude);
}

ctx.stroke();
