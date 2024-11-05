

// class Throwable {
//   constructor(x,y,w,h, angle, power) {
//     this.x = x
//     this.y = y
//     this.w = w
//     this.h = h
//     this.angle = angle
//     this.power = power
//   }
//   setup(){
//     this.sprite = new Sprite();
//     this.sprite.overlaps(building.group)
//     this.sprite.diameter = 10
//     this.sprite.x = this.x
//     this.sprite.y = this.y
//     this.sprite.direction = this.angle
//     this.sprite.rotation = this.angle
//     this.sprite.speed = 10
//     this.sprite.life = 110 - this.power
//   }
//   move(){

//   }
//   update(){
//     // rect(this.x,this.y,this.w,this.h);
//     this.sprite.direction
//   }
// }


class Throwables {
  constructor() {
    this.group
  }
  setup(){
    this.group = new Group()
  }
  throw(x,y, angle, power, overlaps){
    let throwable = new this.group.Sprite()
    throwable.overlaps(overlaps)
    throwable.diameter = 10
    throwable.x = x
    throwable.y = y
    throwable.direction = angle
    throwable.rotation = angle
    throwable.speed = 10
    throwable.life = 110 - power
  }
  update(){
    for (const throwable in this.group) {
      if (throwable.life == 0) {
        if (this.overlaps(building.group)) {
          player.score += 100
        }
      }
    }
  }
}
