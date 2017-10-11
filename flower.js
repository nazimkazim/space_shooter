// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Flower(x, y, r, redColor, greenColor, blueColor, transparency) {
  this.redColor = random(0, 255);
  this.greenColor = random(0,255);
  this.blueColor = random(0, 255);
  this.transparency = random(100, 200);
  this.x = x;
  this.y = y;
  this.r = random(20, 40);
  this.total = 6;
  this.color = color;
  //specify number of hits
  this.hits = 5;

  this.xdir = 1;

  this.hitted = function() {
    // decrement hits
    this.hits = this.hits - 1;
    this.injured();
  }

  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r;
  }

  this.move = function() {
    this.x = this.x + this.xdir;
  }

  this.show = function() {
    noStroke();
    fill(this.redColor, this.greenColor, this.blueColor, this.transparency);
    push();
    translate(this.x, this.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      var x = this.r * cos(angle);
      var y = this.r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.dragging = function() {
    this.y += random(-2.5,2.5);
  }

  this.injured = function() {
    noStroke();
    fill(200, 150, 200, 150);
    ellipse(this.x, this.y, this.r*1.7, this.r*1.7);
  }

}
