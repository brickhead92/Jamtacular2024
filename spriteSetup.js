function spriteSetup(){

    rooms.push(new room(160, 650, roomWidth, roomHeight, 'brown', 'Single', true));
    rooms.push(new room(320, 650, roomWidth, roomHeight, 'brown', 'Restaurant', true));
    rooms.push(new room(480, 650, roomWidth, roomHeight, 'brown', 'Cauldron', false));
    rooms.push(new room(160, 570, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(320, 570, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(480, 570, roomWidth, roomHeight, 'brown', 'Empty', true));
    
    rooms.push(new room(160, 490, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(320, 490, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(480, 490, roomWidth, roomHeight, 'brown', 'Empty', true));

    rooms.push(new room(160, 410, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(320, 410, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(480, 410, roomWidth, roomHeight, 'brown', 'Empty', true));

    rooms.push(new room(160, 330, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(320, 330, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(480, 330, roomWidth, roomHeight, 'brown', 'Empty', true));

    rooms.push(new room(160, 250, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(320, 250, roomWidth, roomHeight, 'brown', 'Empty', true));
    rooms.push(new room(480, 250, roomWidth, roomHeight, 'brown', 'Empty', true));
    

    customer = new Group();
    for(let i = 0; i < 1; i++){
        let x = 400;
        let y1 = 900;
        //let y2 = 800;

        customer.push(makeWalkingCustomer(x, y1));
        //customer.push(makeWalkingCustomer(x, y2));
    }   


    reception = createSprite(400, 745, 100, 10, 'static'); 
    reception.shapeColor = "green";

    elevator = createSprite(130, 750, 50, 60, 'static');  
    elevator.shapeColor = "blue";

    // customer.overlaps(reception);
    customer.overlaps(elevator);
    

}

//Need to make rooms available first. Then customers come at 10:00?
function movement(spriteName){
    for(let i = 0; i < spriteName.length; i++){
        let sprite = spriteName[i];
        let up = true;
        let down = false;


        if(up === true){
            sprite.position.y -= 1;
        }
        else if (up === false){
            sprite.position.y -= 0;
        }
        if(down === true){
            sprite.position.y += 1;
        }
        else if (up === false){
            sprite.position.y += 0;
        }
        else if(sprite.position.y > height){
            sprite.remove();
            console.log("Removed sprite");
        }
    

        if(sprite.collide(reception)){
            sprite.y = 0;
            console.log('Customer wants to book a room');
            

            //if room available book customer in.
            for(let room of rooms){
                if(room.available === false){
                    console.log('Sorry no available rooms.');
                    

                    return;
                }
                else if(room.type === 'Single' && room.available === true){
                    console.log('Room is free to book');
                    gold += 4;
                    up = false;
                    room.available = false;
                    return;
                }
            }
        }
    }
}



function makeWalkingCustomer(x, y){
    let tempWalkingCustomer = createSprite(x, y, 10, 10, 'static');
    //tempWalkingCustomer.shapeColour = customerColour;
    tempWalkingCustomer.addImage(customerImage);
    tempWalkingCustomer.scale = 1.7;
    return tempWalkingCustomer;
}
