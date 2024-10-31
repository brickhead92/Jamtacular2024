"use strict";
let test, test2;
function setup() {
  let testGroup =new Group();
  createCanvas(400, 400);
  world.gravity = 10;
  test = new Throwable(200,200,80,40);
  test.setup();
  // test2 = new Sprite();
}

function draw() {
  background(220);
  rect(50,50,300,100);
  // test.draw();
}
