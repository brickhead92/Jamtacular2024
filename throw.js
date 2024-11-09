
class Throwables {
  constructor() {
    this.group;
  }
  setup(){
    this.group = new Group();
  }
  throw(x,y, angle, power, overlaps){
    let throwable = new this.group.Sprite();
    throwable.overlaps(this.group);
    throwable.overlaps(overlaps);
    throwable.overlaps(reception);
    throwable.overlaps(elevator);
    
    throwable.diameter = 10;
    throwable.x = x;
    throwable.y = y;
    throwable.direction = angle;
    throwable.rotation = angle;
    throwable.type = "egg";
    throwable.speed = 10;
    throwable.life = 110 - power;
  }
  hit() {

  }
  miss() {

  }
  update(player, building){
    for (let i = 0; i < this.group.length; i++) {
      if (this.group[i].life == 1) {
        if (this.group[i].overlapping(building)) {
          player.score += 100;
          console.log(player.score);
        }
      }
    }
  }
}
