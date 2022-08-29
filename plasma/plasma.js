console.log('... plasma loading ...');

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

// size of canvas
const imgSize = 512;
const imgWidth = window.innerWidth;

canvas.width = imgSize;
canvas.height = imgSize;

// c1 and c2 are colors
// f is a fraction between 0..1
//
// returns an interpolated color between 
//   c1 (for f=0) and
//   c2 (for f=1)
//
// pass f=0.5 to get the color half-way between c1 and c2
const interpolate = (c1, c2, f) => {
  
  return {
    r: Math.floor(c1.r + (c2.r - c1.r) * f),
    g: Math.floor(c1.g + (c2.g - c1.g) * f),
    b: Math.floor(c1.b + (c2.b - c1.b) * f)
  };
};

// generates an array of 256 colors 
// forming a linear gradient of the form
// [c1, ..., c2]
const linearGradient = (c1, c2) => {
  const g = [];
  // interpolate between the colors in the gradient
  for (let i = 0; i < 256; i++) {
    const f = i / 255;
    g[i] = interpolate(c1, c2, f);
  }
  return g;
};

let palette = linearGradient(
  { r: 255, g: 255, b: 255 },  // c1 yellow
  { r: 200, g: 54, b: 128 }    // c2 dark blue
);

const image = c.createImageData(imgSize, imgSize);

for (let i = 0; i < image.data.length; i += 4) {
  image.data[i] = 0; // Red
  image.data[i + 1] = 0; // Green
  image.data[i + 2] = 0; // Blue
  image.data[i + 3] = 255; // Alpha
}

// size of your height maps
const mapSize = 1024;

// returns the distance of point x,y from the origin 0,0
const distance = (x, y) => Math.sqrt(x*x + y * y);

// init height map 1
const heightMap1 = [];
for (let u=0; u<mapSize; u++) {
  for (let v=0; v<mapSize; v++) {
    // console.log("looping?");
    // index of coordiante in height map array
    const i  = u * mapSize + v;

    // u,v are coordinates with origin at upper left corner
    // cx and cy are coordinates with origin at center of canvas/map
    const cx = u - mapSize/2;
    const cy = v - mapSize/2;

    // distance from the middle of map
    const d = distance(cx, cy);

    // stretching so we get the desired ripple density on our map
    const stretch = (3*Math.PI) / (mapSize/2);

    // wavy height value between -1 and 1
    const ripple = Math.sin(d * stretch);

    // wavy height value normalized to 0-1
    const normalized = (ripple + 1) / 2;

    // height map value 0 to 128, integer
    heightMap1[i] = Math.floor(normalized * 128);
  }
}

const heightMap2 = [];
for (let u = 0; u < mapSize; u++) {
  for (let v = 0; v < mapSize; v++) {
    const i = u * mapSize + v;
    const cx = u - mapSize / 2;
    const cy = v - mapSize / 2;

    // skewed distance as input to chaos field calculation,
    // scaled for smoothness over map distance
    const d1 = distance(0.8 * cx, 1.3 * cy) * 0.022;
    const d2 = distance(1.35 * cx, 0.45 * cy) * 0.022;

    const s = Math.sin(d1);
    const c = Math.cos(d2);
    // height value between -2 and +2
    const h = s + c;

    // height value between 0..1
    const normalized = (h + 2) / 4;
    // height value between 0..127, integer
    heightMap2[i] = Math.floor(normalized * 127);
  }
}

// offsets for height maps
// for now, we leave them at upper left corner

let dx1 = 0;
let dy1 = 0;

let dx2 = 0;
let dy2 = 0;

// update our image data array with greyscale values
// as per our height maps
const updateImageData = () => {
  for (let u = 0; u < imgSize; u++) {
    for (let v = 0; v < imgSize; v++) {
      // indexes into height maps for pixel
      const i = (u + dy1) * mapSize + (v + dx1);
      const k = (u + dy2) * mapSize + (v + dx2);

      // index for pixel in image data
      // remember it's 4 bytes per pixel
      const j = u * imgSize * 4 + v * 4;



      // height value of 0..255
      let h = heightMap1[i] + heightMap2[k];

      // greyscale color according to height
      // let c = { r: h, g: h, b: h };
      let c = palette[h];

      // set pixel data
      image.data[j] = c.r;
      image.data[j + 1] = c.g;
      image.data[j + 2] = c.b;
    }
  }
};

// offsets for moving height maps
// let dx1 = 0;
// let dy1 = 0;

// let dx2 = 0;
// let dy2 = 0;

// adjust height maps offsets
const moveHeightMaps = t => {
  dx1 = Math.floor(
    (((Math.cos(t * 0.0002 + 0.4 + Math.PI) + 1) / 2) * mapSize) / 2
  );
  dy1 = Math.floor(
    (((Math.cos(t * 0.0003 - 0.1) + 1) / 2) * mapSize) / 2
  );
  dx2 = Math.floor(
    (((Math.cos(t * -0.0002 + 1.2) + 1) / 2) * mapSize) / 2
  );
  dy2 = Math.floor(
    (((Math.cos(t * -0.0003 - 0.8 + Math.PI) + 1) / 2) * mapSize) / 2
  );
};

const tick = time => {
  moveHeightMaps(time);
  updateImageData();

  c.putImageData(image, 0, 0);

  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);