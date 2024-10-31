
class Throwable {
  constructor(x,y,w,h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }
  setup(){
    this.sprite = new Sprite(this.w,this.h);
    this.sprite.x = this.x
    this.sprite.y = this.y
    console.log(this)
  }
  move(){

  }
  update(){
    // rect(this.x,this.y,this.w,this.h);
    // this.sprite.direction
  }
}