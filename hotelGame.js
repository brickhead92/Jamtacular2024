//speed button - //let speedButton = 40; let normalSpeed = true; let doubleSpeed = false;
// automate people
// earning gold from customers, rooms and resturant.
//add images and sounds


"use strict";

let backgroundColour = 'grey';
let hotelName = 'CHARMING MINDS HOTEL - hotelGame';
let width = 900;
let height = 900;
let buildButton, mode;
let buttonSize = 40;
let roomWidth = 160; 
let roomHeight = 80;

let gold = 100;
let rating = 1; 
let happy = 1; //unsure how to rank this yet



///// Hotel passing of time /////
let dayCounter = 1;
let currentTime = 7 * 60; 
let lastUpdateTime = 0;
let pauseGame = false;
let buildMode = false;

// Define time periods in mins
const morningStart = 5 * 60; // 05:00 - 08:00
const morningEnd = 8 * 60;   
const dayStart = 8 * 60;     // 08:00 - 18:00
const dayEnd = 18 * 60;      
const eveningStart = 18 * 60; // 18:00 - 22:00 
const eveningEnd = 22 * 60;  
const nightStart = 22 * 60;  // 22:00 - 05:00 next day
const nightEnd = 5 * 60;    
const checkIn =  9 * 60;

const totalGameTime = 2 * 60; 


///// Event Stuff /////
let ratingEvent = true; 
let showHotel = true; 
let eventDuration = 10 * 500;  
let eventStartTime = -1;  

///// ROOMS /////
class room {
    constructor(x, y, roomWidth, roomHeight, colour, type, available) {
        this.x = x;
        this.y = y;
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.colour = colour;
        this.type = type;
        this.available = available;
        
    }

    draw() {
        
        fill(this.colour);
        rect(this.x, this.y, this.roomWidth, this.roomHeight);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.type, this.x + this.roomWidth / 2, this.y + this.roomHeight / 2);
    }

    

    changeRoomType(newType) {
        this.type = newType;
    }



}

let rooms = [];
let selectedRoom = null;
let showRoomSelect = false;
let roomSelectText = "Input room type number and hit enter to purchase:";
let inputNumber = '';
let roomChoices = ['Empty', 'Single', 'Double', 'Family', 'Restaurant', 'Cauldron'];


///// CUSTOMERS /////
let customer, reception, elevator, customerImage;
let customerColour = "blue";
//let customerArrive = false;


let throwables, player;

function preload() {
    // assets needed 
    customerImage = loadImage("./person.png");

}

function setup() {
    createCanvas(width, height);
    displayMode("normal");
    throwables = new Throwables()
    throwables.setup()
    player = new Player()
    world.gravity.y = 10;
    spriteSetup();
}

function draw() {
    background(backgroundColour);

    //make reception sprite visible for testing
    //reception.visible = false;
    //elevator.visible = false;


    if (!pauseGame) {
        updateTime();
    }

    drawTimes();
    drawStatusBars();  
    drawButton();  
    drawPauseButton(); 

    if (showHotel) { //so hotel can hide for events.
        drawBuilding();  
        for (let room of rooms) {
            room.draw(); 
        }
    }

    if (buildMode) {
        backgroundColour = 'gold';
        hotelName = 'BUILDMODE - Click on a room to upgrade its room type';
        buildMenu();
    }
    else{
        backgroundColour = 'grey';
        hotelName = 'CHARMING MINDS HOTEL - hotelGame';
    }

    if (showRoomSelect){
        drawRoomSelect();
    }

    // event timing
    if (eventStartTime !== -1 && millis() - eventStartTime > eventDuration) {

        endEvent();
    }

    if (eventStartTime !== -1) {
        let timeLeft = Math.max(0, eventDuration - (millis() - eventStartTime)) / 1000;
        displayCountdown(timeLeft);
    }

    //if (currentTime === checkIn) {
    //    customersArrive = !customerArrive;  
    //    console.log("Check if rooms available");

    //}    


    movement(customer);

}




///// MOUSE CLICKS /////
function mousePressed() {
    if(buildMode){
        for(let room of rooms){
            if(mouseX > room.x && mouseX < room.x + room.roomWidth &&
                mouseY > room.y && mouseY < room.y + room.roomHeight){
        
                selectedRoom = room;
                showRoomSelect = true;
                inputNumber = "";
                break;
            }
        }
    }
    
    // Trigger rating event
    if (ratingEvent && dayCounter === 1 && currentTime >= eveningStart && currentTime < eveningEnd) {
        ratingEvent = false;  
        triggerEvent();
    }

    if (mouseX > 560 && mouseX < 560 + 80 && mouseY > 10 && mouseY < 10 + 40) {
        buildMode = !buildMode;
    }

    // Pause/play button
    if (mouseX > width - buttonSize - 190 && mouseX < width - 190 && mouseY > 10 && mouseY < buttonSize + 10) {
        pauseGame = !pauseGame;
    }
}



///// HOTEL TIMES /////
function updateTime() {
    let currentTimeMillis = millis(); 
    if (currentTimeMillis - lastUpdateTime >= (totalGameTime * 1000) / 1440) {
        currentTime += 1;
        lastUpdateTime = currentTimeMillis; 

        if (currentTime >= 1440) {
            currentTime -= 1440; // restart for new day
            dayCounter++; 
        }
        if (dayCounter > 4) {
            noLoop();  
        }
    }
}

function drawTimes() {
    let hours = Math.floor(currentTime / 60);
    let minutes = Math.floor(currentTime % 60);
    let formattedTime = nf(hours, 2) + ":" + nf(minutes, 2);
    let status;

    if (currentTime >= morningStart && currentTime < morningEnd) {
        status = "Morning";
    } else if (currentTime >= dayStart && currentTime < dayEnd) {
        status = "Day";
        
    } else if (currentTime >= eveningStart && currentTime < eveningEnd) {
        status = "Evening";
        if (dayCounter === 1 && ratingEvent) {
            triggerEvent(); 
        }
        
    } else {
        status = "Night";
    }
    fill(255);
    textSize(25);
    let timeWidth = textWidth(formattedTime);
    let statusWidth = textWidth(status);
    let dayCounterText = "Day: " + dayCounter;
    let dayCounterWidth = textWidth(dayCounterText);
    let x = width - Math.max(timeWidth, statusWidth, dayCounterWidth) - 10; 
    let y = 30; 
    text(formattedTime, x, y);
    text(status, x, y + 30); 
    text(dayCounterText, x, y + 60);
}



///// BUTTONS /////
function drawButton(){
    let buildColour;
    if(buildMode){
        buildColour = 'green';
        mode = 'PLAY';
        buildMode = true;
        pauseGame = true;
    }
    else{
        buildColour = 'gold';
        mode = 'BUILD';
        buildButton = false;
        
    }
    fill(buildColour);
    rect(560, 10, 80, buttonSize, 5); 
    fill("black");
    textAlign(CENTER, CENTER);
    textSize(20);
    text(mode, 600, 32);
}


function drawPauseButton(){
    let pauseColour;
    let symbol;
    if(pauseGame){
        pauseColour = 'green';
        symbol = '►';
        pauseGame = true;
    }
    else{
        pauseColour = 'red';
        symbol = '▐▐ ';
        pauseGame = false;
    }
    fill(pauseColour);
    rect(width - buttonSize - 190, 10, buttonSize, buttonSize, 5); 
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(symbol, width - buttonSize / 2 - 190, buttonSize / 2 + 10);
}




