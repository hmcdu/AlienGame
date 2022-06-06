function levelComplete()
{
    this.setup = function()
    {
        //creates the gui and loads the font
        gui = createGui();
        gui.loadStyle("Blue");
        myFont = loadFont('assets/menuFont.ttf');

        let w = width;
        let h = height;
        
        //creats the gui button for next level
        nextLevelButton = createButton("Next Level", w *0.25, h * 0.65, w * 0.5, h * 0.2);
    
        //removed because to press it would make the game unplayable
        //mainMenuButton = createButton("Main Menu", w *0.25, h * 0.525, w * 0.5, h * 0.2);
    }

//     this.enter = function()
//   {   
//     gui.show();

//   }

//   this.exit = function()
//   {
//     gui.hide();
//   }

    this.draw = function()
    {
        camera.off();
        background(255);
        
        //draws the background image
        image(levelCompleteImg, 0, 0);
        
        //loads in the font
        gui.setFont(myFont);
        
        //checks if next level is pressed
        if(nextLevelButton.isPressed)
        {     
            //plays the click sound
            clickSound.play();

            //checks which level was just played
            //moves the character to the correct position to start the next level
            if(lastLevel == 1)
            {
                lastLevel = 2;
                player_sprite.position.x = 7350;
                player_sprite.position.y = 450;
                player_sprite.velocity.x = 0;
                mgr.showScene(world);
            }
            else if(lastLevel == 2)
            {
                lastLevel = 3;
                player_sprite.position.x = 14350;
                player_sprite.position.y = 450;
                player_sprite.velocity.x = 0;
                mgr.showScene(world);
            }
            //if level 3 was completed the game is finished and will show the game complete scene
            else if(lastLevel == 3)
            {
                mgr.showScene(gameComplete);
            }
        }

        //removed due to bugs 

        // else if(mainMenuButton.isPressed)
        // {
        //     resetSketch();
        // }

        //draws the gui elements
        drawGui();
    }

}