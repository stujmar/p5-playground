console.log('waves.js loaded');

const canvas = document.getElementById('sin-wave');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// make stroke with 2px red.


c.beginPath();
c.moveTo(0, canvas.height/2);

for (let i = 0; i < canvas.width; i+=3) {
  if( i % 2 == 0) {
    // make line green
    console.log('green');
    c.strokeStyle = "green";
    c.lineTo(i, canvas.height/2 + 100 * Math.sin(i/100) + 200);
  } else {
    // make line blue
    c.strokeStyle = "red";
    c.lineTo(i, canvas.height/2 + 100 * Math.sin(i/100) - 200);
  }

}

c.stroke();
