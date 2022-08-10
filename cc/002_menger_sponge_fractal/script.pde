
class Box {
  PVector pos;
  float r;

  Box(float x, float y, float z, float r_) {
    pos = new PVector(x, y, z);
    r = r_;
  }

  ArrayList<Box> generate() {
    ArrayList<Box> boxes = new ArrayList<Box>();
    for (int x = -1; x < 2; x++) {
      for (int y = -1; y < 2; y++) {
        for (int z = -1; z < 2; z++) {
          int sum = abs(x) + abs(y) + abs(z);
          if (sum > 1) {
          float newR = r/3;
          Box b = new Box(pos.x + x*newR, pos.y + y*newR, pos.z + z*newR, newR);
          boxes.add(b);
          }
        }
      }
    }
    return boxes;
  }

  void show() {
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    fill(10, 10, 10);
    box(r);
    popMatrix();
  }

}

int detailLevel = 3;
int clickCount = 0;
float a = 0;
ArrayList<Box> sponge = new ArrayList<Box>();
Box b = new Box(0,0,0, 200);

void setup() {
  size(400, 400, P3D);
  sponge.add(b);
}

void reset() {
  sponge = new ArrayList<Box>();
  sponge.add(b);
  clickCount = 0;
}

void mousePressed() {
  // log the current state of the sponge
  if (clickCount < detailLevel) {
    ArrayList<Box> next = new ArrayList<Box>();
    for (Box b : sponge) {
      ArrayList<Box> newBoxes = b.generate();
      next.addAll(newBoxes);
    }
    sponge = next;
    clickCount++;
  } else {
    reset();
  }
}

void draw() {
  background(51);
  stroke(255);
  noFill();

  translate(width / 2, height / 2);
  rotateX(a);
  rotateY(a);
  // old way
  // box(200);
  for (Box b: sponge) {
    b.show();
  }
  // b.show();
  a += 0.01;
}