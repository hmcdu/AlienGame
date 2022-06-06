function death()
{

    this.setup = function()
    {
        //creates the gui, loads its style and its font
        gui = createGui();
        gui.loadStyle("Blue");
        myFont = loadFont('assets/menuFont.ttf');

        let w = width;
        let h = height;
        
        //try again gui button added
        tryAgainButton = createButton("Try Again", w * 0.55, h * 0.46, w * 0.25, h * 0.1);
        //mainMenuButton = createButton("Main Menu", w * 0.55, h * 0.585, w * 0.25, h * 0.1);
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
        background(255);
        camera.off();
        gui.setFont(myFont);
    
        
        //console.log(deathCause);
        
        //figures out how you died and loads the appropriate background image
        if(deathCause == ("lava"))
        {
            image(lavaDeathImg, 0, 0);
        }
        else if(deathCause == ("Fall"))
        {
            image(fallDeathImg, 0, 0);
        }
        else if(deathCause == ("enemy"))
        {
            image(enemyDeathImg, 0, 0);
        }
 
        //removed due to bugs

        // if(mainMenuButton.isPressed)
        // {
        //     resetSketch();
        // }

        //checks when try again button is pressed
        if(tryAgainButton.isPressed)
        {
            //runs animation setup again to reset enemies
            animationSetup();
            //moves back to the world scene
            mgr.showScene(world);
        }

        //draws all gui elements
        drawGui();
    }
}
