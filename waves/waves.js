console.log('waves.js loaded');

const gui = new dat.GUI();

const canvas = document.getElementById('sin-wave');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -100;

const ctx = canvas.getContext('2d');

let hue = 0;
const strokeColor = {
  h: 115,
  s: 50,
  l: 50
}

const wave = {
  background: 0,
  y: canvas.height/2,
  length: 0.002,
  amplitude: 200,
  frequency: 0.01,
  trails: 1,
  lineWidth: 5
};

const waveFolder = gui.addFolder('Wave');
const colorFolder = gui.addFolder('Color');


gui.add(wave, 'background', 0, 255)
waveFolder.add(wave, 'y', 0, canvas.height, 'amplitude', -200, 200);
waveFolder.add(wave, 'length', -0.02, 0.02);
waveFolder.add(wave, 'frequency', 0.01, 1);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'trails', 0.01, 1);
waveFolder.add(wave, 'lineWidth', 1, 10);
waveFolder.open();
colorFolder.add(strokeColor, 'h', 0, 255);
colorFolder.add(strokeColor, 's', 0, 100);
colorFolder.add(strokeColor, 'l', 0, 100);
colorFolder.open();



let incement = wave.frequency;
function animate() {
  // loop variable through 0-255
  hue = (hue + 1) % 256;

  // have hue ping pong between 0-255

  ctx.fillStyle = `rgba(${wave.background}, ${wave.background}, ${wave.background}, ${wave.trails})`;
  ctx.strokeStyle = `hsl(${strokeColor.h}, ${strokeColor.s}%, ${strokeColor.l}%)`;
  
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(-5, canvas.height/2);
  
  for (let i = 0; i < canvas.width + 10; i++) {
    
    if (i < canvas.width + 100) {
      ctx.lineTo(i - 5, (wave.y) + Math.sin(i * wave.length + incement) * wave.amplitude);
    }
  }
  ctx.lineWidth = wave.lineWidth;
  ctx.stroke();
  incement += wave.frequency;
  requestAnimationFrame(animate);
}

animate();