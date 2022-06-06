function move()
{
  //checks if space was pressed to jump
    if(keyDown(' ')) 
  {
    //checks if player is currently on ground (this was to prevent double jumps)
    if(player_sprite.collide(ground) == true && forceCrouch == false)
      {
        //sets the players y velocity to 6 and starts the jump animation 
        player_sprite.velocity.y = -6.5;
        jumpSound.play();
        player_sprite.changeAnimation('jump');
      }
  }  
  
  //changes to the player animation to stand once the space key is released
    if(keyWentUp(' ')) 
    {
      player_sprite.changeAnimation('stand');
    } 
  
  // checks if right arrow is pressed
  if(keyDown(RIGHT_ARROW)) 
  {
    //checks if player is crouching
    if(keyDown(DOWN_ARROW) == true  || forceCrouch  == true)
      {
        //slows down horizontal movement and reduces the size of the character collision box
        player_sprite.velocity.x = 4;
        player_sprite.setCollider("rectangle", 0,0, 67,72);
        
        //sets character animation to duck
        player_sprite.changeAnimation('duck');
        player_sprite.mirrorX(1);
        player_sprite.animation.play();
      }
    
    //if character isn't on the ground play the jump animation and move right
    else if(player_sprite.collide(ground) == false)
      {
        player_sprite.velocity.x = 4;
        player_sprite.changeAnimation('jump');
        player_sprite.mirrorX(1);
        player_sprite.animation.play();
      }
    
    //if character on the ground play walk animation and move right
    else
      {
        player_sprite.velocity.x = 8;
        player_sprite.changeAnimation('walk');
        player_sprite.mirrorX(1);
        player_sprite.animation.play();
      }

      //checks if the z key has been pressed to throw a projectile
      if(keyWentDown('z'))
      {
        let newProjectile = createSprite(player_sprite.position.x, player_sprite.position.y, 70, 70);
        newProjectile.setCollider("circle", 0,0, 35);
        newProjectile.addAnimation('fireBall', fireBall);
        newProjectile.changeAnimation('fireBall');
        newProjectile.velocity.x = 12;
        projectiles[projectiles.length] = newProjectile;
        whooshSound.play();
        projectilesSprites.add(newProjectile);
      }
  }
  
    //stops character when arrow key is released 
    if(keyWentUp(RIGHT_ARROW)) 
    {
    player_sprite.velocity.x = 0;
    
      //checks if character is standing or crouching and plays respective animation
      if(keyDown(DOWN_ARROW) == true || forceCrouch == true)
      {
        player_sprite.changeAnimation("duck");
        player_sprite.animation.play();
      }
      else
        {
          player_sprite.changeAnimation("stand");
          player_sprite.animation.play();
        }
    }
  
  //same as RIGHT_ARROW but in the other direction
  if(keyDown(LEFT_ARROW)) 
  {
    if(keyDown(DOWN_ARROW) == true || forceCrouch == true)
      {
        player_sprite.velocity.x = -4;
        player_sprite.setCollider("rectangle", 0,0, 67,72);
        player_sprite.mirrorX(-1);
        player_sprite.changeAnimation('duck');
        player_sprite.animation.play();
      }
    else if(player_sprite.collide(ground) == false)
      {
        player_sprite.velocity.x = -2;
        
        //mirrorX is used to flip the animation so it looks like the character is jumping in the opposite direction
        player_sprite.mirrorX(-1);
        player_sprite.changeAnimation('jump');
        player_sprite.animation.play();
      }
    else
      {
        player_sprite.velocity.x = -6;
        player_sprite.changeAnimation('walk');
        
        //mirrorX is used to flip the animation so it looks like the character is walking in the opposite direction
        player_sprite.mirrorX(-1);
        player_sprite.animation.play();
      }

      //checks if the z key has been pressed to throw a projectile
      if(keyWentDown('z'))
      {
        let newProjectile = createSprite(player_sprite.position.x, player_sprite.position.y, 70, 70);
        newProjectile.setCollider("circle", 0,0, 35);
        newProjectile.addAnimation('fireBall', fireBall);
        newProjectile.changeAnimation('fireBall');
        newProjectile.velocity.x = -12;
        projectiles[projectiles.length] = newProjectile;
        whooshSound.play();
        projectilesSprites.add(newProjectile);
      }
  }
  
  //stops the character and plays the stand animation
  if(keyWentUp(LEFT_ARROW)) 
  {
      player_sprite.velocity.x = 0;

        //checks if character is standing or crouching and plays respective animation
        if(keyDown(DOWN_ARROW) == true || forceCrouch == true)
        {
          player_sprite.changeAnimation("duck");
          player_sprite.mirrorX(-1);
          player_sprite.animation.play();
        }
        else
          {
            player_sprite.changeAnimation("stand");
            player_sprite.animation.play();
          }
  }
  //ducks the character if the DOWN_ARROW is pressed and reduces the size of the collision box
  if(keyDown(DOWN_ARROW)) 
  {
    crouch = true;
    player_sprite.setCollider("rectangle", 0,0, 67,72);
    player_sprite.changeAnimation('duck');
    player_sprite.animation.play();
  }  
  
  //stands the character back up and restores the original size collision box unless they are overlapping with a forced crouch sprite
  if(keyWentUp(DOWN_ARROW)) 
  {
    //checks is player is in a force crouch region
    if(player_sprite.overlap(crouchBlocks) == true)
      {
        //sets force crouch to true
        forceCrouch = true;
      }
    
    if(forceCrouch == true)
      {
        //plays the duck animation and decreases the players collision box
        player_sprite.setCollider("rectangle", 0,0, 67,72);
        player_sprite.changeAnimation('duck');
        player_sprite.animation.play();
      }
    else
      {
        //plays the stand animation and restores the players collision box to the original size
        player_sprite.setCollider("rectangle", 0, 0, 70,94);
        player_sprite.changeAnimation('stand');
        player_sprite.animation.play();
      }
    
  }   
}
