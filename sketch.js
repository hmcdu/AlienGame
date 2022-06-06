var gui;
var myFont;
var responsive = true;
var p2_spritesheet, enemiesSpriteSheet, fireBallSpriteSheet, deadEnemiesSpriteSheet, doorsSpriteSheet;
var walk, walk_left, jump, duck, fly, slime, bat, fireBall, deadEnemy, openDoor, closedDoor;
var walk_frames, jump_frames, duck_frames, stand_frames, fly_frames, slime_frames, bat_frames, fireBall_frames, deadEnemy_frames, openDoor_frames, closedDoor_frames;
var ground;
var crouchBlocks;
var enemies = [];
var spriteHeight;
var world_sprite, world_sprite1, world_sprite2;
var enemy_sprite;
var menu = true;
var pauseMenu = false;
var canvas;
let SCENE_W = 2800;
let SCENE_H = 1050;
var forceCrouch = false;
var mgr;
var level = 0;
var count;
var mapTile;
var projectiles = [];
var forceCrouch = [];
var lavaTile = []
var collidables = [1, 2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 
                  16, 17, 18, 19, 20, 22, 23, 24, 31, 32, 33, 34, 35, 
                  36, 37, 38, 39, 40, 45, 46, 52, 53, 54];
var crouchRegion = [5, 6, 7, 8, 17, 18, 19, 38, 39, 40, 52, 53, 54];
var bottomBridgeBlocks = [43, 44];
var topBridgeBlocks = [45, 46];
var lavaBlocks = [9];
var lastLevel;
var levelImg;
var deathCause;
var door;
var jumpSound, clickSound, whooshSound;


function preload()
{
  //loads in all the sound effect files
  jumpSound = loadSound('assets/jump.wav');
  clickSound = loadSound('assets/click.wav');
  whooshSound = loadSound('assets/whoosh.wav');
  
  //defines the frames of the walk animation 
  walk_frames = 
  [
    {'name':'player_right01', 'frame':{'x':0, 'y': 95, 'width': 70, 'height': 94}},
    {'name':'player_right02', 'frame':{'x':71, 'y': 95, 'width': 70, 'height': 94}},
    {'name':'player_right03', 'frame':{'x':142, 'y': 95, 'width': 70, 'height': 94}},
    {'name':'player_right04', 'frame':{'x':213, 'y': 0, 'width': 70, 'height': 94}},
    {'name':'player_right05', 'frame':{'x':355, 'y': 0, 'width': 70, 'height': 94}},
  ];
     
    //defines the frames of the jump animation
  jump_frames = 
  [
    {'name':'player_jump01', 'frame':{'x': 423, 'y': 95, 'width': 66, 'height': 94}}
  ];
    
    //defines the frames of the duck animation
  duck_frames = 
  [
    {'name':'player_duck01', 'frame':{'x': 355, 'y': 95, 'width': 67, 'height': 72}}
  ];
    
    //defines the frames of the stand animation
  stand_frames = 
  [
    {'name':'player_stand01', 'frame':{'x': 0, 'y': 190, 'width': 66, 'height': 92}}
  ];

  fly_frames = 
  [
    {'name':'enemy_fly01', 'frame':{'x': 158, 'y': 0, 'width': 57, 'height': 45}},
    {'name':'enemy_fly02', 'frame':{'x': 215, 'y': 0, 'width': 65, 'height': 39}}
  ];
  
  slime_frames = 
  [
    {'name':'enemy_slime01', 'frame':{'x': 280, 'y': 0, 'width': 49, 'height': 34}},
    {'name':'enemy_slime02', 'frame':{'x': 329, 'y': 0, 'width': 57, 'height': 30}}
  ];

  bat_frames = 
  [
    {'name':'enemy_bat01', 'frame':{'x': 0, 'y': 0, 'width': 70, 'height': 47}},
    {'name':'enemy_bat02', 'frame':{'x': 70, 'y': 0, 'width': 88, 'height': 37}}
  ];

  fireBall_frames = 
  [
    {'name':'fireBall01', 'frame':{'x': 0, 'y': 0, 'width': 70, 'height': 70}},
    {'name':'fireBall02', 'frame':{'x': 70, 'y': 0, 'width': 70, 'height': 70}},
    {'name':'fireBall03', 'frame':{'x': 140, 'y': 0, 'width': 70, 'height': 70}},
    {'name':'fireBall04', 'frame':{'x': 210, 'y': 0, 'width': 70, 'height': 70}}
  ];

  deadEnemy_frames = 
  [
    {'name':'deadBat02', 'frame':{'x': 176, 'y': 0, 'width': 51, 'height': 70}}
  ];


  //was going to animate the door opening but ran into bugs that I don't get time to fix

  // openDoor_frames = [
  //   {'name':'openDoor01', 'frame':{'x': 70, 'y': 0, 'width': 70, 'height': 70}}
  // ];

  // closedDoor_frames = [
  //   {'name':'closedDoor01', 'frame':{'x': 0, 'y': 0, 'width': 70, 'height': 70}}
  // ];

  
  //loads in all the images needed for the game
  
  halfHeartImg = loadImage('assets/hud_heartHalf.png');
  fullHeartImg = loadImage('assets/hud_heartFull.png');
  emptyHeartImg = loadImage('assets/hud_heartEmpty.png');
  doorImg = loadImage('assets/world/28.png');
  lavaDeathImg = loadImage('assets/lavaDeath.png');
  fallDeathImg = loadImage('assets/fallDeath.png');
  enemyDeathImg = loadImage('assets/enemyDeath.png');
  controlsImg = loadImage('assets/controls.png');
  mainMenuImg = loadImage('assets/mainMenu.png');
  gameCompleteImg = loadImage('assets/gameComplete.png');
  levelCompleteImg = loadImage('assets/levelComplete.png');
  hudImg = loadImage('assets/HUD.png');

}


function setup() 
{
  createCanvas(800,600);
  resetSketch();
  
}

function draw() 
{

//this draws whatever seen has been requested
mgr.draw()
  
}

//this was a hack solution to fix the transitioning back to scenes with a gui on them
//like between controls and mainMenu

//this fixes the issue of transitioning between scenes with a gui 
//but can't be run once the world scene has been loaded 
//otherwise it will break the game 
function resetSketch()
{
  mgr = new SceneManager();
  mgr.addScene (mainMenu);
  mgr.addScene (levelSelect);
  mgr.addScene (world);
  mgr.addScene (death);
  mgr.addScene (levelComplete);
  mgr.addScene (gameComplete);
  mgr.addScene (controls);
  mgr.showScene(mainMenu);
}

