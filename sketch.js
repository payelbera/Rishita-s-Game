const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var engine, world;
var ground;

var player, enemy;

var playerBodyImg, playerBody;

var gameState = "onSling";

var killed = false;

function preload(){

    playerBodyImg = loadImage("images/shooter2.png");
}

function setup(){
    var canvas = createCanvas(600,700);
    engine = Engine.create();
    world = engine.world;

    var ground_options ={
        isStatic: true
    }


    ground = Bodies.rectangle(width/2,height-20,width,20,ground_options);
    World.add(world,ground);

    //console.log(ground);

    var playerBody = createSprite(width/2,height-100);
    playerBody.addImage(playerBodyImg);
    playerBody.scale = 0.75;

    player = new Player(width/2,height-150);
    enemy = new Enemy(random(20,width-20),0);

    
}

function draw(){
    background(255);
    Engine.update(engine);
    fill("green");
    rectMode(CENTER);
    rect(ground.position.x,ground.position.y,400,20);

    player.display();

    //console.log("enemy");
    enemy.display();
    spawnEnemy();

    if(detectCollision(player, enemy)){
       // console.log("KILLED")
        enemy.killed = true;
    }

    if(enemy.killed){
        enemy.kill(player.body);

    }
   
   

    drawSprites();
}

function spawnEnemy(){
  
    if(frameCount%200 ===0){
        resetArrow();
        //killed = false;
        enemy = new Enemy(random(20,width-20),0);
        enemy.display();
    }
}

function mouseDragged(){
   /* if(gameState!== "launched"){
        Matter.Body.setPosition(player.body, {x:mouseX, y:mouseY});
        Matter.Body.setVelocity(player.body, {x: 0, y: -5});
    }*/

    console.log("in mOsuse Dragged");
}

/*function mouseReleased(){
    console.log("In mouse released");
    mouseConstraint.fly();
    
    console.log(player.body);
            
    gameState = "launched";

}*/

function resetArrow(){
    player.body.velocity.x = 0;
        
       Matter.Body.setPosition(player.body, {x:width/2, y:height-150});
       Matter.Body.setStatic(player.body,true)
       gameState = "onSling";
}
function keyPressed(){
    //console.log(player.body.speed);
    if(keyCode === RIGHT_ARROW){
        Matter.Body.setStatic(player.body,false)
        Matter.Body.applyForce(player.body , player.body.position, {x: 5 , y: -100})
        Matter.Body.setVelocity(player.body, {x: 10 , y: -10})
           gameState = "launched";
    
        }
        if(keyCode === LEFT_ARROW){
            Matter.Body.setStatic(player.body,false)
            Matter.Body.applyForce(player.body , player.body.position, {x: -5 , y: -100})
            Matter.Body.setVelocity(player.body, {x: -10 , y: -10})
               gameState = "launched";
        
            }
            if(keyCode === UP_ARROW){
                Matter.Body.setStatic(player.body,false)
                Matter.Body.applyForce(player.body , player.body.position, {x: 0 , y: -100})
                Matter.Body.setVelocity(player.body, {x: 0 , y: -10})
                   gameState = "launched";
            
                }
}

function detectCollision(body1, body2){
    body1Position = body1.body.position;
    body2Position = body2.body.position;

    var distance = dist(body1Position.x, body1Position.y, body2Position.x, body2Position.y);

    //console.log("distance "+distance);
    //console.log((player.y + enemy.y)/4);
    

    if(distance<=(player.y + enemy.y)/4){
        return true;


    }

    else{
        return false;
    }
}