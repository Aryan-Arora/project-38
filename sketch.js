
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage

var score;
var obstacleGroup;
var bananaGroup;
var ground;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImg=loadImage("jungle.jpg")
 
}



function setup() {
  canvas=createCanvas(displayWidth,400)
  database = firebase.database();
  monkey = createSprite(100, 300, 40, 40)
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.2;
  score=database.ref('Score')
  score.on("value",readScore)
  obstacleGroup=createGroup();
  bananaGroup=createGroup();  
  ground=createSprite(200,355,1000,10)
  ground.visible=false
 
}

function draw() {
background(backgroundImg)
ground.velocityX=-2
fill("white")
textSize(32)
text("Score:"+score,970,100)
monkey.collide(ground)
  

  if(frameCount%250===0){
  banana=createSprite(1800,190,10,10)
  banana.addImage(bananaImage)
  banana.scale=0.1
  banana.velocityX=-10
 bananaGroup.add(banana)
  }

  if(frameCount%300===0){
    obstacle=createSprite(1800,350,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX=-3
    obstacle.collide(ground)
    obstacleGroup.add(obstacle)
    
  }
  if(monkey.isTouching(obstacleGroup)){
    score=score-1
    obstacleGroup.destroyEach();
   }

   if(monkey.isTouching(bananaGroup)){
     score=score+1
     bananaGroup.destroyEach();
   }
   if(keyWentDown("space")){
    monkey.velocityY = -10;
    
   }
   monkey.velocityY = monkey.velocityY + 0.5;
  
  if (ground.x<0){ 
    ground.x = ground.width/2;
   }
  
  
  drawSprites();
}
  


function readScore(data){
  score=data.val();

}






