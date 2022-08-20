console.log('hello from the grand hotel');

class Guest {
  constructor(id, roomNumber=null, color) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.color = color;
  }
}

class Room {
  constructor(roomNumber, vacant, guest, type) {
    this.roomNumber = roomNumber;
    this.vacant = vacant;
    this.guest = guest;
    this.type = type;
  }
}

// Global variables
let updated = false;
let offset = 50;

// Hotel
DIM = 9;
GRID_SIZE = DIM * (DIM *2);
CELL_SIZE = 25;
rooms = [];

// Guests
let guests = [];
// let guestCount = DIM * DIM;
let guestCount = 20;

function setup() {
  let canvas = createCanvas((DIM * CELL_SIZE) + (offset*2), (DIM * 2 * CELL_SIZE) + (offset*2));
  canvas.parent('canvas-wrapper');

  background(100);
  
  // Create guests
  for (let i = 0; i < guestCount; i++) {
    let guestColor = color(random(50,255), random(50,255), random(50,255));
    guests.push(new Guest(i, i, guestColor));
  }
  
  // Create rooms
  for (let i = 0; i < GRID_SIZE; i++) {
    let roomNumber = i;
    let vacant = true;
    let guest = null;
    rooms.push(new Room(roomNumber, vacant, guest, "single"));
  }
  console.log("create:", rooms);
      
  checkinGuests();
}
// Draw rooms
function drawRooms() {
  console.log("drawRooms");
 for (let i = 0; i < DIM; i++) {
  for(let j = 0; j < (DIM*2); j++) {
    let index = i + j * DIM;

    let room = rooms[index];
  
    if (room.vacant == false) {
      let guest = room.guest;
      console.log(guest);
      fill(guest.color);
      rect(i * CELL_SIZE + offset, j * CELL_SIZE+ offset, CELL_SIZE, CELL_SIZE);
    } else {
      fill(255);
      rect(i * CELL_SIZE + offset, j * CELL_SIZE+ offset, CELL_SIZE, CELL_SIZE);
      blue += 10;
    }
    // write the index to the cell
    fill(0)
    text(index, (i * CELL_SIZE) + 4+ offset, (j * CELL_SIZE) + 18+offset);

  }
}
}


function mousePressed() {
  console.log("mousePressed");
  guests.push( new Guest(30, 30,  color(random(255), random(255), random(255))));
  updated = false;
}

// Checkin Guests
function checkinGuests() {
    for (let i = 0; i < guests.length; i++) {
      let guest = guests[i];
      let room = rooms[guest.roomNumber];
      room.guest = guest;
      room.vacant = false;
    }
}


function draw() {
  if(!updated) {
    checkinGuests();
    drawRooms();
    updated = true;
  }
}

function getRandomRGB() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  return {red: r, green: g, blue: b};
}

people = [0, 1, 2, 3, 4, 5, 6, 7, 8];

class Booking {
  constructor(id, roomNumber, guest) {
    this.id = id;
    this.roomNumber = roomNumber;
    this.guest = guest;
  }

  fillMultiARray(array, value) {
    for (let i = 0; i < array.length; i++) {
      array[i] = value;
    }
  }
}


multiDimArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];

multiDimArray[2][2]


