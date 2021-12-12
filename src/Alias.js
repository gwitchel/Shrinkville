// monsters (aliases) are metaphorical for the lambda function. 

class Alias {
  constructor(x,y,id=0) {
    this.x = x;
    this.y = y;
    this.index = 0;
    this.sprite = new AliasSprite();
    this.sprite_shirt = new AliasSprite();
    this.sprite_pants = new AliasSprite();
    // set sprites animations
    this.sprite.set_walk_animation(char1_walk_base)
    this.sprite_shirt.set_walk_animation(walk_clothes_top,0)
    this.sprite_pants.set_walk_animation(walk_clothes_bottom)
  } 

  show(){
      animation(this.sprite["animations"]["walk_forward"], this.x, this.y);
      animation(this.sprite_shirt["animations"]["walk_forward"], this.x, this.y);
      animation(this.sprite_pants["animations"]["walk_forward"], this.x, this.y);
  }
}

class AliasSprite{
  constructor(id = null) {
    this.w = char_wid; 
    this.h = char_height; 
    this.x; 
    this.y;
    this.index = 0; // animation index 
    this.animations = {};
    this.id = id;
  }
  set_pos(x,y){
    this.x = x; 
    this.y = y; 
  }
  set_walk_animation(img,start_x = 0, start_y = 0){
    // specifically sets the walk animation for a 
    // 4 x 8 (32x32) bit sprite image.
    let forward =  this.parse_sprite_walk(0,img,start_x,start_y)
    let backward =  this.parse_sprite_walk(1,img,start_x,start_y)
    let right =  this.parse_sprite_walk(2,img,start_x,start_y)
    let left =  this.parse_sprite_walk(3,img,start_x,start_y)
    this.animations["walk_forward"] = loadAnimation(forward[0], forward[1],forward[2],forward[3],forward[4],forward[5],forward[6],forward[7]);
    this.animations["walk_backward"] = loadAnimation(backward[0], backward[1],backward[2],backward[3],backward[4],backward[5],backward[6],backward[7]);
    this.animations["walk_right"] = loadAnimation(right[0], right[1],right[2],right[3],right[4],right[5],right[6],right[7]);
    this.animations["walk_left"] = loadAnimation(left[0],left[1],left[2],right[3],right[4],right[5],right[6],right[7]);

  }
  parse_sprite_walk(row,img,start_x = 0, start_y = 0){
    // parses 4 x 8 (32x32) bit sprite images.
    console.log("IMG",img)
    let sequence = []
    for(let i = 0; i < 8; i++){
        sequence.push(img.get(start_x + char_wid * i , start_y + char_height*row, char_wid, char_height))
    }
    return sequence
}
  walk(direction) {
    let index = floor(this.index) % 8 ; // number of frames in walk sequence 
    if (direction == "forward"){
    //  image(this.animations["walk_animations"]["sequences"]["walk_forward"][index], this.x, this.y);
    }
    this.index += 1;
  }
}

