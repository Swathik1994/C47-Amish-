var boy,laser,hallway,boyImage,laserImage,hallwayImage,laserGroup;
var gameState=PLAY;
var PLAY=1;
var END=0;

var restart,restartImg;
localStorage["HighScore"]=0;

var score=0;

function preload(){

boyImage = loadImage("sprites/boy.png.png");
laserImage = loadImage("sprites/laser.png.png");
hallwayImage = loadImage("sprites/Hallway.png.png");
restartImg=loadImage("sprites/restart.png");

}

function setup() {
createCanvas(1400,700);

//to create background
bg = createSprite(700,350,1500,800);
bg.addImage(hallwayImage);
bg.scale = 8.4;


//to create boy
boy = createSprite(200,100,20,20);
//boy.debug = true
boy.addImage(boyImage);
boy.setCollider("rectangle",0,0,200,200);

//Group
laserGroup = createGroup();

//to create ground 
ground = createSprite(750,680,1500,20);
ground.visible=false;

//to create restart button
restart=createSprite(700,350,10,10);
restart.addImage(restartImg);
restart.visible=false;
  } 
  
function draw() {
  background(0);
 
  text("Score: "+score,1300,50);
  text ("HI: "+localStorage["HighScore"], 1150,50);


  //PLAY state
if(gameState===PLAY){

bg.velocityX = -10;

//reset the bg
 if(bg.x < 0){
 bg.x = bg.width/2;
 }

 //move the boy
 if(keyDown("space")){
boy.velocityY = -15;
 }

 //gravity
 boy.velocityY = boy.velocityY + 2; 

 //lasers
 spawnLaser();


 //game end
if(laserGroup.isTouching(boy)){

gameState=END;

}

}


//end
else if(gameState===END){

  restart.visible=true;
  bg.velocityX = 0;
  boy.velocityY = 0;

  if(mousePressesOver (restart)){
    reset();
  }

}

 boy.collide(ground);


  drawSprites();
}


//To generate the laser
function spawnLaser(){

if(frameCount % 120===0){

laser = createSprite(1500,100,10,10);
laser.y=Math.round(random(100,700));
laser.velocityX = -15;
laser.addImage(laserImage);
laser.scale = 0.3;
laser.lifetime = 100;

laser.depth = boy.depth;
boy.depth = boy.depth+1;

laserGroup.add(laser);

}
}


//To restart the game
function reset(){

  gameState=PLAY;
  
if(localStorage["HighScore"]<score){

  localStorage["HighScore"]=score;

}

  score=0;
}