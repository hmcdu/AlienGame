function damage()
{
  //checks if character has hit an enemy
  if(player_sprite.collide(enemySprites) == true)
    {
      deathCause = "enemy"
      print("player died")
      mgr.showScene(death);

      //was going to add a health system and player knock back but decided against it

      // playerHealth -= 1;
      // console.log(playerHealth);
      // if(keyDown == LEFT_ARROW)
      // {
      //   player_sprite.velocity.x = 100;
      // }
      // else if(keyDown == RIGHT_ARROW)
      // {
      //   player_sprite.velocity.x = - 100;
      // }
      // else
      // { 
      //   player_sprite.velocity.y = - 10;
      // }
      
      //add charcter damage 
      //knock player back
    }
   
  //checks if the character has fallen too far
  if(player_sprite.velocity.y >= 10)
    {
      deathCause = "Fall";
      mgr.showScene(death);
      
    }

    if(player_sprite.overlap(lavaRegion))
    {
      console.log("lava");
      console.log("respawn at start of level");
      deathCause = "lava";
      mgr.showScene(death);
    }
}