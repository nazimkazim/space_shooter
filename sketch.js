// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/biN3v3ef-Y0

var ship;
var flowers = [];
var lifeIndicator = [];
var drops = [];
var bullets = 50;
var textInfo = "Bullets left: ";
const lifeLeft = "enemies' lives left";
var stars = [];
const font = "Bangers";
var speed;
var enemies = 6;
var missFlag = false;
var missText;
var gameIsWon = false;
var numsOfHits = 0;
var numsOfMisses = 0;
var backgroundMusic;
var destroySound;
var bulletHitsBody;
var explosionSound;
var servoSound;


function loadedShoot() {
  destroySound.play();
  destroySound.setVolume(0.6); 
}

function loadedServoSound() {
  servoSound.play(); 
  servoSound.setVolume(1.2); 
}

function loadedHit() {
  bulletHitsBody.play();
  bulletHitsBody.setVolume(0.6);
}

function loadedExplosion() {
  explosionSound.play();
  explosionSound.setVolume(1.6);
}

function setup() {
  createCanvas(600, 400);
  ship = new Ship();
  //drop = new Drop(width/2, height/2);
  for (var i = 0; i < enemies; i++) {
    flowers[i] = new Flower(i*80+80, 60, 30);
    lifeIndicator[i] = new LifeIndicator(450 + i*25, 30, 20, 20, 255);
  }

  for (var i = 0; i < 200; i++) {
    stars[i] = new Star();
  }

  //console.log(flowers);
}

function draw() {
  background(51);
  ship.show();
  ship.move();
  textFont(font,[18]);
  text(textInfo + bullets, 10, 20);
  runOutOfBullets();

  textFont(font,[18]);
  //textSize(18);
  fill(255,239,213);
  text(lifeLeft, 480, 16);
  
  if (flowers.length <=0 && bullets > 0) {
    gameIsWon = true;
    if (gameIsWon) {
      textFont(font,[28]);
      text("You won the game", width/2 - 80, height/2);
      text("you have earned " + bullets + " points" , width/2 - 80, height/2 + 30);
      text("you hitted " + numsOfHits + " shots" , width/2 - 80, height/2 + 60);
      text("you missed " + (50 - numsOfHits - bullets) + " shots" , width/2 - 80, height/2 + 90);
      text("efficiency " + parseInt((bullets/20)*100) + "% " , width/2 - 80, height/2 + 120);
    }
  }  

  

  for (var i = 0; i < drops.length; i++) {
    drops[i].show();
    drops[i].move();
    for (var j = 0; j < flowers.length; j++) {
      if (drops[i].hits(flowers[j])) {
        numsOfHits +=1;
        bulletHitsBody = loadSound('https://res.cloudinary.com/nzmai/video/upload/v1507730937/heavybulletping_xnalpt.mp3', loadedHit);
        
        flowers[j].hitted();
        textFont(font,[18]);
        fill(55,239,213);
        text("hit", 150, 50);
        flowers[j].dragging();
        lifeIndicator[j].decreaseLife();
        if (flowers[j].hits <= 0){
          explosionSound = loadSound('https://res.cloudinary.com/nzmai/video/upload/v1507733418/explosion_zlbqxg.wav', loadedExplosion);
          flowers.splice(j, 1);
          lifeIndicator.splice(j, 1); 
        } 
        drops[i].evaporate();
      }
    }
  }

  moveStars();

  var edge = false;

  for (var i = 0; i < flowers.length; i++) {
    flowers[i].show();
    flowers[i].move();
    lifeIndicator[i].show();
    if (flowers[i].x > width - 30 || flowers[i].x < 30) {
      edge = true;
    }
  }

  if (edge) {
    for (var i = 0; i < flowers.length; i++) {
      flowers[i].shiftDown();
    }
  }

  for (var i = drops.length-1; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }


}

function moveStars() {
  speed = map(100, 0, width, 0, 50);
  //translate(width / 2, height / 2);
  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function gameOver() {
  textFont(font,[18]);
  text("You have run of the bullets", 10,20);
  fill(0, 102, 153);
}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function runOutOfBullets() {
  if (bullets <= 0) {
    bullets="";
    textInfo = "You run out of bullets ";
    //textSize(20);
    textFont(font,[18]);
    text(textInfo, 10, 20);
  }
}

function keyPressed() {
  if (gameIsWon) {
      bullets -= 0;
  } else if (key === ' ')  {
    bullets -= 1;
    destroySound = loadSound("https://res.cloudinary.com/nzmai/video/upload/v1507730506/laser_shoot_ianbwv.wav", loadedShoot);
    runOutOfBullets();
    var drop = new Drop(ship.x, ship.y - 20);
    drops.push(drop);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
    servoSound = loadSound('https://res.cloudinary.com/nzmai/video/upload/v1507734289/servoSound_d1oenp.wav', loadedServoSound);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
    servoSound = loadSound('https://res.cloudinary.com/nzmai/video/upload/v1507734289/servoSound_d1oenp.wav', loadedServoSound);
  }
}
