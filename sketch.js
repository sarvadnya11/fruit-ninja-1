var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, enemy, fruits, fruitGroup, enemyGroup; 

var swordImage, virusImage, fruit1, fruit2,fruit3,fruit4,gameoverImage;

function preload(){
  
  swordImage = loadImage("sword.png");
  virusImage = loadAnimation("alien1.png",
"alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameoverImage = loadImage("gameover.png");
  
}

function setup(){
 createCanvas(600,600);
  
  
  //creating sword
  sword = createSprite(300, 300, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  sword.setCollider("rectangle" , 0, 0, 40, 40);
  sword.debug = false;
  
  
  
  //score, variables and groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}

function draw(){
  background("pink");
  
  if(gameState===PLAY){
    
    "gameOver".visible = true;
    
  //calling fruits and enemys
    fruits();
    enemy();
  
  //moving sword
  sword.y = World.mouseY;
  sword.x = World.mouseX;
    
  //giving scores
  if(sword.isTouching(fruitGroup)){
    fruitGroup.destroyEach();
    score = score + 3;
  }  
    
      
  if(enemyGroup.isTouching(sword))  {
    gameState = END;
  }
   
  
  if(gameState===END){
    
    
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityEach(0);
    enemyGroup.destroyEach();
    
  
  //change the animation to gameover when the sword            touches the enemy
      sword.addImage(gameoverImage);
      sword.x = 200;
      sword.y = 200;
      
    
     
  }
    
    
  drawSprites();
  
  //display score
  text("Score:" + score , 530, 30);
    
  }
}
  
  
  

  
  
  


function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2
    //fruit debug=tree
    r = Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1);
    }else if(r===2) {
      fruit.addImage(fruit2);
    }else if(r===3){
      fruit.addImage(fruit3);
    }else if(r===4) {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
  }
    
}

function enemy() {
  if(World.frameCount % 200 === 0){
    virus = createSprite(400,200,20,20);
    virus.addAnimation("moving",virusImage);
    virus.y = Math.round(random(100,300));
    virus.velocityX = -7;
    virus.setLifetime = 50;
    
    enemyGroup.add(virus);
  }
}

