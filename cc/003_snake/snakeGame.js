console.log('snake.js');
let s;
let food;
let score = {
  total: 0,
  prevScore: 0,
  show: function() {
    if (this.total > this.prevScore) {
    document.getElementById('score').innerHTML = this.total;
    }
  }
};
console.log(`${window.innerWidth}x${window.innerHeight}`);
console.log(`${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`);
let game_width = 200;
let game_height = 200;
let grid_size = 20;
let cell_size = 20;
let grid_width = game_width / grid_size;
let grid_height = game_height / grid_size;


function setup() {
  let canvas = createCanvas(game_width, game_height);
  let canvasParent = document.querySelector('#canvas-parent');
  canvas.parent('canvas-parent');
  canvasParent.style.border = "4px solid rgb(100,155,100)";
  canvasParent.style.margin = "10px auto 0";
  canvasParent.style.width = "min-content";
  canvasParent.style.height = `${game_height}px`;
  frameRate(9);
  pickLocation();
  document.getElementById('score').innerHTML = 0;
  s = new Snake();

}

function grid() {
  noFill();
  stroke(100,155,100);
  strokeWeight(0.5);
  for (let x = 0; x < grid_width; x++) {
    for (let y = 0; y < grid_height; y++) {
      rect(x * grid_size, y * grid_size, grid_size, grid_size);
    }
  }
}

function pickLocation() {
  let cols = floor(width / cell_size);
  let rows = floor(height / cell_size);
  food = createVector(floor(random(cols)), floor(random(rows)));
}

function draw() {
  // Background
  colorMode(RGB, 255);
  background(55,55,55);
  grid();
  // Food
  fill(240,0,100);
  rect(food.x * cell_size, food.y * cell_size, cell_size, cell_size);
  score.show();
  // Snake  
  s.show();
  s.eat(food);
  s.update();
  if (s.death()) {
    pickLocation();
    s.reset();
    score.total = 0
  }

  
}

function keyPressed() {
  let speed = cell_size;
  if (keyCode === UP_ARROW || keyCode === 87) {
    s.dir(0, -cell_size);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    s.dir(0, cell_size);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    s.dir(cell_size, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    s.dir(-cell_size, 0);
  }
}
