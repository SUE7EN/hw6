//https://editor.p5js.org/SUE7EN/sketches/lbKrafDy3

function preload() {
  player1Image = loadImage('player1.png');
  player2Image = loadImage('player2.png');
  healthbar1Image = loadImage('healthbar1.png');
  healthbar2Image = loadImage('healthbar2.png');
  healImage = loadImage('heal.png');
}

var speed = 10;
var player1 = {
  h: 230,
  w: 70,
}
var player2 = {
  h: 230,
  w: 530,
}
var healthbar1 = 80;
var healthbar2 = 80;
var heal = {
  w: 50,
  h: 10,
  speed: 3,
}

var bullet1 = {
  x: player1.w,
  y: player1.h,
  speed: 5,
  fire: 0,
}
var bullet2 = {
  x: player2.w,
  y: player2.h,
  speed: 5,
  fire: 0,
}

function setup() {
  createCanvas(600, 280);
}

function draw() {
  background(220, 150);
  imageMode(CENTER);
  fill(20);
  
  // //heal
  // image(healImage, heal.w, heal.h);
  // heal.h += heal.speed;
  // if (heal.h >= height-30){
  // }
  
  rect(0, height - 30, width, 30); //ground
  image(player1Image, player1.w, player1.h);
  image(player2Image, player2.w, player2.h);

  noStroke();
  //health bar for player1
  fill(255, 0, 0, 150);
  rect(47, 35, healthbar1, 13);
  image(healthbar1Image, 80, 40);
  //health bar for player2
  fill(0, 0, 255, 150);
  rect(553 - healthbar2, 35, healthbar2, 13);
  image(healthbar2Image, 520, 40);
  
  //set keys to control the position of player1
  if (keyIsDown(87)) {
    player1.h -= 0.8*speed;
  } else {
    player1.h += 0.5*speed;
  }
  if (keyIsDown(83)) {
    player1.h += speed;
  }
  if (keyIsDown(68)) {
    player1.w += speed;
  }
  if (keyIsDown(65)) {
    player1.w -= speed;
  }
  //make sure player1 won't get out of the screen
  if (player1.h < 120) {
    player1.h = 120;
  }
  if (player1.h > height - 70) {
    player1.h = height - 70;
  }
  if (player1.w < 25) {
    player1.w = 25;
  }
  if (player1.w > width - 25) {
    player1.w = width - 25;
  }


  //set keys to control the position of player2
  if (keyIsDown(UP_ARROW)) {
    player2.h -= 0.8*speed;
  }else {
    player2.h += 0.5*speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    player2.h += speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player2.w += speed;
  }
  if (keyIsDown(LEFT_ARROW)) {
    player2.w -= speed;
  }
  //make sure player2 won't get out of the screen
  if (player2.h < 120) {
    player2.h = 120;
  }
  if (player2.h > height - 70) {
    player2.h = height - 70;
  }
  if (player2.w < 25) {
    player2.w = 25;
  }
  if (player2.w > width - 25) {
    player2.w = width - 25;
  }
  
  //Player1's bullets
  if (keyIsDown(49) && player1.w < player2.w){
    bullet1.fire = 1;
    bullet1.x = player1.w;
    bullet1.y = player1.h;
  }
  fill(255, 0, 0, 150);
  if (bullet1.fire == 1) {
    ellipse(bullet1.x + 25, bullet1.y, 10);
    bullet1.x = bullet1.x + bullet1.speed
  }
  if (keyIsDown(49) && player1.w > player2.w){
    bullet1.fire = 2;
    bullet1.x = player1.w;
    bullet1.y = player1.h;
  }
  if (bullet1.fire == 2) {
    ellipse(bullet1.x - 25, bullet1.y, 10);
    bullet1.x = bullet1.x - bullet1.speed
  }
  
  //Player2's bullets
  if (keyIsDown(187) && player1.w > player2.w){
    bullet2.fire = 1;
    bullet2.x = player2.w;
    bullet2.y = player2.h;
  }
  fill(0, 0, 255, 150);
  if (bullet2.fire == 1) {
    ellipse(bullet2.x + 25, bullet2.y, 10);
    bullet2.x = bullet2.x + bullet2.speed;
  }
  if (keyIsDown(187) && player1.w < player2.w){
    bullet2.fire = 2
    bullet2.x = player2.w;
    bullet2.y = player2.h;
  }
  if (bullet2.fire == 2) {
    ellipse(bullet2.x - 25, bullet2.y, 10);
    bullet2.x = bullet2.x - bullet2.speed;
  }
  
  
  //damage
  if (dist(bullet1.x, bullet1.y, player2.w, player2.h) <= 40 &&   bullet1.fire > 0) {
    bullet1.x = -10;
    bullet1.y = -10;
    healthbar2 -= 10;
  }
  if (dist(bullet2.x, bullet2.y, player1.w, player1.h) <= 40 &&   bullet2.fire > 0) {
    bullet2.x = -10;
    bullet2.y = -10;
    healthbar1 -= 10;
  }
  
  //ending
  fill(0);
  textSize(32);
  if (healthbar1 <= 0 && healthbar2 > 0) {
    fill(220);
    rect(0, 0, width, height);
    fill(0, 0, 255);
    text("Player2 win!!!", 200, 150)
    noLoop();
  }
  
  if (healthbar2 <= 0 && healthbar1 > 0) {
    fill(220);
    rect(0, 0, width, height);
    fill(255, 0, 0);
    text("Player1 win!!!", 200, 150)
    noLoop();
  }

}
