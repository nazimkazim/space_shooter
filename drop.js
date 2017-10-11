// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

function Drop(x, y) {
  this.x = x;
  this.y = y;
  this.r = 4;
  this.toDelete = false;

  this.show = function() {
    noStroke();
    fill(226, 184, 34);
    rect(this.x, this.y, this.r*1, this.r*3);
  }


  this.evaporate = function() {
    this.toDelete = true;
  }

  this.hits = function(flower) {
    var d = dist(this.x, this.y, flower.x, flower.y);
    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  this.move = function() {
    this.y = this.y - 5;
  }

}
