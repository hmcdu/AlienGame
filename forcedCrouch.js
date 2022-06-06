function forcedCrouch()
{
  if(forceCrouch == true)
    {
      player_sprite.setCollider("rectangle", 0,0, 67,72);
      player_sprite.changeAnimation('duck');
      player_sprite.animation.play();
    }
  else
    {
      player_sprite.setCollider("rectangle", 0, 0, 70,94);
      player_sprite.changeAnimation('stand');
      player_sprite.animation.play();
    }
}