
let default_alias_url = '../assets/aliases/walk/char3_walk.png'
let default_alias_url_hair = '../assets/aliases/walk/hair_walk/wavy_walk.png'
let default_alias_url_eyes = '../assets/aliases/walk/eyes_walk/eyes_walk.png'
let default_alias_url_clothes = '../assets/aliases/walk/clothes_walk/basic_walk.png'


function parse_sprite_walk(row,img){
    sequence = []
    for(let i = 0; i < 8; i++){
        sequence.push(img.get(char_wid * i , char_height*row, char_wid, char_height))
    }
    return sequence
}

function placeChar(x,y){
    /* places a character at a given X and y position*/ 
    chars.append(new Alias(x,y))
}