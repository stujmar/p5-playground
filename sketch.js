
const tiles = [];
const grid = [];
const DIM = 2;

const BLANK = 0;
const CROSS = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const UP = 5;

// up, right down, left
const rules = {
  BLANK: [
    // up
    [BLANK, UP],
    // right
    [BLANK, RIGHT],
    // down
    [BLANK, DOWN],
    // left
    [BLANK, LEFT],
  ],
  CROSS: [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [CROSS, UP, DOWN, RIGHT],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
  DOWN: [
    // up
    [BLANK, UP],
    // right
    [CROSS, LEFT, UP],
    // down
    [CROSS, LEFT, RIGHT, UP],
    // left
    [CROSS, UP, DOWN, RIGHT],
  ],
  LEFT: [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [RIGHT, BLANK],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
  RIGHT: [
    // up
    [CROSS, DOWN, LEFT, RIGHT],
    // right
    [CROSS, UP, DOWN, LEFT],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [BLANK, LEFT],
  ],
  UP: [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [CROSS, LEFT, UP, DOWN],
    // down
    [DOWN, BLANK]
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
}

function preload() {
  tiles[0]  = loadImage("/assets/blank.png");
  tiles[1]  = loadImage("/assets/cross.png");
  tiles[2]  = loadImage("/assets/down.png");
  tiles[3]  = loadImage("/assets/left.png");
  tiles[4]  = loadImage("/assets/right.png");
  tiles[5]  = loadImage("/assets/up.png");
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, CROSS, DOWN, LEFT, RIGHT, UP],
    }
  }
  // manually collapse a cell for testing.
  // grid[0].collapsed = true;
  // grid[0].options = [CROSS];
  grid[2].options = [BLANK, UP];
  grid[1].options = [CROSS, BLANK];

}

function draw() {
  background(220);
  let gridCopy = grid.slice();
  gridCopy.sort((a,b) => a.options.length - b.options.length);

  let len = gridCopy[0].options.length;
  // we need a conditionl in case they are all the same length
  gridCopy = gridCopy.filter(cell => cell.options.length === len);
  
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  const w = width / DIM;
  const h = height / DIM;

  for (let row = 0; row < DIM; row++) {
    for (let col = 0; col < DIM; col++) {
      // Find 2d array index of current tile;
      let cell = grid[row + col * DIM];
      if (cell.collapsed) {
        image(tiles[cell.options[0]], col * w, row * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(col * w, row * h, w, h);
      }
    }
  }

  const nextTiles = [];
  for (let row = 0; row < DIM; row++) {
    for (let col = 0; col < DIM; col++) {
      let index = row + col * DIM;
      if (tiles[index].collapsed) {
        nextTiles[index] = tiles[index];
      } else {
        // Look up
        // Look right
        // Look down
        // Look left 
      }
    }

  }

  noLoop();
}