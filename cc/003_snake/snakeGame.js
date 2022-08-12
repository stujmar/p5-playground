console.log('snake.js');
let s;
let game_width = 500;
let game_height = 500;
let grid_size = 10;
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
  console.log(canvas.style);;
  frameRate(10);
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

function draw() {
  colorMode(RGB, 255);
  background(55,55,55);
  grid();
  s.show();
  s.update();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -10);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 10);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(10, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-10, 0);
  }
}
