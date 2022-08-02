console.log('hello');
let n = 0;
let c = 5;
let red = 255;
let green = 255;
let blue = 255;
let rate = 0;
let go = false;
let fillColor = "black";
// turn the body of the page black
document.body.style.background = 'green';

function start() {
  // get button 
  const button = document.querySelector('button');
  // hide button
  // button.style.display = 'none';
  rate = 1;
  fillColor = "yellow";
  go = true;
}

function setup() {
  createCanvas(400, 400);
  background(0, 255, 0);
  colorMode(RGB);
  angleMode(DEGREES);
  blue=255;
  // get canvas
const canvas = document.querySelector('canvas');
// center the canvas
// console.log(canvas)
canvas.style.display = 'block';
canvas.style.borderRadius = "100%";
canvas.style.margin = 'auto';
// get button
const button = document.querySelector('button');
// add event listener
button.addEventListener('click', start);
}

function draw() {

  // stop drawing
  if (go) {
  let a = n * 137.5;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width / 2;
  let y = r * sin(a) + height / 2;

  // console.log(red, blue);
  fill(`rgb(${red}, ${Math.floor(green)}, ${Math.floor(blue)})`);

  // console.log(blue)
  // fill('rgb(255, 255, 0)');
  blue = blue <= 0 ? 0 : blue -= .25;
  green = blue === 0 && green > 50 ? green - .25 : green;
  // noStroke();
  ellipse(x, y, 15, 15);
  // console.log(rate)
  n += rate;
  }
}