function levelSelect()
{
    this.setup = function()
  {
    //creates gui and sets its style and font
    gui = createGui();
    gui.loadStyle("Blue");
    myFont = loadFont('assets/menuFont.ttf');

    let w = width;
    let h = height;
    
    //creates buttons for each level
    level1Button = createButton("Level One", w * 0.25, h * 0.2, w * 0.5, h * 0.2);
    
    level2Button = createButton("Level Two", w * 0.25, h * 0.425, w * 0.5, h * 0.2);
  
    level3Button = createButton("Level Three", w *0.25, h * 0.65, w * 0.5, h * 0.2);
  }

  // this.enter = function()
  // {   
  //   gui.show();

  // }

  // this.exit = function()
  // {
  //   gui.hide();
  // }

  this.draw = function()
  {
    camera.off();
    background(255);
    gui.setFont(myFont);
    
    //loads background image
    image(mainMenuImg, 0, 0);
    
    drawGui();
    
    //loads the player into world and the appropriate position to start the level selected
    if(level1Button.isPressed)
      {
        lastLevel = 1;
        menu = 0;
        console.log("play level 1");
        clickSound.play();
        
        mgr.showScene(world);
      }
    else if(level2Button.isPressed)
    {
      lastLevel = 2;
      menu = 0;
      console.log("play level 2");
      clickSound.play();

      mgr.showScene(world);
    }
    else if(level3Button.isPressed)
    {
      lastLevel = 3;
      menu = 0;
      console.log("play level 3");
      clickSound.play();
      
      mgr.showScene(world);
    }
  }
}