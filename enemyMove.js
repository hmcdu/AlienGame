function enemyMove()
{
    for(let i = 0; i < enemies.length; i++)
    {
        if (enemies[i].velocity.x > 0)
        {
            enemies[i].mirrorX(-1);
        }
        else
        {
            enemies[i].mirrorX(1);
        }

        if(enemies[i].collide(ground) == true)
        {
            enemies[i].velocity.x = enemies[i].velocity.x * -1;
        }
    }
}