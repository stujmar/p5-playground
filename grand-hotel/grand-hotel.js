console.log('hello from the grand hotel');

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

// Global variables
let updated = true;

// Hotel
DIM = 9;
GRID_SIZE = DIM * (DIM *2);
CELL_SIZE = 30;
rooms = [];
let offset =  (window.innerWidth - (DIM * CELL_SIZE)) / 2;

// Guests
let guests = [];
let guestId = 0;
let guestCount = DIM * DIM * 2;

// Reservations
let day = 1;
let reservations = [];

// add event listeners
document.getElementById("move-reservations").addEventListener("click", moveReservations);
document.getElementById("new-group").addEventListener("click", fillVacancies);
document.getElementById("checkin").addEventListener("click", checkinGuests);
document.getElementById("redraw").addEventListener("click", drawFromBottom);
document.getElementById("full-cycle").addEventListener("click", fullCycle);

function fullCycle() {
  moveReservations();
  fillVacancies();
  checkinGuests();
  drawFromBottom();
}

function setup() {
  console.log("day:", day);
  // let canvas = createCanvas(windowWidth, windowHeight);
  let canvas = createCanvas(DIM*CELL_SIZE, DIM*CELL_SIZE*2);
  canvas.parent('canvas-wrapper');

  background(100);
  
  // Create guests
  // let firstGuestColor = color(random(50,255), random(50,255), random(50,255));
  // for (let i = 0; i < guestCount; i++) {
  //   let guestColor = firstGuestColor;
  //   guests.push(new Guest(i, guestColor));
  // }

  // console.log(guests)
  // Create rooms
  for (let i = 0; i < GRID_SIZE; i++) {
    let roomNumber = i;
    let vacant = true;
    let guest = null;
    rooms.push(new Room(roomNumber, vacant, guest, "single"));
  }
  
  fillVacancies();
  checkinGuests();
  drawFromBottom();
}

function fillVacancies() {
  // console.log("fillVacancies:", reservations);
  // Create reservations for empty rooms
  let vacantRooms = getVacantRooms();
  let currentColor = color(random(50,255), random(50,255), random(50,255));
  rooms.forEach((room, index) => {
    if (room.vacant == true) {
      let newGuest = new Guest(getNewGuestId(), currentColor);
      guests.push(newGuest);
      let reservation = new Reservation(getNewId, newGuest.id, room.id, day);
      console.log("pushing:", reservation);
      reservations.push(reservation);
      // console.log("room after:", room, reservation);
    }
  })
  // console.log("fillVacancies:", reservations);
}

function drawFromBottom() {
  index = 0;
  offset = 0;
  for (let rowY = (DIM*2); rowY > 0; rowY--) {
    for (let columnX = 0; columnX < DIM; columnX++) {

      let positionX = 0 + offset + (columnX*CELL_SIZE);
      let positionY = (rowY*CELL_SIZE) - CELL_SIZE + (offset/2);
      let room = rooms[index];
      
      if (room.vacant == false) {
        // console.log(room)
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
  fullCycle();
  // console.log(guests, rooms, reservations);
  // guests.push( new Guest(30, color(random(255), random(255), random(255))));
  // updated = false;
}

// Checkin Guests
function checkinGuests() {
  clearRooms();
  // console.log("checkinGuests", guests);
  reservations.forEach((reservation, index) => {
    let guest = guests.filter(_guest => _guest.id == reservation.guestId)[0];
    let room = rooms.filter(_room => _room.id == reservation.room)[0];
    // console.log("guest:", guest, "room:", room, reservation);
    room.guest = guest;
    room.vacant = false;
  })
    // for (let i = 0; i < guests.length; i++) {
    //   let guest = guests[i];
    //   let room = rooms[i];
    //   // console.log("checkin:", guest, room, i);
    //   room.guest = guest;
    //   room.vacant = false;
    // }
}

function moveReservations() {
  console.log("old reservations:", reservations);
  let updatedReservations = [];
  console.log("moveReservations");
  rooms.forEach((room, index) => {
    if (!room.vacant && room.id * 2 < rooms.length - 1) {
      let roomId = room.id * 2;
      let newReservation = new Reservation(getNewId, room.guest.id, roomId, day);
      updatedReservations.push(newReservation);
    }
  }
  )
  // Set rooms w/o reservations to vacant
  rooms.forEach((room) => {
    let isVacant = updatedReservations.filter(res => res.room == room.id).length == 0
    console.log(room.id, isVacant);
    if (isVacant) {
      room.vacant = true;
      room.guest = null;
    }
  })
  reservations = updatedReservations;
  console.log("new reservations:", reservations);
  console.log("new rooms:", rooms);
}

function clearRooms() {
  rooms.forEach((room, index) => {
    room.guest = null;
    room.vacant = true;
  }
)}


function draw() {
  if(!updated) {
    console.log("updating")
    // checkinGuests();
    // drawFromBottom();
    updated = true;
  }
}

function getNewGuestId() {
  guestId++;
  return guestId;
}

function getNewId() {
  guestId++;
  return guestId;
}
