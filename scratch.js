console.log("----------");
const tiles = [];

function preload() {
  tiles[0] = loadImage("/assets/tile_blank.png");
  tiles[1] = loadImage("/assets/tile_up.png");
  tiles[2] = loadImage("/assets/tile_right.png");
  tiles[3] = loadImage("/assets/tile_down.png");
  tiles[4] = loadImage("/assets/tile_left.png");
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(151);
  image(tiles[0], 0, 0, 50, 50);
  image(tiles[1], 50, 0, 50, 50);
  image(tiles[2], 100, 0, 50, 50);
  image(tiles[3], 150, 0, 50, 50);
  image(tiles[4], 0, 50, 50, 50);
}
