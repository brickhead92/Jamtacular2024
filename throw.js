

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
    throwable.overlaps(this.group)
    throwable.overlaps(overlaps)
    throwable.diameter = 10
    throwable.x = x
    throwable.y = y
    throwable.direction = angle
    throwable.rotation = angle
    throwable.type = "egg"
    throwable.speed = 10
    throwable.life = 110 - power
  }
  hit() {

  }
  miss() {

  }
  update(player, building){
    for (let i = 0; i < this.group.length; i++) {
      if (this.group[i].life == 1) {
        if (this.group[i].overlapping(building)) {
          player.score += 100
          console.log(player.score)
        }
      }
    }
  }
}
