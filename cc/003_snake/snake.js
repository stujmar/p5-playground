function Snake() {
  this.x = 0;
  this.y = 0;
  this.length = 0;
  this.tail = [];
  this.xspeed = cell_size;
  this.yspeed = 0;
  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.eat = function(food) {
    let snakeCol = floor(this.x / cell_size);
    let snakeRow = floor(this.y / cell_size);
    if (snakeCol === food.x && snakeRow === food.y) {
      score.total++;
      this.length++;
      food = pickLocation();
    }
  }

  this.death = function() {
    for (var i = 0; i < this.tail.length; i++) {
      
      console.log("head:", this.x/cell_size, this.y/cell_size, cell_size);
      console.log("tail:",this.tail[i].x, this.x)
      if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
        console.log("death");
        return true;
      }
    }
  }

  this.reset = function() {
    this.x = 0;
    this.y = 0;
    this.length = 0;
    this.tail = [];
  }

  this.update = function() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1]; // move all elements in the array one step forward
    }
    this.tail[this.length - 1] = createVector(this.x, this.y); // add a new element to the end of the array

    if (this.x + this.xspeed > width - 20) {
      this.x = 0;
    } else if (this.x + this.xspeed < 0) {
      this.x = width;
    } else {
      this.x = this.x + this.xspeed;
    }

    if (this.y + this.yspeed > height -20) {
      this.y = 0;
    } else if (this.y + this.yspeed < 0) {
      this.y = height;
    } else {
      this.y = this.y + this.yspeed;
    }


    // this.x = constrain(this.x, 0, game_width - grid_size);
    // this.y = constrain(this.y, 0, game_height - grid_size);

    this.death();
  }
s
  this.show = function() {
    for (let i = 0; i < this.tail.length; i++) {
      fill(240);
      rect(this.tail[i].x, this.tail[i].y, grid_size, grid_size);
    }
    fill(255,255,255);
    rect(this.x, this.y, grid_size, grid_size);
  }

}