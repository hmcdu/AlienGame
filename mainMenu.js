function mainMenu()
{
  this.setup = function()
  {
    gui = createGui();
    gui.loadStyle("Blue");
    myFont = loadFont('assets/menuFont.ttf');

    let w = width;
    let h = height;

    newGameButton = createButton("New Game", w * 0.25, h * 0.2, w * 0.5, h * 0.2);
    
    levelSelectButton = createButton("Level Select", w * 0.25, h * 0.425, w * 0.5, h * 0.2);
  
    controlsButton = createButton("Controls", w *0.25, h * 0.65, w * 0.5, h * 0.2);
  }

  //this was meant to make switching between scenes work properly but i couldn't make it work properly
  //this is instead handled by the function resetSketch

  // this.enter = function()
  // {   
  //   console.log("main menu show");
  //   gui.show();
  // }

  // this.exit = function()
  // {
  //   console.log("main menu hide");
  //   gui.hide();
  // }
  
  this.draw = function()
  {
    camera.off();
    background(255);
    gui.setFont(myFont);
    

    //loads in background image
    image(mainMenuImg, 0, 0);
     
    //checks which buttn is pressed and changes to the appropriate scene
    if(newGameButton.isPressed)
      {
        lastLevel = 1;
        level = 1;
        menu = 0;
        console.log("play level 1");
        clickSound.play();
        mgr.showScene(world);
      }
    else if(levelSelectButton.isPressed)
    {
      level = 2;
      menu = 0;
      console.log("Level Select");
      clickSound.play();
      mgr.showScene(levelSelect);
    }
    else if(controlsButton.isPressed)
    {
      console.log("Controls");
      clickSound.play();
      mgr.showScene(controls);
    }

    //draws all gui elements
    gui.draw();
  }

}