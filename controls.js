function controls()
{
    var me = this;

    this.setup = function()
    {
        //creates gui and sets its style and font
        gui = createGui();
        gui.loadStyle("Blue");
        myFont = loadFont('assets/menuFont.ttf');

        let w = width;
        let h = height;
        
        //creates the back button
        backButton = createButton("Back", w * 0.7, h * 0.85, w * 0.2, h * 0.1);
    }

    // this.enter = function()
    // {   
    //     console.log("controls show");
    //     gui.show();
    // }

    // this.exit = function()
    // {
    //     console.log("controls hide");
    //     gui.hide();
    // } 

    this.draw = function()
    {
        camera.off();
        background(255);
        gui.setFont(myFont);
        
        //draws background image
        image(controlsImg, 0, 0);
        
        //closes the menu when enter is pressed
        if(backButton.isPressed)
        {
            //plays click sound
            clickSound.play();
            //this.mgr.showScene(mainMenu);
            //me.sceneManager.showScene(mainMenu);

            //hack way of taking you back to main menu
            resetSketch();
        }
        
        //draws gui elements
        gui.draw();
    }
}