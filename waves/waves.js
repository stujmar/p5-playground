console.log('waves.js loaded');

const gui = new dat.GUI();

const canvas = document.getElementById('sin-wave');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let hue = 0;
const colorSettings = {
  h: 115,
  s: 28,
  l: 74,
  background: 0
}

const wave = {
  // y: canvas.height/2,
  y: 1000,
  length: 0.017,
  amplitude: 144,
  frequency: 0.012,
  trails: 0.016,
  lineWidth: 7.2,
  echo: 10,
  echoOffset: 120
};

const backgroundColor = {
  r: 0,
  g: 0,
  b: 0,
  a: 0.01
};

const waveFolder = gui.addFolder('Wave');
const colorFolder = gui.addFolder('Color');


gui.add(colorSettings, 'background', 0, 255)
waveFolder.add(wave, 'y', 0, 1000);
waveFolder.add(wave, 'length', 0, 0.04, 0.001);
waveFolder.add(wave, 'frequency', 0.01, 0.5);
waveFolder.add(wave, 'amplitude', -500, 500);
waveFolder.add(wave, 'trails', 0, 1, .001);
waveFolder.add(wave, 'lineWidth', 1, 20);
waveFolder.add(wave, 'echo', 0, 10, 1);
waveFolder.add(wave, 'echoOffset', 0, 200);
waveFolder.open();
colorFolder.add(colorSettings, 'h', 0, 255);
colorFolder.add(colorSettings, 's', 0, 100);
colorFolder.add(colorSettings, 'l', 0, 100);
colorFolder.open();



let increment = wave.frequency;
function animate() {

  ctx.fillStyle = `rgba(${colorSettings.background}, ${colorSettings.background}, ${colorSettings.background}, ${wave.trails})`;
  ctx.strokeStyle = `hsl(${colorSettings.h * Math.sin(increment)}, ${colorSettings.s}%, ${colorSettings.l}%)`;
  
  // draw background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ctx.beginPath();
  // ctx.moveTo(-wave.lineWidth, canvas.height/2);
  // for (let i = -wave.lineWidth; i < canvas.width + 10; i++) { 
  //   if (i < canvas.width + 100) {
  //     ctx.lineTo(i, (wave.y) + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
  //   }
  // }
  // ctx.lineWidth = wave.lineWidth;
  // ctx.stroke();
  drawWave(wave.echo, wave.echoOffset);

  increment += wave.frequency;
  requestAnimationFrame(animate);
}

animate();

function drawWave(echo, offset) {
  for (let waveCount = 1; waveCount <= wave.echo; waveCount++) {
    ctx.beginPath();
    ctx.moveTo(-wave.lineWidth, canvas.height/2);
    let previous = -200;
    for (let i = -wave.lineWidth; i < canvas.width + 10; i++) { 
      if (i > previous) {
        ctx.lineTo(i, (wave.y - (waveCount * wave.echoOffset)) + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment));
        previous = i;
      }
    }
    ctx.lineWidth = wave.lineWidth;
    ctx.stroke();
  }

}