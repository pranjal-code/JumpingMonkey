var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup


var score = 0;
var survivalTime=0;

var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  
  //loading all monkey animations
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png")
  
}

function setup() {
  
//creating monkey
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  

//creating the ground
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -6;
  ground.x = ground.width/2;
  
  //new groups for fruits and rocks
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() 

{
 background("skyblue");

  //ground not stopping
 if (ground.x<0);
  {
    ground.x=ground.width/2;
  }
   
  drawSprites();
  
  bananas();
  obstacles();
  
  //score and survival time
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime,125,50);
  
  
  if (gameState === PLAY)
  {
    if(FoodGroup.isTouching(monkey))
    {
    FoodGroup.destroyEach()
    score=score+2;
    }
    
    //monkey jumping
    if (keyDown("space") && monkey.y >= 270)
    {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    
    survivalTime=Math.ceil(Math.round(frameCount)/10);
  
  }
  //declaring gameState end
    if(obstacleGroup.isTouching(monkey))
    {
      gameState=END;
    }
  
  if (gameState===END)
    {
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      FoodGroup.destroyEach();
      
      //gameover text
      textSize(40);
      fill("red");
      textFont("Calibri")
      textStyle(BOLD); 
      stroke("black");
      strokeWeight(2);
      text("GAME OVER !!",90,200);
      
      survivalTime = 0;
      //lifetime 
      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);    
      
      //monkey properties
      monkey.scale=0.1;
      monkey.velocityY=0;
      monkey.velocityX=0;
    }
}

function bananas()

{
  if(frameCount%80===0)
  {
    //creating banana
    banana=createSprite(500,100,20,20);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
   
    banana.velocityX=-8;
    banana.lifeTime=100;
    banana.scale = 0.1;
    
    FoodGroup.add(banana); 
  }
  
}


function obstacles()
{
  if (frameCount % 200 === 0) 
  {
    obstacle = createSprite(500, 320, 10, 10);
    obstacle.addImage("obstacle", obstaceImage);
    
    obstacle.velocityX = -12
    obstacle.scale = 0.15;
    
    // * important
    obstacle.lifetime=100;
    obstacle.depth=monkey.depth;
    obstacle.depth=obstacle.depth-1;
    
    
    obstacleGroup.add(obstacle);
  }
}

