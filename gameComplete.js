function gameComplete()
{
    this.setup = function()
    {
        //sets up gui
        gui = createGui();
        gui.loadStyle("Blue");
        myFont = loadFont('assets/menuFont.ttf');

        let w = width;
        let h = height;
        
        //creates main menu button
        mainMenuButton = createButton("Main Menu", w *0.25, h * 0.65, w * 0.5, h * 0.2);
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

        //loads background image
        image(gameCompleteImg, 0, 0);

        //this will take you back to the main menu but make the game unplayable
        if(mainMenuButton.isPressed)
        {
            resetSketch();
        }

        gui.draw();
    }
}