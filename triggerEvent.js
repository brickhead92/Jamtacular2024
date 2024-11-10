//// TRIGGER RATING EVENT /////
function triggerEvent() {
    pauseGame = true;  
    // showHotel = false;  
    eventStartTime = millis();  
    fill(0);
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
    pauseGame = false;
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Event Ends In: ${Math.floor(timeLeft)}seconds`, width / 2, height - 50);
}
