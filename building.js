class Building {
  constructor(x,y,w,h, angle, power) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.group = new Group()
    this.group.overlaps(this.group)
    this.group.static = true
    new this.group.Sprite(this.x,this.y,this.w,this.h)
    new this.group.Sprite(this.x,this.y,this.w*0.5,this.h*0.5)
  }

}
