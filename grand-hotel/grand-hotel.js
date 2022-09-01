console.log("Hello from the Hilbert's Grand Hotel");

// Global variables
let updated = true;
let clouds = [];
let time = 0;
let rate = 24;

// Hotel variables
DIM = 9;
GRID_SIZE = DIM * (DIM *2);
CELL_SIZE = 20;
rooms = [];
let maxWidth = 500;
let offset = (window.innerWidth - (DIM * CELL_SIZE)) / 2;
let canvasWidth = window.innerWidth < maxWidth ? window.innerWidth : maxWidth;
let canvasHeight = (DIM*CELL_SIZE*2) + 50;
let paddingX =  (canvasWidth - (DIM * CELL_SIZE)) / 2;

// Guest variables
let guests = [];
let guestId = 0;
let guestCount = DIM * DIM * 2;

// Reservations
let reservations = [];

function fullCycle() {
  moveReservations();
  fillVacancies();
  checkinGuests();
  drawFromBottom();
}

/**
 * Preload images.
 */
function preload() {
  cloudImg = loadImage('./assets/cloud.svg');
}

/**
 * Setup the canvas and hotel rooms.
 */
function setup() {
  frameRate(48);
  let canvas = createCanvas(DIM*CELL_SIZE + (paddingX * 2), canvasHeight);
  canvas.parent('canvas-wrapper');

  for (let i=0; i < 10; i++) {
    clouds.push(
      new Cloud(
        cloudImg, random(0, canvasWidth), 
        random(0,canvasHeight-200),
        random(.1,1),
        random(100,150)
        ));
  }
  
  for (let i = 0;
  i < GRID_SIZE; i++) {
    let roomNumber = i;
    let vacant = true;
    let guest = null;
    rooms.push(new Room(roomNumber, vacant, guest, "single"));
  }
  
  fillVacancies();
  checkinGuests();
  drawFromBottom();
}

/**
 * Fill the vacant rooms with guests.
 */
function fillVacancies() {
  // Create reservations for empty rooms
  let vacantRooms = getVacantRooms();
  let currentColor = color(random(50,255), random(50,255), random(50,255));
  rooms.forEach((room, index) => {
    if (room.vacant == true) {
      let newGuest = new Guest(getNewGuestId(), currentColor);
      guests.push(newGuest);
      let reservation = new Reservation(getNewGuestId, newGuest.id, room.id, day);
      reservations.push(reservation);
    }
  })
}

/**
 * Draw the hotel rooms from the bottom up.
 */
function drawFromBottom() {
  index = 0;
  offset = 0;
  for (let rowY = (DIM*2); rowY > 0; rowY--) {
    for (let columnX = 0; columnX < DIM; columnX++) {

      let positionX = 0 + paddingX + (columnX*CELL_SIZE);
      let positionY = (rowY*CELL_SIZE) - CELL_SIZE + (offset/2);
      let room = rooms[index];
      
      if (room.vacant == false) {
        let guest = room.guest;
        stroke(241,87,88);
        strokeWeight(5);
        fill(66,0,0);
        rect(positionX, positionY, CELL_SIZE, CELL_SIZE);
        // draw a circle at the center of the room
        noStroke();
        fill(guest.color);
        ellipse(positionX + (CELL_SIZE/2), positionY + (CELL_SIZE/2), CELL_SIZE/2, CELL_SIZE/2);
        rect(positionX + ((CELL_SIZE*.4)/2), positionY + (CELL_SIZE - CELL_SIZE/3 -2), CELL_SIZE*.6, CELL_SIZE/3);
      } else {
        fill(255);
        rect(positionX, positionY, CELL_SIZE, CELL_SIZE);
      }

      // room numbers
      // fill(255)
      // noStroke();
      // text(index, positionX + 2, positionY + CELL_SIZE - 2);
      
      // draw lobby
      fill(241,87,88);
      rect(paddingX-2.5, CELL_SIZE*DIM*2 + 2, CELL_SIZE*DIM + (5), 50);
      rect(paddingX-2.5, 0, CELL_SIZE*DIM + (5), 20);
      index++;
    }
  }
}

/**
 * Checks if there are any vacant rooms. Returns an array of vacant room ids.
 * @returns {object}
 */
function getVacantRooms() {
  let vacantRooms = [];
  rooms.forEach((room) => {
    if (reservations.find(reservation => reservation.room == room.id) == undefined) {
      vacantRooms.push(room.id);
    }
  }
  )
  return vacantRooms;
}

/**
 * Check in guests based on reservations.
 */
function checkinGuests() {
  clearRooms();
  reservations.forEach((reservation, index) => {
    let guest = guests.filter(_guest => _guest.id == reservation.guestId)[0];
    let room = rooms.filter(_room => _room.id == reservation.room)[0];
    room.guest = guest;
    room.vacant = false;
  })
}

/**
 * Create a new reservation for each guest with a doubled room number.
 */
function moveReservations() {
  let updatedReservations = [];
  rooms.forEach((room, index) => {
    if (!room.vacant && room.id * 2 < rooms.length - 1) {
      let roomId = (room.id * 2) + 1;
      let newReservation = new Reservation(getNewGuestId, room.guest.id, roomId, day);
      updatedReservations.push(newReservation);
    }
  }
  )

  // Check all the new reservations and set the rooms w/o reservations to vacant.
  rooms.forEach((room) => {
    let isVacant = updatedReservations.filter(res => res.room == room.id).length == 0
    if (isVacant) {
      room.vacant = true;
      room.guest = null;
    }
  })
  reservations = updatedReservations;
}

/**
 * Clear all the rooms.
 */
function clearRooms() {
  rooms.forEach((room) => {
    room.guest = null;
    room.vacant = true;
  }
)}

/**
 * Canvas draw loop.
 */
function draw() {
  rate = document.getElementById("timeSlider").value;
  background(128, 219, 255);

  if (time % ceil(rate/3) == 0 && time != 0 && rate != 240) {
    fullCycle();
  }

  if (time % ceil(rate/50) == 0 && rate != 240) {
    clouds.forEach((cloud) => {
      cloud.move();
    });
  } 
  
  clouds.forEach((cloud) => {
    cloud.draw();
  });

  drawFromBottom();
  time++;

}

/**
 * Helper function to increment guest ID.
 * @returns {number}
 */
function getNewGuestId() {
  guestId++;
  return guestId;
}
