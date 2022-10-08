title = "";

description = `
`;

characters = [];

const G = {
  WIDTH: 100,
  HEIGHT: 100,
};

options = {
  viewSize: {x: G.WIDTH, y: G.HEIGHT},
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
* pos: Vector
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
    let heightPos = G.HEIGHT/3;
    let widthPos = G.WIDTH/2;
    for (let y = 1; y < 5; y++) {
      let widthDis = widthPos;
      for (let x = 0; x < y; x++) {
        pins.push({
          pos: vec(widthDis, heightPos)
        });
        widthDis += G.WIDTH/10
      } 
      widthPos -= G.WIDTH/20;
      heightPos -= G.HEIGHT/20;
    }
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
    //console.log(Math.round(projection.angle))
    switching = true;
  }
  if(Math.round(projection.angle) > 0){
    //console.log(Math.round(projection.angle))
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
    //console.log("PROJECTION CHECK")
    console.log(projection.angle);
    manipshift = 1.5 - Math.abs(projection.angle)  
    if(projection.angle < -1.5){
     //shiftspeed *= (projection.angle);
     shiftspeed *=  manipshift;
     manipdrop = -3 - projection.angle;
     dropspeed *=  manipdrop;
     console.log("PROJECTION CHECK")
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
  if (ball.x <=10 || Math.round(ball.x >= 90)){
    bonks -= 0.01;
    //ball.x = 10;
    shiftspeed *= -1 ; 
    //dropspeed *= -1;
  }
  if (ball.y <=10 || Math.round(ball.y >= 90) ){
    bonks-= 0.01;
    //ball.x = 10;
    dropspeed *= -1  ;
    //dropspeed *= -1;
  }
  if (shot == true) {
    if (shiftspeed != 0){
      shiftspeed = shiftspeed /1.005;
    }
    if (dropspeed != 0){
      dropspeed = dropspeed/1.005;
    }
    ball.y += dropspeed;
    ball.x += shiftspeed;
    box(ball, 3);
    
    //console.log(charge);
  }

  if (shot == false){
    box(ball, 3);
  }

  pins.forEach((s) => {
    rect(s.pos.x - 1, s.pos.y - 1, 2, 2);
  });
  
}
addEventListener("load", onLoad);