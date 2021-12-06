let char1_walk_base, char2_walk_base, char3_walk_base;
let char_wid,char_height;
let walk_clothes_top,walk_clothes_bottom;
let basic_grass_img,basic_path_img; 
var first_sprite, base_scene;
let create_path_button;

// modes 
let modes = ["nothing", "start_path","draw_path", "edit_path"]
let current_mode = "nothing"

function preload(){
  preload_variables();
  //sprites_data = loadJSON('../assets/aliases/sprite_info.json');
  char_img = loadImage("../assets/aliases/walk/char1_walk.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(50);

  // create the first sprite and set it's animations 
  first_sprite = new AliasSprite();  
  first_sprite_shirt = new AliasSprite();  
  first_sprite_pants = new AliasSprite()
  
  first_sprite.set_walk_animation(char1_walk_base)
  first_sprite_shirt.set_walk_animation(walk_clothes_top,0)
  first_sprite_pants.set_walk_animation(walk_clothes_bottom)

  // initialize the background as a new pathset 
  base_scene = new PathSet(0,0,int(windowWidth/48),int(windowHeight/48))

  // initialize buttons 
  create_path_button = new Clickable(); 
  create_path_button.text = "create New Path"
  create_path_button.locate(20, 20); 
  create_path_button.onPress = function(){  
    if (base_scene.unfinished_path == undefined){
      base_scene.make_new_unfinished_path();  
      current_mode = "start_path"
    }           
  }

}


function draw() {
  background(100)

  // display the scene 
  base_scene.display()
  create_path_button.draw()
  //display the sprite 
  //animation(first_sprite["animations"]["walk_forward"], mouseX, mouseY);
  //animation(first_sprite_shirt["animations"]["walk_forward"], mouseX, mouseY);
  //animation(first_sprite_pants["animations"]["walk_forward"], mouseX, mouseY);

  //first_sprite.walk("forward")

}

function keyPressed() {
  if (current_mode === "start_path"  && keyCode == ENTER){
      base_scene.unfinished_path.is_started = true
      base_scene.unfinished_path.trail.push ({
        "x":0,
        "y":(mouseY-mouseY%48)/48,
      }) 
      current_mode = "draw_path"
  }
  if( current_mode == "draw_path" ){
    let previous_block = base_scene.unfinished_path.trail[base_scene.unfinished_path.trail.length -1]
    if(keyCode == RIGHT_ARROW){
      base_scene.unfinished_path.trail.push ({
        "x":previous_block["x"]+1,
        "y":previous_block["y"],
      }) 
    }
    if(keyCode == LEFT_ARROW){
      base_scene.unfinished_path.trail.push ({
        "x":previous_block["x"]-1,
        "y":previous_block["y"],
      }) 
    }
    if(keyCode == UP_ARROW){
      base_scene.unfinished_path.trail.push ({
        "x":previous_block["x"],
        "y":previous_block["y"]-1,
      }) 
    }
    if(keyCode == DOWN_ARROW){
      base_scene.unfinished_path.trail.push ({
        "x":previous_block["x"],
        "y":previous_block["y"]+1,
      }) 
    }
    if(keyCode == ENTER){
      base_scene.finish_path();
    }
  }
}
