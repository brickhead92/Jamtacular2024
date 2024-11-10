
class Player {
  constructor() {
    this.aimed = false;
    this.rotation = 0;
    this.aim_speed = 0.5;
    this.aim_position = 0;
    this.x = canvas.width / 2;
    this.y = canvas.height * 0.8;
    this.throw_angle = 0;
    this.throw_power = 0;
    this.score = 0;
  }
  update(throwable) {
    if (kb.presses(' ')) {
      this.aimed = true;
      this.throw_angle = this.rotation - 90;
    }
    if (this.aimed == false) {
      if (this.aim_position <= -20) {
        this.aim_speed = -this.aim_speed;
      }
      if (this.aim_position >= 20) {
        this.aim_speed = -this.aim_speed;
      }

    }
    if (keyIsDown(32)) {
      this.throw_power = kb.space;
    } else {
      this.aim_position = this.aim_position + this.aim_speed;
      this.rotation += this.aim_speed;
    }
    if (kb.pressing('up') && this.y >= canvas.height * 0.75) {
      this.y -= 1;
    }
    if (kb.pressing('down') && this.y <= canvas.height) {
      this.y += 1;
    }
    if (kb.pressing('left') && this.x >= 10) {
      this.x -= 1;
    }
    if (kb.pressing('right') && this.x <= canvas.width - 10) {
      this.x += 1;
    }
    push();
    translate(this.x, this.y);
    push();
    rotate(this.rotation);
    arc(0, -20, 40, 30, 75, 105, PIE);
    pop();
    pop();
    if (kb.released(' ')) {
      while (true) {
        if (this.throw_power >= 60) {
          this.throw_power /= 2.5;
        }
        if (this.throw_power <= 60) {
          break;
        }
      }
      throwable.throw(this.x, this.y, this.throw_angle, this.throw_power, allSprites);
      this.aimed = false;
    }
  }
}
