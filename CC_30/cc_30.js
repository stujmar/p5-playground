console.log('.. loading phyllotaxis.js ...');
let n = 0;
let c = 5;
let red = 255;
let green = 255;
let blue = 255;
let rate = 0;
let go = false;
let angle = 137.5
// let fillColor = "black";
// turn the body of the page black
document.body.style.background = 'rgb(150, 255, 150)';
let slider = document.getElementById('angle');
let rateSilder = document.getElementById('rate');
let settingButton = document.getElementById('btn-settings');
settingButton.addEventListener('click', toggleSettings);

function toggleSettings() {
  const settings = document.getElementById('settings');
  if (settings.style.display === 'none') {
  settings.style.display = 'block';
  } else {
  settings.style.display = 'none';
  }
}

function start() {
  // get button 
  // const button = document.querySelector('#start');
  // const settingButton = document.querySelector('#settings');
  angle = slider.value/10;
  console.log(angle, rate)
  // hide button
  // button.style.display = 'none';
  rate = rateSilder.value/1000;
  // fillColor = "yellow";
  go = true;
}

function setup() {
  createCanvas(400, 400);
  background(150, 255, 150);
  colorMode(RGB);
  angleMode(DEGREES);
  blue=255;
  // get canvas
const canvas = document.querySelector('canvas');
// center the canvas
// console.log(canvas)
// green background on canvas
canvas.style.background = 'rgb(150, 255, 150)';
canvas.style.display = 'block';
canvas.style.borderRadius = "100%";
canvas.style.margin = 'auto';
// get button
const button = document.getElementById('start');
// add event listener
button.addEventListener('click', start);
}

function draw() {

  // stop drawing
  if (go) {
  let a = n * angle;
  let r = c * sqrt(n);
  
  let x = r * cos(a) + width / 2;
  let y = r * sin(a) + height / 2;

  fill(`rgb(${red}, ${Math.floor(green)}, ${Math.floor(blue)})`);

  blue = blue <= 0 ? 0 : blue -= .25;
  green = blue === 0 && green > 50 ? green - .25 : green;
  ellipse(x, y, 15, 15);
  n += rate;
  }
}