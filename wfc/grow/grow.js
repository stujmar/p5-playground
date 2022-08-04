console.log("growing tree")

class Cell {
  constructor(value) {
    this.collapsed = false;
    if (value instanceof Array) {
      this.options = value;
    } else {
      this.options = [];
      for (let i = 0; i < value; i++) {
        this.options[i] = i;
      }
    }
  }
}

function reverseString(s) {
  let arr = s.split('');
  arr = arr.reverse();
  return arr.join('');
}

function compareEdge(a, b) {
  return a == reverseString(b);
}

class Tile {
  constructor(img, edges, i) {
    this.img = img;
    this.edges = edges;
    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
    this.index = null;

    if (i !== undefined) {
      this.index = i;
    }
  }

  analyze(tiles) {

    // From github:
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];

      // Tile 5 can't match itself
      if (tile.index == 5 && this.index == 5) continue;

      // UP
      if (compareEdge(tile.edges[2], this.edges[0])) {
        this.up.push(i);
      }
      // RIGHT
      if (compareEdge(tile.edges[3], this.edges[1])) {
        this.right.push(i);
      }
      // DOWN
      if (compareEdge(tile.edges[0], this.edges[2])) {
        this.down.push(i);
      }
      // LEFT
      if (compareEdge(tile.edges[1], this.edges[3])) {
        this.left.push(i);
      }
    }
}

  rotate(num) {
    const w = this.img.width;
    const h = this.img.height;
    const newImg = createGraphics(w, h);
    newImg.imageMode(CENTER);
    newImg.translate(w / 2, h / 2);
    newImg.rotate(HALF_PI * num);
    newImg.image(this.img, 0, 0);

    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      newEdges[i] = this.edges[(i - num + len) % len];
    }
    return new Tile(newImg, newEdges, this.index);
  }
}

const tiles = [];
const tileImages = [];

let grid = [];

const DIM = 5;

function preload() {
  const path = 'assets';
  tileImages[0] = loadImage(`${path}/sky.png`);
  tileImages[1] = loadImage(`${path}/pot.png`);
  tileImages[2] = loadImage(`${path}/poms.png`);
  tileImages[3] = loadImage(`${path}/tee.png`);
  tileImages[4] = loadImage(`${path}/el.png`);
  // tileImages[2] = loadImage(`${path}/tile_cross.png`);
}

function addRotation(tiles, tileIndex) {
  for (let i = 1; i < 4; i++) {
    tiles.push(tiles[tileIndex].rotate(i));
  }
}

function setup() {
  let element = document.querySelector("body");
  let canvasDim = element.clientWidth < 350 ? element.clientWidth - 20 : 350;
  createCanvas(canvasDim, canvasDim);
  // make an html button
  let button = document.createElement('button');
  button.innerHTML = 'Grow';
  button.onclick = startOver;
  button.style.display = 'block';
  button.style.marginLeft = "auto";
  button.style.marginRight = "auto";
  button.style.marginTop = "18px";
  button.style.borderRadius = "5px";
  button.style.backgroundColor = "#c1eefd";
  button.style.color = "#544f42";
  button.style.fontSize = "24px";
  button.style.fontFamily = "Roboto, sans-serif";
  button.style.fontWeight = "200";
  button.style.padding = "6px 12px";
  button.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  // no border on the button
  button.style.border = "none";
  element.appendChild(button);
  let canvas = document.querySelector("canvas");
  canvas.style.display = 'block';
  canvas.style.borderRadius = "10px";
  canvas.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
  canvas.style.marginLeft = "auto";
  canvas.style.marginTop = "18px";
  canvas.style.marginRight = "auto";
  // Create tiles
  tiles[0] = new Tile(tileImages[0], ["SSS","SSS","SSS","SSS"]); // sky
  tiles[1] = new Tile(tileImages[1], ["BBB","SSS","SSS","SSS"]); // pot
  tiles[2] = new Tile(tileImages[2], ["SSS","BBB","SSS","SSS"]); // poms
  tiles[3] = new Tile(tileImages[3], ["SSS","BBB","BBB","BBB"]); // tee
  tiles[4] = new Tile(tileImages[4], ["BBB","BBB","SSS","SSS"]); // el
  // add rotations to tiles
  addRotation(tiles, 2);
  addRotation(tiles, 3);
  addRotation(tiles, 4);

  // tiles.append(tiles[1].rotate(1)); // right
  // tiles[3] = tiles[1].rotate(2); // down
  // tiles[4] = tiles[1].rotate(3); // left
  // tiles[5] = new Tile(tileImages[2], ["BBB","BBB","BBB","BBB"]); 


  // Generate adjacency rules based on the edges.
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }
  
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }

}
  

function checkValid(arr, valid) {
  for (let i = arr.length - 1; i >= 0; i--) {
    // VALID: [BLANK, RIGHT]
    // ARR: [BLANK, UP, RIGHT, DOWN, LEFT]
    // result in removing UP, DOWN, LEFT
    let element = arr[i];

    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }

}

function startOver() {
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

// Progress the loop if mouse is pressed
function mousePressed() {
  redraw();
}

function draw() {
  background(0);

  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, i * w, j * h, w, h);
      } else {
        noFill();
        stroke(51);
        rect(i * w, j * h, w, h);
      }
    }
  }

  // Pick cell with least entropy
  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);
  // console.table(grid);
  // console.table(gridCopy);

  if (gridCopy.length == 0) {
    return;
  }
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }

  if (stopIndex > 0) gridCopy.splice(stopIndex);
  const cell = random(gridCopy);
  cell.collapsed = true;
  const pick = random(cell.options);
  if (pick === undefined) {
    startOver();
    return;
  }
  cell.options = [pick];

  // preset one tile to collapsed
  grid[20].collapsed = true;
  grid[20].options = [0];
  grid[21].collapsed = true;
  grid[21].options = [0];
  grid[22].collapsed = true;
  grid[22].options = [1];
  grid[23].collapsed = true;
  grid[23].options = [0];
  grid[24].collapsed = true;
  grid[24].options = [0];

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // Look up
        if (j > 0) {
          let up = grid[i + (j - 1) * DIM];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          // if (index == 1) console.log(left);
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        // I could immediately collapse if only one option left?
        nextGrid[index] = new Cell(options);
      }
    }
  }

  grid = nextGrid;
  // noLoop();
}