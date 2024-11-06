"use strict";

let building, throwables, player

function setup() {
  createCanvas(400, 400);
  building = new Building(canvas.w / 2, canvas.h * 0.4, canvas.w * 0.75, canvas.h * 0.55)
  throwables = new Throwables()
  throwables.setup()
  player = new Player()
  world.gravity.y = 10;
}

function draw() {
  background(220);
  player.update(throwables)
  throwables.update(player, building.group)
}
