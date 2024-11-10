//// TRIGGER RATING EVENT /////
function triggerEvent() {
    pauseGame = true;
    console.log("Trigger Event Pause");
    // showHotel = false;  
    eventStartTime = millis();  
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text('RATING GAME TRIGGERED CLICK TO START', width / 2, height / 2);
}

function endEvent() {
    pauseGame = false;
    console.log("Trigger Event Unpause");
    showHotel = true;  
    eventStartTime = -1; 
}

function displayCountdown(timeLeft) {
    fill(0);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Event Ends In: ${Math.floor(timeLeft)}seconds`, width / 2, height - 50);
}
