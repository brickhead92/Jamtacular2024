"use strict";
let test, test2, axis
let aimed = false
let rotation = 0
let horizontal_direction = 0.5;
let horizontal_position = 0
let move_position = 200
let throw_angle = 90;
let throw_power = 0;
let playerX = 200
let playerY = 375


function setup() {
  let testGroup = new Group();
  createCanvas(400, 400);
  world.gravity.y = 10;
}

function draw() {
  background(220);
  rect(50, 50, 300, 150);
  if (kb.presses(' ')) {
    aimed = true
    throw_angle = rotation - 90
  }
  if (aimed == false) {
    if (horizontal_position <= -20) {
      horizontal_direction = -horizontal_direction
    }
    if (horizontal_position >= 20) {
      horizontal_direction = -horizontal_direction
    }

  }
  if (keyIsDown(32)) {
    throw_power = kb.space
  } else {
    horizontal_position = horizontal_position + horizontal_direction
    rotation += horizontal_direction
  }
  if (kb.pressing('up') && playerY >= canvas.height * 0.75) {
    playerY -= 1
  }
  if (kb.pressing('down') && playerY <= canvas.height) {
    playerY += 1
  }
  if (kb.pressing('left') && playerX >= 10) {
    playerX -= 1
  }
  if (kb.pressing('right') && playerX <= canvas.width - 10) {
    playerX += 1
  }
  push()
  translate(playerX, playerY)
  push()
  rotate(rotation)
  arc(0, -20, 40, 30, 75, 105, PIE)
  pop()
  pop()
  if (kb.released(' ')) {
    console.log("tp", throw_power)
    while (true) {
      if (throw_power > 60) {
        throw_power /= 2.5
      }
      if (throw_power < 60) {
        break
      }
    }
    test = new Throwable(playerX, playerY, 80, 40, throw_angle, throw_power);
    test.setup();
    aimed = false
  }
}
