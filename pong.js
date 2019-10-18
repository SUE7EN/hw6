var playerL = 100;
var playerR = 100;
var scoreL = 0;
var scoreR = 0;
var colorHue = 0;
var colorChange = 0.5;

var ball = {
  x: 300,
  y: 200,
  xspeed: 2,
  yspeed: 2,
};

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 100);
}

function draw() {
  background(0, 20);

  // Render the screen
  noStroke();
  fill(100);
  rect(299, 0, 2, 400); // center line  
  fill(colorHue, 100 ,100);
  colorHue += colorChange;
  if (colorHue >= 100) {
    colorChange *= -1;
  }
  if (colorHue <= 0) {
    colorChange *= -1;
  }
  rect(0, playerL, 15, 100); // left player
  rect(width - 15, playerR, 15, 100); // right player
  ellipse(ball.x, ball.y, 20); // puck

  // Handle user input
  
  if (keyIsDown(UP_ARROW)) {
    playerR -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    playerR += 10;
  }

  // Check if 'A' or 'W' is pressed
  if (keyIsDown(65) || keyIsDown(87)) {
    playerL -= 10;
  }

  // Check if 'Z' or 'S' is pressed
  if (keyIsDown(90) || keyIsDown(83)) {
    playerL += 10;
  }

  // Game logic
  ball.x += ball.xspeed;
  ball.y += ball.yspeed;
  
  if (ball.y < 0) {
    ball.y = 0;
    ball.yspeed *= -1;
  }
  
  if (ball.y > height) {
    ball.y = height;
    ball.yspeed *= -1;
  }
  
  if (ball.x >= width) {
    scoreL ++;
    ball.xspeed *= -1;
  }
  if (ball.x <= 0) {
    scoreR ++;
    ball.xspeed *= -1;
  }
  
  fill(100);
  if (scoreR == 5) {
    text('Player Right Wins!!!!', 200, 200);
    noLoop();
  }
  if (scoreL == 5) {
    text('Player Left Wins!!!!', 200, 200);
    noLoop();
  }
  
  //scoreboard
  textSize(20);
  text('score:'+ scoreR, 510, 20);
  text('score:'+ scoreL, 25, 20);
  
  // See if ball is hitting right player
  if (ball.x > width - 15 && ball.y >= playerR && ball.y <= playerR + 100) {
    ball.xspeed *= -1;
  }
  // See if ball is hitting left player
  if (ball.x < 15 && ball.y >= playerL && ball.y <= playerL + 100) {
    ball.xspeed *= -1;
  }
  
  //cheat codes
  if (keyIsDown(187)) {
    scoreL ++;
  }
  if (keyIsDown(49)) {
    scoreL ++;
  }
}
