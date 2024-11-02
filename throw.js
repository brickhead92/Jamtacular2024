
class Throwable {
  constructor(x,y,w,h, angle, power) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.angle = angle
    this.power = power
  }
  setup(){
    this.sprite = new Sprite();
    this.sprite.diameter = 10
    this.sprite.x = this.x
    this.sprite.y = this.y
    this.sprite.direction = this.angle
    this.sprite.rotation = this.angle
    this.sprite.speed = 10
    this.sprite.life = 110 - this.power
  }
  move(){

  }
  update(){
    rect(this.x,this.y,this.w,this.h);
    this.sprite.direction
  }
}
