var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaImage;
var banana;
var foodGroup;
var score = 0;
var obstacle;
var obstacleImage
var obstacleGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;

  foodGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
}

function draw() { 
  background("white");
  text("score:",+score,50,20,50,50)
  stroke("white");
  textSize(15);
  fill(255);
  
 

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacle();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += + 0.01;
    }
   
  
  }
  //if(obstacleGroup.isTouching(player)){
    //gameState = END;
  //}
  //else if(gameState === END){
    //background. velocityX = 0;
    //player.visibility = false;
    //foodGroup.destroyEach();
    //obstacleGroup.destroyEach();
    //textSize(30);
    //fill(255);
    //text("Game Over");
  //}

  drawSprites();
}

function spawnFood(){
  if(frameCount % 80 === 0){
     banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
    banana.scale = 0.1;

  }

}

function spawnObstacle(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(600,320,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -4;
    obstacle.lifetime = 300;
    obstacle.depth = player.depth + 1;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.1;
}
}