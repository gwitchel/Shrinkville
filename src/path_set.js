
class PathSet{
    constructor(x,y,w,h,sprite) {
        this.width = w
        this.height = h 
        this.x = x 
        this.y = y 
        this.tiles = []
        this.unfinished_path = undefined; 
        this.paths = [] 
        // propagate the tiles initially with all grass images. 
        this.tile_options = [ basic_grass_img.get(0,48*2,48,48), basic_grass_img.get(0,48*3,48,48), basic_grass_img.get(0,48*7,48,48)]
        for(var i = 0; i < this.width; i++){
            var temp_row = [] 
            for(var j = 0; j < this.height; j++){
                //temp_row.push(random(this.tile_options))
                temp_row.push(this.tile_options[0])
            }
            this.tiles.push(temp_row)
        }
    }

    display(){
        // display all tiles
         for(var i = 0; i < this.tiles.length; i++){
             for(var j = 0; j < this.tiles[i].length; j++){
                 image(this.tiles[i][j],i*48,j*48)
             }
         } 
        
        if (this.unfinished_path != undefined){
            this.unfinished_path.construct();
        }
        // 
    }

    make_new_unfinished_path(){
        this.unfinished_path = new path();
    }
}

class path{
    constructor(){
        this.is_unfinished = true; 
        this.is_started = false;
        this.trail = []

        this.tile = basic_grass_img.get(0,48*7,48,48)
    }

    construct(){
        if (!this.is_started){ 
            image(this.tile,0,mouseY-mouseY%48)
        } else if (this.is_unfinished){
            //console.log("TRAIL",this.trail)
        }
        this.display()
    }

    display(){
        for (var i = 0; i < this.trail.length; i++){
            let block = this.trail[i]
            image(this.tile,block["x"]*48,block["y"]*48)
        }
    }
}