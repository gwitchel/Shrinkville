let char1_walk_base, char2_walk_base, char3_walk_base;
let char_wid,char_height;
let walk_clothes_top,walk_clothes_bottom;
let basic_grass_img,basic_tiles_img,basic_dirt_img,gate_img,castle_img,bridge_img; 
var first_sprite, base_scene;
let create_path_button;

// modes 
let modes = ["nothing", "start_path","draw_path", "edit_path","place_char"]
// place char simply lets you place a sprite anywhere on the board simply by pressing p 
let current_mode = "nothing"

let chars = []
let special_images = [] // special images to show on top with no context 
// currently being used to show the brige 
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
  base_scene = new PathSet(0,0,20,10)

  // initialize buttons 
  create_path_button = new Clickable(); 
  create_path_button.text = "add path" 
  create_path_button.locate(400, 500); 
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
  for(var i = 0; i < chars.length; i++) chars[i].show();
  for (var i = 0; i < special_images.length; i++) image(special_images[i]["img"],special_images[i]["x"],special_images[i]["y"])
  generate_lamda(base_scene)

}

function keyPressed() {
  console.log("A key was pressed! Current Mode is: ", current_mode)
  if (key === "p" ){
    chars.push(new Alias((mouseX-mouseX%32)+16,(mouseY-mouseY%32)+8))
  } else if (key == "s"){
    // FINISH THIS: need to be able to split a path (probably use a helper function)
    splitPath((mouseX-mouseX%32)+1,(mouseY-mouseY%32))
  } else if (key == "b"){
    console.log("PUSHING A SPECIAL IMAGE")
    special_images.push({
      "img": bridge_img,
      "x": (mouseX-mouseX%32),
      "y": (mouseY-mouseY%32)b,
    })
  }
  


  if (current_mode === "start_path"  && keyCode == ENTER){
      base_scene.unfinished_path.is_started = true
      base_scene.unfinished_path.trail.push ({
        "x":0,
        "y":(mouseY-mouseY%32)/32,
      }) 
      current_mode = "draw_path"
  } else if( current_mode == "draw_path" ){
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
    if(keyCode == ENTER){ // finish the path
      base_scene.paths.push(base_scene.unfinished_path)
      base_scene.unfinished_path = undefined 
      current_mode = "nothing"
    }
    
  }
}
