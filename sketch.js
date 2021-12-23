var spaceImg, space;
var meteriodImg, meteriod, meteriodsGroup;
var rocket, rocketImg;
var gameState = "play";
var score = 0;

function preload() {
  spaceImg = loadImage("Space.png");
  rocketImg = loadImage("Rocket.png");
  meteriodImg = loadImage("Meteriod.png");
}

function setup() {
   createCanvas(600 , 450);

   //creating space bg
   space = createSprite(300,225);
   space.addImage("space",spaceImg);
   space.velocityY = 2

   //creating rocket
   rocket = createSprite(300,400,20,20);
   rocket.addImage("rocket",rocketImg);
   rocket.scale = 0.42

   //creating group of meteriods
   meteriodsGroup = new Group();

   rocket.setCollider("rectangle",0,0,85,rocket.height);
}

function draw() {
    background(200);

    stroke("white");
    fill("red");
    textSize(20);
    text("Score: "+ score, 500,30);
    text.depth = space.depth;
    text.depth = text.depth + 1 ;
  
    if (gameState==="play"){
    rocket.x = World.mouseX
    spawnMeteriods();

    if (frameCount % 15 === 0){
      score = score + 1 ;
    }

    if (space.y > 3500){
      space.y = 200 
    }

    drawSprites();


    if (meteriodsGroup.isTouching(rocket)){
      rocket.visible = false
      gameState = "end"
    }
  }

    if (gameState === "end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text ("Game Over" , 230 , 150);
      text("Press R to restart the game" , 140 , 220)

      space.velocityY = 0 ;

     if (keyDown("r")){
      gameState = "play" ;
      space.y = 225 ;
      space.velocityY = 2 ;
      rocket.visible = true ;
      score = 0;
      meteriodsGroup.destroyEach();
     }
    }
}


function spawnMeteriods() {
if (frameCount % 60 === 0){
 meteriod = createSprite(200,-50);
 meteriod.addImage("meteriod",meteriodImg);
 meteriod.scale = 0.4;
 meteriod.x = Math.round(random(20,580));
 meteriod.velocityY = 3.5 ;
 meteriod.lifetime = 750 ;
 meteriodsGroup.add(meteriod);
 }
}

