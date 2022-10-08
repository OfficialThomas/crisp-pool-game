title = "";

description = `
`;

characters = [];

options = {};

/** @type {{angle: number, length: number, pin: Vector}} */
let projection;
let projlen = 7;

///** @type {Vector[]} */
let ball;
let shiftspeed = 0;
let dropspeed = 0;
let bonks = 0;
let charge = 0;
let shot = false;
let switching = false;
let launch = 0;

function update() {
  if (!ticks) {
    ball = vec(50, 89);
    projection = { angle: 0, length: projlen, pin: ball };
  }
  if ( switching == false){
    projection.angle -= 0.05;
  }
  else if( switching == true){
    console.log("helo")
    projection.angle += 0.05;
    //console.log(Math.round(projection.angle))
  }
  if (Math.round(projection.angle) < -3){
    console.log(Math.round(projection.angle))
    switching = true;
  }
  if(Math.round(projection.angle) > 0){
    console.log(Math.round(projection.angle))
    console.log("yo")
    switching = false;
  }


  line(projection.pin, vec(projection.pin).addWithAngle(projection.angle, projection.length));

  if(input.isPressed && charge<0.15 && shot == false){
    charge+=.003
    shiftspeed += charge
    dropspeed += charge
    //shot = true;

  }
  if(input.isJustReleased && shot ==false){
    shot = true;
    projection.length = 0;
    console.log(projection.angle);
    if(projection.angle < -1.5){
     shiftspeed *= projection.angle - 1.5;
     console.log("PROJECTION CHECK")
     
    }
    else{
      shiftspeed *= projection.angle + 1.5;
    }
  }
  if (ball.x <=10 || Math.round(ball.x >= 90)){
    bonks += 0.02;
    //ball.x = 10;
    shiftspeed *= -1 ; 
    //dropspeed *= -1;
  }
  if (ball.y <=10 || Math.round(ball.y >= 90) ){
    bonks+= 0.01;
    //ball.x = 10;
    dropspeed *= -1  ;
    //dropspeed *= -1;
  }
  if (shot == true) {
    ball.y += dropspeed;
    ball.x += shiftspeed;
    box(ball, 3);
    console.log(charge);
  }

  if (shot == false){
    box(ball, 3);
  }

  
}
addEventListener("load", onLoad);
//check