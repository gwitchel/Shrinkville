let char1_walk_base, char2_walk_base, char3_walk_base;
let char_wid,char_height;
let walk_clothes_top,walk_clothes_bottom;
let basic_grass_img; 
let seqs = []
var first_sprite, paths;

function preload(){
  preload_variables();
  //sprites_data = loadJSON('../assets/aliases/sprite_info.json');
  char_img = loadImage("../assets/aliases/walk/char1_walk.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(50);
  first_sprite = new AliasSprite();   //image(char_img, 20, 20, 300, 300);
  first_sprite_shirt = new AliasSprite();   //image(char_img, 20, 20, 300, 300);
  first_sprite_pants = new AliasSprite()
  
  first_sprite.set_walk_animation(char1_walk_base)
  first_sprite_shirt.set_walk_animation(walk_clothes_top,0)
  first_sprite_pants.set_walk_animation(walk_clothes_bottom)

  paths = new PathSet(0,0,int(windowWidth/48),int(windowHeight/48))
  console.log("First sprite;", first_sprite)
}

function draw() {
  background(100)
  paths.display()
  //console.log(frameRate())
  animation(first_sprite["animations"]["walk_forward"], mouseX, mouseY);
  animation(first_sprite_shirt["animations"]["walk_forward"], mouseX, mouseY);
  animation(first_sprite_pants["animations"]["walk_forward"], mouseX, mouseY);

  first_sprite.walk("forward")

}

