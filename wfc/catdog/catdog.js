console.log("cat dogging")

class Cell {
  constructor(value, cursor=false) {
    this.cursor = cursor;
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
  constructor(img, edges, i, cursor=false) {
    this.img = img;
    this.edges = edges;
    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
    this.index = null;
    this.cursor = cursor;

    if (i !== undefined) {
      this.index = i;
    }

    if (cursor) {
      this.img.filter(invert);
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
let count = 0;
let tiles = [];
const tileImages = [];
let canvasWidth;
let canvasHeight;

let grid = [];

const DIM = 5;

function preload() {
  count = 0
  const path = 'assets';
  tileImages[0] = loadImage(`${path}/catdog_blank.png`);
  tileImages[1] = loadImage(`${path}/catdog_cat.png`);
  tileImages[2] = loadImage(`${path}/catdog_dog.png`);
  tileImages[3] = loadImage(`${path}/catdog_pipe.png`);
  tileImages[4] = loadImage(`${path}/catdog_el.png`);
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
  canvasWidth = width;
  canvasHeight = height;
  // make an html button
  let button = document.createElement('button');
  button.innerHTML = 'reset';
  button.onclick = startOver;
  button.style.display = 'block';
  button.style.marginLeft = "auto";
  button.style.marginRight = "auto";
  button.style.marginTop = "18px";
  button.style.borderRadius = "5px";
  button.style.backgroundColor = "#F1AC1E";
  button.style.border = "2px solid #000";
  button.style.fontSize = "20px";
  button.style.fontFamily = "Roboto, sans-serif";
  button.style.fontWeight = "200";
  button.style.padding = "6px 12px";
  button.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.2)";
  element.prepend(button);
  let canvas = document.querySelector("canvas");
  canvas.style.display = 'block';
  canvas.style.marginLeft = "auto";
  canvas.style.marginTop = "18px";
  // attach canvas to body
  element.prepend(canvas);

  canvas.style.marginRight = "auto";
  // Create tiles
  tiles[0] = new Tile(tileImages[0], ["SSS","SSS","SSS","SSS"]); // blank
  tiles[1] = new Tile(tileImages[1], ["SSS","BBB","SSS","SSS"]); // cat
  tiles[2] = new Tile(tileImages[2], ["SSS","SSS","SSS","BBB"]); // dog
  tiles[3] = new Tile(tileImages[3], ["SSS","BBB","SSS","BBB"]); // pipe
  tiles[4] = new Tile(tileImages[4], ["SSS","BBB","BBB","SSS"]); // el
  addRotation(tiles, 3);
  addRotation(tiles, 4);

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
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }

}

function startOver() {
  location.reload();

let grid = [];
  document.querySelector("button").innerHTML = 'reset';
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}

function placeImages(grid, width, height, path=[]) {
  const w = width / DIM;
  const h = height / DIM;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i + j * DIM];
      if (cell.collapsed) {
        let index = cell.options[0];
        if (path.length > 0 && !path.includes(i + j * DIM)) {
          image(tiles[0].img, i * w, j * h, w, h);
        } else {
          image(tiles[index].img, i * w, j * h, w, h);
        }
        if (cell.cursor) {
          noStroke();
          fill(color(0, 255, 0, 70));
          circle(i * w + (w/2), j * h + (h/2), w,);
        }
      } else {
        noFill();
        stroke(51);
        rect(i * w, j * h, w, h);
      }
    }
  }

}

function draw() {
  background(0);

  placeImages(grid, width, height);

  // Pick cell with least entropy
  let gridCopy = grid.slice();
  gridCopy = gridCopy.filter((a) => !a.collapsed);

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

  grid[0].collapsed = true;
  grid[0].options = [1];
  grid[0].cursor = false;
  let walker = grid[0];
  // console.log(walker);
  grid[24].collapsed = true;
  grid[24].options = [2];

  const nextGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM;
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index];
      } else {
        let options = new Array(tiles.length).fill(0).map((x, i) => i);
        // filter out 1 and 2 from options, cat and dog
        options = options.filter((x) => x != 1 && x != 2);
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
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        // top row fix
       if (j == 0) {
         let nonValid = []; 
         for (let option of options) {
          let up = tiles[option].edges[0];
          if (up !== "SSS") nonValid.push(option); 
         }
         // filter nonValid out of options
          options = options.filter((x) => !nonValid.includes(x));
       }
       // Bottom row fix
       if (j == DIM - 1) {
         let nonValid = []; 
         for (let option of options) {
          let down = tiles[option].edges[2];
          if (down !== "SSS") nonValid.push(option); 
         }
         // filter nonValid out of options
          options = options.filter((x) => !nonValid.includes(x));
       }
       // Left row fix
       if (i == 0) {
         let nonValid = []; 
         for (let option of options) {
          let left = tiles[option].edges[3];
          if (left !== "SSS") nonValid.push(option); 
         }
         // filter nonValid out of options
          options = options.filter((x) => !nonValid.includes(x));
       }
       // Right row fix
       if (i == DIM - 1) {
         let nonValid = []; 
         for (let option of options) {
          let left = tiles[option].edges[1];
          if (left !== "SSS") nonValid.push(option); 
         }
         // filter nonValid out of options
          options = options.filter((x) => !nonValid.includes(x));
       }

        // I could immediately collapse if only one option left?
        nextGrid[index] = new Cell(options);
        
      }
    }
  }
  grid = nextGrid;
  // noLoop();
  let notCollapsed = 0
  for (item in grid) {
    if (!grid[item].collapsed) {
      notCollapsed++;
    }
  }
  if (notCollapsed == 0) {
    pathFind(grid, tiles, width, height);
  }
}

function pathFind(grid, tiles, width, height) {
  console.log("let's find a path");

  // Temp fix for that darn cat head connection.
  if (tiles[grid[1].options[0]].edges[3] !== "BBB" ||
    tiles[grid[23].options[0]].edges[1] !== "BBB") {
    location.reload();
  }


  let start = 0;
  let path = [];
  let lastVisited = 0;
  let lastDir = 1;
  let current = start;
  finished = false;
 
    for (let i = 0; i < grid.length; i++) {
    // while (!finished) {
      setTimeout(function timer() {
        // console.log(tiles[grid[i].options]);
        grid[lastVisited].cursor = false;
       
        if (current !== grid.length - 1){
          grid[current].cursor = true;
        }
        placeImages(grid, width, height);
        path.push(current);
        lastVisited = current;
        // console.log(grid[current]);
        let currentOption = grid[current].options[0];
        // let currentTile = tiles[grid[current].options[0]]
        if (currentOption == 2) {
          // get button from html
          let button = document.querySelector("button");
          button.innerHTML = "THAT'S A CATDOG";
          placeImages(grid, width, height, path);
          noLoop();
        }
        // If you can move right
        if (tiles[grid[current].options[0]].edges[1] === "BBB" && lastDir !== 3) {
          lastDir = 1;
          current += 1;
        }
        // If you can move down
        else if (tiles[grid[current].options[0]].edges[2] === "BBB" && lastDir !== 0) {
          lastDir = 2;
          current += DIM;
        }
        // If you can move left
        else if (tiles[grid[current].options[0]].edges[3] === "BBB" && lastDir !== 1) {
          lastDir = 3;
          current -= 1;
        }
        // If you can move up
        else if (tiles[grid[current].options[0]].edges[0] === "BBB" && lastDir !== 2) {
          lastDir = 0;
          current -= DIM;
        }

      }, i * 100);
    
    }

}
