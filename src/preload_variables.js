function preload_variables(){
    char1_walk_base = loadImage("../assets/aliases/walk/char1_walk.png");
    char2_walk_base = loadImage("../assets/aliases/walk/char2_walk.png");
    char3_walk_base = loadImage("../assets/aliases/walk/char3_walk.png");

    walk_clothes_top = loadImage("../assets/aliases/walk/clothes_walk/basic_walk.png");
    walk_clothes_bottom = loadImage("../assets/aliases/walk/clothes_walk/pants_suit_walk.png");

    basic_grass_img = loadImage('../assets/background/tiles/tiles.png')

    basic_path_img = loadImage('../assets/background/tiles/tiles.png');
    basic_path_img = basic_path_img.get(0,48*7,48,48)
    char_wid = 32
    char_height = 32
}