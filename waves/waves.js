console.log('waves.js loaded');

const gui = new dat.GUI();

const canvas = document.getElementById('sin-wave');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -100;

const ctx = canvas.getContext('2d');

const wave = {
  y: canvas.height/2,
  length: 0.002,
  amplitude: 200,
  frequency: 0.01,
  trails: 0.010
};

gui.add(wave, 'y', 0, canvas.height, 'amplitude', -200, 200);
gui.add(wave, 'length', -0.02, 0.02);
gui.add(wave, 'frequency', 0.01, 1);
gui.add(wave, 'amplitude', -300, 300);
gui.add(wave, 'trails', 0.01, 1);



let incement = wave.frequency;
function animate() {
  ctx.fillStyle = `rgba(255, 255, 255, ${wave.trails})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/2);

  for (let i = 0; i < canvas.width; i++) {
    if (i < canvas.width - 1 ) {
      ctx.lineTo(i, (wave.y) + Math.sin(i * wave.length + incement) * wave.amplitude);
    }
  }
  ctx.stroke();
  incement += wave.frequency;
  requestAnimationFrame(animate);
}

animate();