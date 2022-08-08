let canvas;
let starCount = 400;
let stars = [];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let width = windowWidth;
let height = windowHeight;
let speed = 15;

class Star {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.prevX;
    this.prevY;
  }

  update() {
    this.z -= speed;
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width/2, width/2);
      this.y = random(-width/2, width/2);
      this.prevX = this.x;
      this.prevY = this.y;
    }
  
  }

  show() {
    fill(255);
    noStroke();
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, width);
    let r = map(this.z, 0, width, 4, 0);
    // ellipse(sx, sy, r, r);

    stroke(255);
    strokeWeight(r);
    line(this.prevX, this.prevY, sx, sy);
    this.prevX = sx;
    this.prevY = sy;

  }

}

function resize() {
  canvas = createCanvas(windowWidth, height);
  canvas.parent('canvas-wrapper');
}

function setup() {
  console.log("... setting up ...");
  for (let i = 0; i < starCount; i++) {
    stars.push(
      new Star(
        Math.floor(random(-width, width)),
        Math.floor(random(-height, height)), 
       Math.floor(random(width))));
  }
  // console.log(stars);
  // create a p5 canvas
  resize();
}

function draw() {
  background(10, 10, 25);
  translate(width / 2, height / 2);
  stars.forEach(star => {
    star.show();
    star.update();
  })

  if(windowWidth !== window.innerWidth) {
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    width = windowWidth;
    height = windowHeight;
    resize();
  }
}