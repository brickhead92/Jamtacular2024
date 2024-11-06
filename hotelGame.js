//speed button - //let speedButton = 40; let normalSpeed = true; let doubleSpeed = false;
// automate people

// bars - gold, rating, witch happiness? 
// add cost of rooms to upgrade
// earning gold from customers, rooms and resturant.

//add images and sounds



"use strict";

let backgroundColour = 125;
let hotelName = 'CHARMING MINDS HOTEL - hotelGame';
let width = 900;
let height = 900;
let buildButton, mode;
let buttonSize = 40;
let roomWidth = 160; 
let roomHeight = 80;

let gold = 100;
let rating = 1; //star
let happy = 'neutral'; //unsure how to rank this yet

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

const totalGameTime = 2 * 60; // x minutes in seconds for a full day


///// Event Stuff /////
let ratingEvent = true; 
let showHotel = true; 
let eventDuration = 10 * 500;  
let eventStartTime = -1;  

// Room Info
class room {
    constructor(x, y, roomWidth, roomHeight, colour, type, upgradeCost = 20) {
        this.x = x;
        this.y = y;
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.colour = colour;
        this.type = type;
        this.upgradeCost = upgradeCost;
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


    // starting upgrade costs
    //upgradeCost(type){
    //    const costs = {
    //        'empty' : 0,
    //        'single' : 20,
    //        'double' : 30,
    //        'family' : 40,
    //        'restaurant' : 40,
    //        'cauldron' : 30,
    //    };

    //    return costs [type];
    //}

}

let rooms = [];
let selectedRoom = null;
let showRoomSelect = false;
let roomSelectText = "Enter a room type number: ";
let inputNumber = '';
let roomChoices = ['1. Empty', '2. Single', '3. Double', '4. Family', '5. Restaurant', '6. Cauldron'];


function preload() {
    // assets needed 
}

function setup() {
    createCanvas(width, height);
    rooms.push(new room(160, 650, roomWidth, roomHeight, 'pink', 'single'));
    rooms.push(new room(320, 650, roomWidth, roomHeight, 'pink', 'restaurant'));
    rooms.push(new room(480, 650, roomWidth, roomHeight, 'pink', 'cauldron'));
    rooms.push(new room(160, 570, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(320, 570, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(480, 570, roomWidth, roomHeight, 'pink', 'empty'));
    
    rooms.push(new room(160, 490, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(320, 490, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(480, 490, roomWidth, roomHeight, 'pink', 'empty'));

    rooms.push(new room(160, 410, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(320, 410, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(480, 410, roomWidth, roomHeight, 'pink', 'empty'));

    rooms.push(new room(160, 330, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(320, 330, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(480, 330, roomWidth, roomHeight, 'pink', 'empty'));

    rooms.push(new room(160, 250, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(320, 250, roomWidth, roomHeight, 'pink', 'empty'));
    rooms.push(new room(480, 250, roomWidth, roomHeight, 'pink', 'empty'));
    
}

function draw() {
    background(backgroundColour);

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
        backgroundColour = 'yellow';
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

function drawStatusBars(){
    textAlign(LEFT);    
    text("Witch Happiness: "+ happy, 30, 40);
    text("Star Rating: " + rating, 30, 75);
    text("Gold: " + gold, 30, 110);
}


//// TRIGGER RATING EVENT /////
function triggerEvent() {
    pauseGame = true;  
    showHotel = false;  
    eventStartTime = millis();  
    fill(255);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('RATING GAME TRIGGERED CLICK TO START', width / 2, height / 2);
}

function endEvent() {
    pauseGame = false;  
    showHotel = true;  
    eventStartTime = -1; 
}

function displayCountdown(timeLeft) {
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Event Ends In: ${Math.floor(timeLeft)}seconds`, width / 2, height / 2 + 50);
}


///// BUILDING DRAWING /////
function drawBuilding() {
    fill('orange');
    rect(100, 730, 600, 50); // reception
    fill('white');
    text('RECEPTION', 400, 750);

    rect(100, 200, 600, 530); // building
    triangle(60, 220, 740, 220, 400, 25); // roof
    fill('black');
    text(hotelName, 400, 190);
}

function buildMenu() {
    let buttonHeight = 40;
    for (let i = 0; i < roomChoices.length; i++) {
        let yPosition = 280 + (i * (buttonHeight + 10));
        fill('white');
        rect(720, yPosition, 160, buttonHeight, 5);
        fill('black');
        text(roomChoices[i], 800, yPosition + buttonHeight / 2);
    }

}

function keyPressed(){
    if (showRoomSelect) {
        if (keyCode === ESCAPE) {
            showRoomSelect = false;
            inputNumber = "";  
        } else if (keyCode === ENTER && inputNumber) {

            const typeIndex = parseInt(inputNumber) - 1;
            if (typeIndex >= 0 && typeIndex < roomChoices.length) {
                const roomType = roomChoices[typeIndex].split('.')[1].trim();  
                selectedRoom.changeRoomType(roomType);  
            }
            showRoomSelect = false;  
            inputNumber = "";  
        } else if (key >= '1' && key <= '6') {

            inputNumber += key;
        }
    }
}

function drawRoomSelect(){
    fill(0, 0, 0, 150); 
    rect(150, 300, 500, 150, 10);  
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(roomSelectText, width/2 -50, 330);

    textSize(30);
    text(inputNumber, width/2 -50, 370);

    textSize(18);
    text("Press 1-6 for room type or ESC to cancel", width/2 -50, 420)
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
        buildColour = 'yellow';
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


