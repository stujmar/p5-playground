console.log("grand-hotel-class.js");

class Guest {
  constructor(id, color, keycard=null) {
    this.id = id;
    this.color = color;
    this.keycard = keycard;
  }
}

class Room {
  constructor(id, vacant, guest, type) {
    this.id = id;
    this.vacant = vacant;
    this.guest = guest;
    this.type = type;
  }
}

class Reservation {
  constructor(id, guestId, roomId, date) {
    this.id = id;
    this.date = date;
    this.guestId = guestId;
    this.room = roomId;
  }
}

class Cloud {
  constructor(img, x, y, speed=1, width=140) {
    this.img = img;
    this.speed = speed;
    this.width = width;
    this.height = this.width/1.75;
    this.x = x;
    this.y = y;
  }

  draw() {
    image(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x = this.x > width ? this.x = -150 : this.x += this.speed;
  }
}