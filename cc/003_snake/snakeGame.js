console.log('snake.js');
let s;
let food;
let score = {
  total: 0,
  prevScore: 0,
  highscore: localStorage.getItem('highscore') || 0,
  add: function(n) {
    this.total += n;
    this.update();
    if (this.total > this.highscore) {
      this.highscore = this.total;
      document.getElementById('highscore').innerHTML = this.highscore;
      // add highscore to local storage
      localStorage.setItem('highscore', this.highscore);
    }
  },
  update: function() {
    document.getElementById('score').innerHTML = this.total;
  }
};
// console.log(`${window.innerWidth}x${window.innerHeight}`);
// console.log(`${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`);
let game_width = 400;
let game_height = 400;
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
  canvasParent.style.padding = "1px";
  canvasParent.style.width = "min-content";
  canvasParent.style.height = "m-content";
  canvasParent.style.height = `${game_height + 10}px`;
  frameRate(8);
  pickLocation();
  document.getElementById('score').innerHTML = 0;
  document.getElementById('highscore').innerHTML = score.highscore;
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

function pickLocation(tail=false) {
  let cols = floor(width / cell_size);
  let rows = floor(height / cell_size);
  let conflict = false;
  let potentialLocation;
  if (tail.length > 0) {
    potentialLocation = createVector(floor(random(cols)), floor(random(rows)));
    tail.forEach(tailSegment => {
      if (tailSegment.x/cell_size === potentialLocation.x && tailSegment.y/cell_size === potentialLocation.y) {
        console.log("apple in tail");
        conflict = true;
      }
    });
  }
  if (!conflict) {
  food = potentialLocation || createVector(floor(random(cols)), floor(random(rows)));
  } else {
    pickLocation(tail);
  }
}

function draw() {
  // Background
  colorMode(RGB, 255);
  background(55,55,55);
  grid();
  // Food
  fill(240,0,100);
  rect(food.x * cell_size, food.y * cell_size, cell_size, cell_size);
  // Snake
  s.update();  
  s.show();
  if (s.eat(food)) {
    food = pickLocation();
  }


  // Death
  if (s.death()) {
    pickLocation();
    s.reset();
    console.log('reset');
    score.total = 0;
    score.update();
  }

  
}

function keyPressed() {
  let currentXSpeed = s.xspeed;
  let currentYSpeed = s.yspeed;
  if ((keyCode === UP_ARROW || keyCode === 87) && currentYSpeed <= 0) {
    s.dir(0, -cell_size);
  } else if (keyCode === DOWN_ARROW || keyCode === 83 && currentYSpeed >= 0) {
    s.dir(0, cell_size);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68 && currentXSpeed >= 0) {
    s.dir(cell_size, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65 && currentXSpeed <= 0) {
    s.dir(-cell_size, 0);
  }
}
