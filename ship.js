// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Ship() {
  this.x = width/2;
  this.y = 340;
  this.xdir = 0;

  this.show = function() {
    // fill(255);
    // rectMode(CENTER);
    // rect(this.x, height-20, 20, 60);

    beginShape(TRIANGLES);
      vertex(this.x, this.y);
      vertex(this.x + 30, this.y + 50);
      vertex(this.x - 30, this.y + 50);
    endShape();
  }

  this.setDir = function(dir) {
    this.xdir = dir;
  }

  this.move = function(dir) {
    this.x += this.xdir*5;
  }

}
