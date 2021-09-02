var heart, bzone, bzoneGroup, bone, boneGroup, brokenHeart;
var heartImg, bzoneImg, boneImg, brokenHeartImg;
var box;
var boxImg;
var leftWall, rightWall, topWall, bottomWall;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var heal=0, hpbar1, hpbar2, hp=300,score = 0;
var bg_sound;

function preload()
{
  heartImg = loadImage("./assets/Heart.png");
  bzoneImg = loadImage("./assets/bzone.png");
  boxImg = loadImage("./assets/box2.png");
  boneImg = loadImage("./assets/bone.png");
  brokenHeartImg = loadImage("./assets/brokenHeart.png");
  bg_sound = loadSound("./assets/Daemophobia.mp3");
}

function setup()
{
  createCanvas(800,400);

  heart = createSprite(100,250,10,10);
  heart.addImage(heartImg);
  heart.scale = 0.2;
  heart.debug = false;
  heart.setCollider("circle",0,0,200);

  leftWall = createSprite(0,200,10,400);
  rightWall = createSprite(800,200,10,400);
  topWall = createSprite(400,35,800,10);
  bottomWall = createSprite(400,370,800,10);

  hpbar1 = createSprite(350,15,300,15);
  hpbar1.shapeColor = "White";

  hpbar2 = createSprite(350,15,300,15);
  hpbar2.shapeColor = "Red";

  brokenHeart = createSprite(400,200,10,10);
  brokenHeart.addImage(brokenHeartImg);
  brokenHeart.scale = 0.5;
  brokenHeart.visible = false;

  bg_sound.loop();

  leftWall.visible = false;
  rightWall.visible = false;
  topWall.visible = false;
  bottomWall.visible = false;

  bzoneGroup = createGroup();
  boneGroup = createGroup();
}

function draw()
{
  background(boxImg);

  if (frameCount % 120 === 0)
  {
    textSize(15);
    fill("White");
    heal=heal+5;
  }
  if (frameCount % 100 === 0)
  {
    textSize(15);
    fill("White");
    score=score+5;
  }

  if (gameState === PLAY)
{
  textSize(15);
  fill("White");
  text("HP: "+hp,100,20);
  text("Heal points: "+heal,600,20);    
  text("Score: "+score,520,20);

  if (keyDown("left"))
  {
    heart.x = heart.x - 10;
  }
  if (keyDown("right"))
  {
    heart.x = heart.x + 10;
  }
  if (keyDown("up"))
  {
    heart.y = heart.y - 10;
  }
  if (keyDown("down"))
  {
    heart.y = heart.y + 10;
  }

  spawnBzone();
  spawnBones();

  if (heal>50 && frameCount % 60 === 0)
  {
    hp = hp+100;
    heal = 0;
  }

  if (bzoneGroup.isTouching(heart) || boneGroup.isTouching(heart))
  {
    if (hpbar2.width>1)
    {
      hp = hp-1;
      hpbar2.width = hp;
    }
    else
    {
      gameState = END;
    }
  }

}

  else if (gameState === END)
  {
      brokenHeart.visible = true;
      heart.visible = false;
      hpbar2.visible = false;
      bzoneGroup.destroyEach();
      boneGroup.destroyEach();
  }

  heart.collide(leftWall);
  heart.collide(rightWall);
  heart.collide(topWall);
  heart.collide(bottomWall);

  boneGroup.bounceOff(topWall);
  boneGroup.bounceOff(bottomWall);

  drawSprites();
}

function spawnBzone() 
{
  if (frameCount % 150 === 0)
  {
    var y = Math.round(random(1,2));
    var y1;
    switch (y)
    {
      case 1: y1 = 120;
      break;
      case 2: y1 = 280;
      break;
    }

    bzone = createSprite(Math.round(random(600,800)),y1,10,10);
    bzone.addImage(bzoneImg);
    bzone.scale = 0.4;
    bzone.velocityX = -3;
    
    bzone.lifetime = 200;
    
    bzone.depth = heart.depth;
    heart.depth = heart.depth + 1;

    bzoneGroup.add(bzone);
  }
}

function spawnBones()
 {

   if (frameCount % 200 === 0) 
   {
    bone = createSprite(Math.round(random(100,700)),200,10,10);
    bone.addImage(boneImg);
    bone.scale = 0.2;
    bone.velocityY = -2;

    bone.lifetime = 200;

    bone.depth = heart.depth;
    heart.depth = heart.depth + 1;

    bone.bounciness = 1;

    boneGroup.add(bone);
  }
}