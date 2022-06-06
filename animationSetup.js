function animationSetup()
{
  //loads in all the animations needed for the game
  p2_spritesheet = loadSpriteSheet('assets/p2_spritesheet.png', walk_frames);

  walk = loadAnimation(p2_spritesheet);    
  walk.frameDelay = 4;
  
  p2_spritesheet = loadSpriteSheet('assets/p2_spritesheet.png', jump_frames);
 
  jump = loadAnimation(p2_spritesheet);    
  jump.frameDelay = 4;
  
  p2_spritesheet = loadSpriteSheet('assets/p2_spritesheet.png', duck_frames);

  duck = loadAnimation(p2_spritesheet);    
  duck.frameDelay = 4;

  p2_spritesheet = loadSpriteSheet('assets/p2_spritesheet.png', stand_frames);

  stand = loadAnimation(p2_spritesheet);    
  stand.frameDelay = 4;

  enemiesSpriteSheet = loadSpriteSheet('assets/enemies.png', fly_frames);
  
  fly = loadAnimation(enemiesSpriteSheet);
  fly.frameDelay = 4;

  enemiesSpriteSheet = loadSpriteSheet('assets/enemies.png', slime_frames);
  
  slime = loadAnimation(enemiesSpriteSheet);
  slime.frameDelay = 10;

  enemiesSpriteSheet = loadSpriteSheet('assets/enemies.png', bat_frames);
  
  bat = loadAnimation(enemiesSpriteSheet);
  bat.frameDelay = 4;

  fireBallSpriteSheet = loadSpriteSheet('assets/fireBall.png', fireBall_frames);
  
  fireBall = loadAnimation(fireBallSpriteSheet);
  fireBall.frameDelay = 2;

  deadEnemiesSpriteSheet = loadSpriteSheet('assets/deadEnemies.png', deadEnemy_frames);
  
  deadEnemy = loadAnimation(deadEnemiesSpriteSheet);
  deadEnemy.frameDelay = 4;

  doorsSpriteSheet = loadSpriteSheet('assets/doors.png', openDoor_frames);
  
  openDoor = loadAnimation(doorsSpriteSheet);
  openDoor.frameDelay = 4;

  doorsSpriteSheet = loadSpriteSheet('assets/doors.png', closedDoor_frames);
  
  closedDoor = loadAnimation(doorsSpriteSheet);
  closedDoor.frameDelay = 4;
  
  player_sprite = createSprite(405, 400, 70, 94);

  //creates the player sprite and adds animations
  if(lastLevel == 1)
  {
    console.log("level1");
    player_sprite.position.x = 405;
    player_sprite.position.y = 400;
  }
  else if(lastLevel == 2)
  {
    console.log("level2")
    player_sprite.position.x = 7350;
    player_sprite.position.y = 400;
  }
  else if(lastLevel == 3)
  {
    console.log("level3")
    player_sprite.position.x = 14350;
    player_sprite.position.y = 400;
  }

  player_sprite.addAnimation('walk', walk);
  player_sprite.addAnimation('jump', jump);
  player_sprite.addAnimation('duck', duck);
  player_sprite.addAnimation('stand', stand);
  player_sprite.changeAnimation('stand');
  player_sprite.maxSpeed = 10;



  
  //creates the map sprites
  // world_sprite = createSprite(0,423,1800,1);
  // world_sprite.shapeColor = color(255, 255, 255, 0);
  // world_sprite1 = createSprite(700,350,100,600);
  // world_sprite1.shapeColor = color(0, 0, 250);
  // world_sprite2 = createSprite(150, 205, 100, 40);
  // world_sprite2.shapeColor = color(10, 10, 100);
  
  // //creates enemy sprites
  // enemy_sprite = createSprite(400,300, 50,50);
  // enemy_sprite.shapeColor = color(255, 0, 0);
  
  //todo (move crouch into levels) 
  //create sprites that dictate area where the character is unable to stand 
  // forced_crouch = createSprite(155, 245, 95, 40);
  // forced_crouch.shapeColor = color(0,255,0);
  
  //creates a sprite group "ground" and assigns the world sprites to it
  // ground = new Group();
  // ground.add(world_sprite);
  // ground.add(world_sprite1);
  // ground.add(world_sprite2);
  // ground.friction = 0.3;
  
  //creates a sprite group "enemies" and assigns enemy sprites to it
  // enemies = new Group();
  // enemies.add(enemy_sprite);
  
  // crouchBlocks = new Group()
  // crouchBlocks.add(forced_crouch);
}