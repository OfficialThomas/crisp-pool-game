title = "Pool Game";

description = `
[Hold] Charge Ball
[Release] Shoot Ball`;

characters = [];

const G = {
  WIDTH: 150,
  HEIGHT: 250,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
  isReplayEnabled: true,
  isDrawingScoreFront: true,

};

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

/**
* @typedef {{
* pos: Vector, vx: number, vy: number,
* }} Pin
*/

/**
* @type  { Pin [] }
*/
let pins = [];

function update() {
  if (!ticks) {
    ball = vec(G.WIDTH/2, 4 * G.HEIGHT/5);
    projection = { angle: 0, length: projlen, pin: ball };

    pins = [];
    let heightPos = G.HEIGHT/2;
    let widthPos = G.WIDTH/2;
    for (let y = 1; y < 5; y++) {
      let widthDis = widthPos;
      for (let x = 0; x < y; x++) {
        pins.push({
          pos: vec(widthDis, heightPos),
          vx: 0,
          vy: 0
        });
        widthDis += G.WIDTH/15
      } 
      widthPos -= G.WIDTH/30;
      heightPos -= G.HEIGHT/50;
    }
  }

  if ( switching == false){
    projection.angle -= 0.05;
  }
  else if( switching == true){
    //console.log("helo")
    projection.angle += 0.05;
    //console.log(Math.round(projection.angle))
  }
  if (Math.round(projection.angle) < -3){
    //console.log(Math.round(projection.angle))
    switching = true;
  }
  if(Math.round(projection.angle) > 0){
    //console.log(Math.round(projection.angle))
    //console.log("yo")
    switching = false;
  }

  if(input.isPressed && charge<0.15 && shot == false){
    charge+=.003;
    shiftspeed += charge;
    dropspeed += charge;
    //shot = true;

  }
  if(input.isJustReleased && shot ==false){
    shot = true;
    projection.length = 0;
    //console.log("PROJECTION CHECK")
    //console.log(projection.angle);
    manipshift = 1.5 - Math.abs(projection.angle)  
    if(projection.angle < -1.5){
     //shiftspeed *= (projection.angle);
     shiftspeed *=  manipshift;
     manipdrop = -3 - projection.angle;
     dropspeed *=  manipdrop;
     //console.log("PROJECTION CHECK")
    }
    else if(Math.round(projection.angle == -1.5)){
      shiftspeed =0; 
    }
    else{
      shiftspeed *= 1 * manipshift;
      manipdrop = 0 + projection.angle;
      dropspeed *=  manipdrop;
    }
  }
  if (ball.x <= G.WIDTH/16 || Math.round(ball.x >= 15*G.WIDTH/16)){
    bonks -= 0.01;
    //ball.x = 10;
    shiftspeed *= -1 ; 
    //dropspeed *= -1;
  }
  if (ball.y <=1.3*G.HEIGHT/8 || Math.round(ball.y >= 7.7*G.HEIGHT/8) ){
    bonks-= 0.01;
    //ball.x = 10;
    dropspeed *= -1 ;
    //dropspeed *= -1;
  }
  if (shot == true) {
    if (shiftspeed != 0){
      shiftspeed = shiftspeed /1.005;
    }
    if (dropspeed != 0){
      dropspeed = dropspeed/1.005;
    }

    if((Math.abs(shiftspeed)<.005) && (Math.abs(dropspeed)<.005)){
      console.log("zero");
      shiftspeed = 0;
      dropspeed = 0;
      charge = 0;
      shot = false;
    }
    ball.y += dropspeed;
    ball.x += shiftspeed;
    //console.log(charge);
  }

  if (shot == false){
    //ball.x = ball.x; //G.WIDTH/2 
    //ball.y = ball.y; //4 * G.HEIGHT/5
    projection.length = 7;
    //box(ball, 3);
  }

  //Board
  color("green");
  rect(0, G.HEIGHT/8, G.WIDTH, 8*G.HEIGHT/8);
  color("black");
  rect(0, G.HEIGHT/8, G.WIDTH, G.HEIGHT/20);
  rect(0, G.HEIGHT/8, G.WIDTH/14, G.HEIGHT);
  rect(G.WIDTH, G.HEIGHT, -G.WIDTH, -G.HEIGHT/20);
  rect(G.WIDTH, G.HEIGHT, -G.WIDTH/14, -7*G.HEIGHT/8);
  color("purple");
  rect(G.WIDTH/15, 1.4*G.HEIGHT/8, G.WIDTH/12, G.WIDTH/12);
  rect(12.8*G.WIDTH/15, 1.4*G.HEIGHT/8, G.WIDTH/12, G.WIDTH/12);
  rect(G.WIDTH/15, 7.25*G.HEIGHT/8, G.WIDTH/12, G.WIDTH/12);
  rect(12.8*G.WIDTH/15, 7.25*G.HEIGHT/8, G.WIDTH/12, G.WIDTH/12);
  //Projection Line
  color("light_black");
  line(projection.pin, vec(projection.pin).addWithAngle(projection.angle, projection.length));
  //Ball
  color("blue");
  box(ball, 3);
  //Pins(other balls)
  color("red");
  pins.forEach((s) => {
    rect(s.pos.x - 1, s.pos.y - 1, 3, 3);
  });
  
  
}
addEventListener("load", onLoad);