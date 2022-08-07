console.log('.. loading phyllotaxis.js ...');

let n = 0;
let c = 5;
let red = 255;
let green = 255;
let blue = 255;
let rate = 0;
let go = false;
let angle = 137.5
let canvas;

let startBtn = document.getElementById('start');
startBtn.addEventListener('click', start);
let saveBtn = document.getElementById('save');
saveBtn.addEventListener('click', save);
let clearBtn = document.getElementById('clear');
clearBtn.addEventListener('click', clearCanvas);
let slider = document.getElementById('angle');
let defaultBtn = document.getElementById('reset');
defaultBtn.addEventListener('click', reset);
let downloadBtn = document.getElementById('download');
let rateSilder = document.getElementById('rate');
let settingButton = document.getElementById('btn-settings');
let clickAway = document.getElementById('click-away');
clickAway.addEventListener('click', toggleSettings); 
settingButton.addEventListener('click', toggleSettings);

function toggleSettings() {
  const settings = document.getElementById('settings');
  if (settings.style.opacity == 0) {
    clickAway.style.display = 'block';
    settings.style.opacity = 1;
  } else {
    clickAway.style.display = 'none';
    settings.style.opacity = 0;
  }
}

function start() {
  if (!go) {
    startBtn.innerHTML = 'Stop';
    angle = slider.value/10;
    rate = rateSilder.value/1000;
    go = true;
    
  } else {
    go = false;
    startBtn.innerHTML = 'Start';
  }
}

function save() {
  angle = slider.value/10;
  rate = rateSilder.value/1000;
  // go = true;
  toggleSettings();
}

function download() {
  console.log('downloading...');
  // saveCanvas(canvas, 'phyllotaxis', 'jpg');
  // let myCanvas = document.querySelector('canvas');
  let canvasWrapper = document.getElementById('canvas-wrapper');
  html2canvas(canvasWrapper).then(function(canvas) {
    canvas.style.background = 'rgb(150, 255, 150)';
    // document.body.appendChild(canvas);
    saveCanvas(canvas, 'phyllotaxis', 'jpg');
  });
  
}

function reset() {
  angle = slider.value/10;
  rate = rateSilder.value/1000;
  console.log('resets defaults...');
  n = 0;
  c = 5;
  red = 255;
  green = 255;
  blue = 255;
  // rate = 1;

  // angle = 137.5
 }

 function clearCanvas() {
  background(150, 255, 150);

 }

function setup() {
  let width = document.documentElement.clientWidth;
  width = width < 400 ? width - 20 : 400;
  let myCanvas = createCanvas(width, width);
  myCanvas.parent('canvas-wrapper');
  background(150, 255, 150);
  colorMode(RGB);
  angleMode(DEGREES);
  blue=255;
  canvas = document.querySelector('canvas');
  canvas.style.background = 'rgb(150, 255, 150)';
  canvas.style.display = 'block';
  canvas.style.borderRadius = "100%";
  canvas.style.margin = 'auto';
  downloadBtn.style.display = 'none';
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
    if (n > 200 && downloadBtn.style.display === 'none') {
      downloadBtn.style.display = 'block';
      document.body.appendChild(downloadBtn);
      downloadBtn.addEventListener('click', download);
    }


  }

  
}
