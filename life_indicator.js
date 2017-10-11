function LifeIndicator(x, y, r) {
	this.transparency = 200;
	this.green = 250; 
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.show = function() {
		noStroke();
		fill(255,this.green,0, this.transparency);
		ellipse(this.x, this.y, this.r, this.r);
	}

	this.decreaseLife = function() {
		for (var i = 0; i < flowers.length; i++) {
			if (flowers[i].hits === 4) {
				this.transparency = this.transparency - 10;
				this.green = this.green - 50;
				
			} else if (flowers[i].hits === 3) {
				this.transparency = this.transparency - 10;
				this.green = this.green - 50;
				
			} else if (flowers[i].hits === 2) {
				this.transparency = this.transparency - 10;
				this.green = this.green - 50;
				
			} else if (flowers[i].hits === 1) {
				this.transparency = this.transparency - 10;
				this.green = this.green - 50;
			} 
		}
	}		
}