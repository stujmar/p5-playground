console.log("----------");
const tiles = [];
const grid = [];

const DIM = 2;

const BLANK = 0;
const UP = 1;
const RIGHT = 2;
const DOWN = 3;
const LEFT = 4;

function preload() {
  tiles[0] = loadImage("/assets/tile_blank.png");
  tiles[1] = loadImage("/assets/tile_up.png");
  tiles[2] = loadImage("/assets/tile_right.png");
  tiles[3] = loadImage("/assets/tile_down.png");
  tiles[4] = loadImage("/assets/tile_left.png");
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, UP, RIGHT, DOWN, LEFT],
    };
  }

  grid[2].options = [BLANK, UP];
  grid[0].options = [BLANK, LEFT];
}

function draw() {
  background(0);

  // Pick cell with least entropy
  let gridCopy = grid.slice();
  gridCopy.sort((a,b) => a.options.length - b.options.length);
  
  gridCopy = gridCopy.filter(cell => cell.options.length === gridCopy[0].options.length);
  
  
  
  
  
  
  
  
  
  
  
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  cell.options = [pick];

  console.log(grid);
  console.log(gridCopy);

  let w = width / DIM;
  let h = height / DIM;
  for (let j= 0; j < DIM; j++) { // row y
    for (let i = 0; i < DIM; i++) { // column x
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index], i * w, j * h, w, h);
    } else {
      fill("#ff0000");
      rect(i * w, j * h, w, h);
    }
  }
  }


  noLoop();
}
