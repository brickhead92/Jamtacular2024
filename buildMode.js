"use strict"

function drawStatusBars(){
    textAlign(LEFT);    
    text("Witch Happiness: "+ happy, 30, 40);
    text("Star Rating: " + rating, 30, 75);
    text("Gold: " + gold, 30, 110);
}

// starting upgrade costs
function upgradeCost(type){
    const costs = {
        'Empty' : 0,
        'Single' : 20,
        'Double' : 30,
        'Family' : 40,
        'Restaurant' : 40,
        'Cauldron' : 50,
    };

    return costs [type];
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
                
                const roomType = roomChoices[typeIndex];
                const roomCost = upgradeCost(roomType);

                if(gold >= roomCost){
                    gold -= roomCost;

                    selectedRoom.changeRoomType(roomType);
                    if(roomType === 'Cauldron'){
                        happy += 1;

                    }

                }else{
                    console.log('Not enough gold to get this room!')
                }
            }
            showRoomSelect = false;  
            inputNumber = "";  
        } else if (key >= '1' && key <= '6') {

            inputNumber += key;
        }
    }
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
