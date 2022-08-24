console.log('hello from the grand hotel');

class Guest {
  constructor(id, color, keycard=null) {
    this.id = id;
    this.color = color;
    this.keycard = keycard;
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

class Reservation {
  constructor(id, guest, room, date) {
    this.id = id;
    this.date = date;
    this.guest = guest;
    this.room = room;
  }
}

// Global variables
let updated = false;

// Hotel
DIM = 9;
GRID_SIZE = DIM * (DIM *2);
CELL_SIZE = 25;
rooms = [];
let offset =  (window.innerWidth - (DIM * CELL_SIZE)) / 2;

// Guests
let guests = [];
let guestCount = DIM * DIM * 2;

// Reservations
let reservations = [];

function setup() {
  // let canvas = createCanvas((DIM * CELL_SIZE) + (offset*2), (DIM * 2 * CELL_SIZE) + (offset*2));
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-wrapper');

  background(100);
  
  // Create guests
  let firstGuestColor = color(random(50,255), random(50,255), random(50,255));
  for (let i = 0; i < guestCount; i++) {
    let guestColor = firstGuestColor;
    guests.push(new Guest(i, guestColor));
  }
  
  // Create rooms
  for (let i = 0; i < GRID_SIZE; i++) {
    let roomNumber = i;
    let vacant = true;
    let guest = null;
    rooms.push(new Room(roomNumber, vacant, guest, "single"));
  }
  // console.log("create:", rooms);
      
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
        fill(guest.color);
        rect(i * CELL_SIZE + offset, j * CELL_SIZE + (offset/2), CELL_SIZE, CELL_SIZE);
      } else {
        fill(255);
        rect(i * CELL_SIZE + offset, j * CELL_SIZE + (offset/2), CELL_SIZE, CELL_SIZE);
        blue += 10;
      }

    // write the index to the cell
    fill(0);
    text(index, (i * CELL_SIZE) + 2 + offset, (j * CELL_SIZE) + 18 + (offset/2));

    }
  }
}

function drawFromBottom() {
  index = 0;
  for (let rowY = (DIM*2); rowY > 0; rowY--) {
    for (let columnX = 0; columnX < DIM; columnX++) {

      let positionX = 0 + offset + (columnX*CELL_SIZE);
      let positionY = (rowY*CELL_SIZE) - CELL_SIZE + (offset/2);
      let room = rooms[index];
      
      if (room.vacant == false) {
        let guest = room.guest;
        noStroke();
        fill(guest.color);
        rect(positionX, positionY, CELL_SIZE, CELL_SIZE);
        // draw a circle at the center of the room
        fill(255,200,245);
        ellipse(positionX + (CELL_SIZE/2), positionY + (CELL_SIZE/2), CELL_SIZE/2, CELL_SIZE/2);
      } else {
        fill(255);
        rect(positionX, positionY, CELL_SIZE, CELL_SIZE);
      }

      fill(0)
      noStroke();
      text(index, positionX, positionY + CELL_SIZE);
      index++;
    }
  }
}

function moveGuest(guestID, roomID) {
  let oldRoom = ""; // find the old room by guestID
  let guest = ""; // find the guest by guestID
  let newRoom = ""; // find the new room by roomID

  oldRoom.guest = null; // set the old room to vacant
  oldRoom.vacant = true; // set the old room to vacant

  newRoom.guest = guest; // set the new room to the guest
  newRoom.vacant = false; // set the new room to not vacant
  
}

function mousePressed() {
  console.log("mousePressed");
  // guests.push( new Guest(30, color(random(255), random(255), random(255))));
  // updated = false;
}

// Checkin Guests
function checkinGuests() {
    for (let i = 0; i < guests.length; i++) {
      let guest = guests[i];
      let room = rooms[i];
      // console.log("checkin:", guest, room, i);
      room.guest = guest;
      room.vacant = false;
    }
}

function draw() {
  if(!updated) {
    checkinGuests();
    drawFromBottom();
    updated = true;
  }
}

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
