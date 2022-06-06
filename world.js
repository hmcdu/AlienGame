
//var tiles = [];


function world()
{
  //an attempt was made all of these variables local rather then global to fix the issue cause by the restartSketch function
  //however due to the way projectiles and enemies are being setup and created, they have to be global
  //this means they won't interact with the world unless I make the world global
  
  // var count;
  // var mapTile;
  // //var enemies = [];
  // //var projectiles = [];
  // var forceCrouch = [];
  // var lavaTile = [];
  // var collidables = [1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 
  //                   16, 17, 18, 19, 20, 22, 23, 24, 31, 32, 33, 34, 35, 
  //                   36, 37, 38, 39, 40, 45, 46, 52, 53, 54];
  // var crouchRegion = [5, 6, 7, 8, 17, 18, 19, 38, 39, 40, 52, 53, 54];
  // var bottomBridgeBlocks = [43, 44];
  // var topBridgeBlocks = [45, 46];
  // var lavaBlocks = [9];
  // var door;
  
  //console.log(mapFile);
  console.log("about to load csv 1");
  map1 = loadTable('assets/combined.csv', 'csv');
  console.log(map1);
  



  this.setup = function()
  {
    var tiles = [];
    createCanvas(800,600); 
    levelImg = loadImage('assets/hud_'+lastLevel+'.png');
    //console.log("level 1 setup")
    let count = 0;

    //sets up the sprite groups
    ground = new Group();
    crouchBlocks = new Group();
    lavaRegion = new Group();
    enemySprites = new Group();
    projectilesSprites = new Group();
    ropeSpites = new Group();
    doorSprites = new Group();

    //iterates over the imported CSV file and draws a sprite for each tile
    //this sprite is also given its appropriate image to be drawn
    //the sprite is then added to its appropriate groups to be referenced later for collisions ect.
    for (let r = 0; r < map1.getRowCount(); r++)
    {
      //console.log("step 1");
      
      for (let c = 0; c < map1.getColumnCount(); c++) 
      {
      
        //console.log("step 2");
          
        //checks the position isn't empty
        if(map1.getString(r,c) != '-1')
        {
          //create a sprite for each non empty tile 
          let tempname = 'assets/world/'+map1.getString(r,c)+'.png';           
          let img = loadImage(tempname);

          let newTile = createSprite((c*70)+35,(r*70)+35, 70, 70);
          
          newTile.addImage(img);
          tiles[count] = newTile;
                
          //checks for bottom bridge tiles (of ID 43 or 44)
          if( map1.getString(r,c) == 43 || map1.getString(r,c) == 44)
          {
            //resize its collider so player isn't floating on top and assigns its group
            tiles[count].setCollider("rectangle", 0, 20, 70,20);
            ground.add(tiles[count]);

            
          }
          //checks if its a top bridge tile
          else if( map1.getString(r,c) == 45 || map1.getString(r,c) == 46)
          {
          
            tiles[count].setCollider("rectangle", 0, -25, 70,20);
            ground.add(tiles[count]);
            
          }
          //checks if the tile is lava
          else if( map1.getString(r,c) == 9)
          {
  
            tiles[count].setCollider("rectangle", 0,35, 70, 35);
            //adds to lava group for later kill functionality
            lavaRegion.add(tiles[count]);
            
          }
          //checks if the tile is rope
          else if( map1.getString(r,c) == 10 || map1.getString(r,c) == 11 )
          {
            //adds to rope group for later movement functionality
            tiles[count].setCollider("rectangle", 0,35, 70, 70);
            ropeSpites.add(tiles[count]);
            
          }
          //checks if the tile if the top of the door
          else if( map1.getString(r,c) == 27)
          {
            door = createSprite((c*70)+35,(r*70)+105, 70, 70);
            door.addImage(doorImg);
            door.setCollider("rectangle", 0, 0, 70, 70);

            //this is where I was going to add door animations but ran out of time

            // door.addAnimation('closedDoor', closedDoor);
            // door.addAnimation('openDoor', openDoor);
            // door.changeAnimation('closedDoor');
            doorSprites.add(door);
            
          }
          else
          {
            //itterate over collidable array (defines which tiles the player collides with)
            for (let i = 0; i <collidables.length; i++)
            {
              if(collidables[i] == map1.getString(r,c)){

                //set the tiles collider and add it to ground
                ground.add(tiles[count]);
                tiles[count].setCollider("rectangle", 0, 0, 70,70);
                

              }
            }
          }

          //iiterate over crouchRegion array
          for (let i = 0; i < crouchRegion.length; i++)
          {
            if(crouchRegion[i] == map1.getString(r,c))
            {
              //adds the forcedCrouch region sprites under specific tiles
              let newForcedCrouch =  createSprite((c*70)+35,(r*70)+70, 50, 60);
              newForcedCrouch.visible = false;
              forceCrouch[count] = newForcedCrouch;        

              //add to crouchBlocks group
              crouchBlocks.add(forceCrouch[count]);
            }
          }
        }         
      }  
    }
    //console.log(lastLevel);

    //runs animiation setup 
    animationSetup();

    //creates the enemy sprites
    enemy_sprite = createSprite(1610, 700, 70, 47);
    enemySprites.add(enemy_sprite);
    enemy_sprite.addAnimation('slime', slime);
    enemy_sprite.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite.changeAnimation('slime');
    enemy_sprite.velocity.x = -5;
    enemies[0] = enemy_sprite; 

    enemy_sprite1 = createSprite(2590, 640, 70, 47);
    enemySprites.add(enemy_sprite1);
    enemy_sprite1.addAnimation('fly', fly);
    enemy_sprite1.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite1.changeAnimation('fly');
    enemy_sprite1.velocity.x = -5;
    enemies[1] = enemy_sprite1;

    enemy_sprite2 = createSprite(4340, 640, 70, 47);
    enemySprites.add(enemy_sprite2);
    enemy_sprite2.addAnimation('fly', fly);
    enemy_sprite2.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite2.changeAnimation('fly');
    enemy_sprite2.velocity.x = -5;
    enemies[2] = enemy_sprite2;

    enemy_sprite3 = createSprite(8750, 640, 70, 47);
    enemySprites.add(enemy_sprite3);
    enemy_sprite3.addAnimation('fly', fly);
    enemy_sprite3.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite3.changeAnimation('fly');
    enemy_sprite3.velocity.x = -5;
    enemies[3] = enemy_sprite3;

    enemy_sprite4 = createSprite(11550, 640, 70, 47);
    enemySprites.add(enemy_sprite4);
    enemy_sprite4.addAnimation('bat', bat);
    enemy_sprite4.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite4.changeAnimation('bat');
    enemy_sprite4.velocity.x = -5;
    enemies[4] = enemy_sprite4;

    enemy_sprite8 = createSprite(11150, 700, 70, 47);
    enemySprites.add(enemy_sprite8);
    enemy_sprite8.addAnimation('slime', slime);
    enemy_sprite8.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite8.changeAnimation('slime');
    enemy_sprite8.velocity.x = 5;
    enemies[8] = enemy_sprite8;

    enemy_sprite5 = createSprite(15750, 530, 70, 47);
    enemySprites.add(enemy_sprite5);
    enemy_sprite5.addAnimation('bat', bat);
    enemy_sprite5.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite5.changeAnimation('bat');
    enemy_sprite5.velocity.x = -5;
    enemies[5] = enemy_sprite5;

    enemy_sprite6 = createSprite(16450, 700, 70, 47);
    enemySprites.add(enemy_sprite6);
    enemy_sprite6.addAnimation('slime', slime);
    enemy_sprite6.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite6.changeAnimation('slime');
    enemy_sprite6.velocity.x = -5;
    enemies[6] = enemy_sprite6;

    enemy_sprite7 = createSprite(19250, 640, 70, 47);
    enemySprites.add(enemy_sprite7);
    enemy_sprite7.addAnimation('bat', bat);
    enemy_sprite7.addAnimation('deadEnemy', deadEnemy);
    enemy_sprite7.changeAnimation('bat');
    enemy_sprite7.velocity.x = -5;
    enemies[7] = enemy_sprite7;
    
 
  }
  

  this.draw = function()
  {
    //console.log("level 1 draw");
    background(194, 197, 204);

    //sets the camera to the player so its follows you around
    camera.position.x = player_sprite.position.x;
    camera.position.y = player_sprite.position.y;

    //checks if the character is overlapping with a forced crouch indicator block
    if(player_sprite.overlap(crouchBlocks) == true)
      {
        forceCrouch = true
      }
    else
      {
        forceCrouch = false
      }
    
    forcedCrouch();
    
    damage();

    move();
    enemyMove();

    //makes the player collide with the ground
    player_sprite.collide(ground);

    //adds gravity
    //gravity amount is different depending on if the player
    //is overlapping with a rope tile
    if(player_sprite.overlap(ground) == false)
    {
      if(player_sprite.overlap(ropeSpites))
      {
        //console.log("rope");
        player_sprite.addSpeed(0.03, 90);
      }
      else
      {
        player_sprite.addSpeed(0.17,90);
      }
    }

    


    for (let i = 0; projectiles.length > i; i++ )
    {
      console.log(projectiles.length);
      //console.log(i);
      
      // checks to see if projectile collides with enemies individually
      for(let j = 0; enemies.length > j; j++ )    
      {
        if( projectiles[i].overlap(enemies[j]))
        {
          //if overlap is detected remove the projectile
          projectiles[i].remove();

          //change the enemy to a ghost and make it float up
          enemies[j].changeAnimation('deadEnemy');
          enemies[j].velocity.y = -6;

          //this was previous options for killing an enemy

          //first remove was tried but it was found that remove() just stops its rendering
          //but projectiles would still collide with it even though it was invisible

          // enemies[j].remove();

          //then I tried to set it's collision box to 0 but this still didn't work so I settled on the solution above

          // enemies[j].setCollider('rectangle',enemies[j]., enemies[j], 0,0 )
          
          
        }
        
      }

        //removes the projectiles if the hit parts of the map
        if(projectiles[i].overlap(ground))
        {
          projectiles[i].remove();
        }
    }

    if(player_sprite.collide(doorSprites) )
    {
      console.log('level complete')
      mgr.showScene(levelComplete);
    }
    
    //draws all sprites
    drawSprites();

    //turns the camera off and draws the hud
    //the camera needs to be turned off for hud to work correctly
    camera.off();
    hud();
  }
}

