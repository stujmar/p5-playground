
let tiles = [];
let grid = [];
const DIM = 2;

let widthState = 0;
let heightState = 0;

const BLANK = 0;
const CROSS = 1;
const DOWN = 2;
const LEFT = 3;
const RIGHT = 4;
const UP = 5;

// up, right down, left
const rules = [
   [ 
    // up
    [BLANK, UP],
    // right
    [BLANK, RIGHT],
    // down
    [BLANK, DOWN],
    // left
    [BLANK, LEFT],
  ],
  [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [CROSS, UP, DOWN, RIGHT],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
   [
    // up
    [BLANK, UP],
    // right
    [CROSS, LEFT, UP],
    // down
    [CROSS, LEFT, RIGHT, UP],
    // left
    [CROSS, UP, DOWN, RIGHT],
  ],
   [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [RIGHT, BLANK],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
   [
    // up
    [CROSS, DOWN, LEFT, RIGHT],
    // right
    [CROSS, UP, DOWN, LEFT],
    // down
    [CROSS, LEFT, UP, RIGHT],
    // left
    [BLANK, LEFT],
  ],
  [
    // up
    [CROSS, LEFT, RIGHT, DOWN],
    // right
    [CROSS, LEFT, UP, DOWN],
    // down
    [DOWN, BLANK]
    // left
    [CROSS, RIGHT, DOWN, UP],
  ],
]

const oldRules = [
  [ 
   // up
   [BLANK, UP],
   // right
   [BLANK, RIGHT],
   // down
   [BLANK, DOWN],
   // left
   [BLANK, LEFT],
 ],
 [
   // up
   [CROSS, LEFT, RIGHT, DOWN],
   // right
   [CROSS, UP, DOWN, RIGHT],
   // down
   [CROSS, LEFT, UP, RIGHT],
   // left
   [CROSS, RIGHT, DOWN, UP],
 ],
  [
   // up
   [BLANK, UP],
   // right
   [CROSS, LEFT, UP],
   // down
   [CROSS, LEFT, RIGHT, UP],
   // left
   [CROSS, UP, DOWN, RIGHT],
 ],
  [
   // up
   [CROSS, LEFT, RIGHT, DOWN],
   // right
   [RIGHT, BLANK],
   // down
   [CROSS, LEFT, UP, RIGHT],
   // left
   [CROSS, RIGHT, DOWN, UP],
 ],
  [
   // up
   [CROSS, DOWN, LEFT, RIGHT],
   // right
   [CROSS, UP, DOWN, LEFT],
   // down
   [CROSS, LEFT, UP, RIGHT],
   // left
   [BLANK, LEFT],
 ],
 [
   // up
   [CROSS, LEFT, RIGHT, DOWN],
   // right
   [CROSS, LEFT, UP, DOWN],
   // down
   [DOWN, BLANK]
   // left
   [CROSS, RIGHT, DOWN, UP],
 ],
]


function checkValid(arr, valid) {
  //console.log(arr, valid);
  for (let i = arr.length - 1; i >= 0; i--) {
    // VALID: [BLANK, RIGHT]
    // ARR: [BLANK, UP, RIGHT, DOWN, LEFT]
    // result in removing UP, DOWN, LEFT
    let element = arr[i];
    // console.log(element, valid.includes(element));
    // console.log(arr, valid);
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }
  // console.log(arr);
  // console.log("----------");
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
  console.log(width, height);
  widthState = width;
  heightState = height;

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, CROSS, DOWN, LEFT, RIGHT, UP],
    }
  }
  // console.log(grid);
  // console.log("grid", DIM * DIM);
  // console.table(grid);
  // manually collapse a cell for testing.
  // grid[0].collapsed = true;
  // grid[0].options = [CROSS];
  // grid[2].options = [BLANK, UP];
  grid[1].options = [CROSS, BLANK];

}

function draw() {
  background(220);
  let gridCopy = grid.slice();
  gridCopy.sort((a,b) => a.options.length - b.options.length);
  // console.table(grid)
  // console.table(gridCopy)
  let len = gridCopy[0].options.length;
  // we need a conditionl in case they are all the same length
  gridCopy = gridCopy.filter(cell => cell.options.length === len);
  
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  const w = widthState / DIM;
  const h = heightState / DIM;

  for (let row = 0; row < DIM; row++) {
    for (let col = 0; col < DIM; col++) {
      // Find 2d array index of current tile;
      let cell = grid[row + col * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, col * w, row * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(col * w, row * h, w, h);
      }
    }
  }

  const nextGrid = [];
  for (let row = 0; row < DIM; row++) {  // j
    for (let col = 0; col < DIM; col++) { // i
      let index = row + col * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = ["UP", "LEFT", "RIGHT", "DOWN", "BLANK", "CROSS"];
        let validOptions = [];
        // Look up
        if (row > 0) { // row zero is the top row so there is no up.
        let up = grid[col + (row - 1) * DIM];
        console.log("up", up);
          for (let options of up.options) {
            let valid = rules[options][DOWN];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right // i = col, j = row
        if (col < DIM - 1) {
          let right = grid[col + 1 + row * DIM];
          console.log("right", right)
          for (let option of right.options) {
            console.log(option)
            let valid = rules[option][LEFT];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down // i = col, j = row
        if (row < DIM - 1) {
          let down = grid[col + (row + 1) * DIM];
          for (let option of down.options) {
            let valid = rules[option][UP];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left  // i = col, j = row
        if (col > 0) {
          let left = grid[col - 1 + row * DIM];
          for (let option of left.options) {
            let valid = rules[option][RIGHT];
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }


        nextGrid[index] = {
          options,
          collapsed: false,
        };
      }
    }
  }
  grid = nextGrid;
  if (gridCopy.length === 0) {
    console.log("done");
    return;
  }
  noLoop();
}

// redraw on mouse click
function mousePressed() {
  redraw();
}