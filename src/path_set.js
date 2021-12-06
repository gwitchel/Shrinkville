
class PathSet{
    constructor(x,y,w,h,sprite) {
        this.width = w
        this.height = h 
        this.x = x 
        this.y = y 
        this.tiles = []
        this.unfinished_path = undefined; 
        this.end_tile_pos = [this.width-3,int(this.height/2)]
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
        this.tiles[this.end_tile_pos[0]][this.end_tile_pos[1]] = basic_grass_img.get(0,48*7,48,48)

    }

    display(){
        // display all tiles
         for(var i = 0; i < this.tiles.length; i++){
             for(var j = 0; j < this.tiles[i].length; j++){
                 image(this.tiles[i][j],i*48,j*48)
             }
         } 
        // display all finished paths 
        for (var i = 0; i < this.paths.length; i++){
            this.paths[i].display()
        }
        if (this.unfinished_path != undefined){
            this.unfinished_path.construct();

            if(this.is_path_finished(this.unfinished_path)){
                this.unfinished_path.is_unfinished = false
                this.paths.push(this.unfinished_path)
                this.unfinished_path = undefined
                current_mode = "nothing"
            }
           
        }
    }

    make_new_unfinished_path(){
        this.unfinished_path = new path();
    }

    is_path_finished(curr_path){
        /* checks to see if a path if finished, either is intersects with an existing path 
        or it's at the endpoint*/
        
        if(curr_path.trail.length != 0){
            var tail = curr_path.trail[this.unfinished_path.trail.length-1]
            // checks to see if path is at endpoint
            if (tail["x"] == this.end_tile_pos[0] && tail["y"] == this.end_tile_pos[1]){
                return true
            }
            // checks to see if path intersects with another path 
            for(var i = 0; i < this.paths.length;i++){
                for(var j = 0; j < this.paths[i].trail.length; j++){
                    var tile_to_compare = this.paths[i].trail[j]
                    console.log(tail,tile_to_compare)
                    if (tail["x"] == tile_to_compare["x"] && tail["y"] == tile_to_compare["y"]){
                        console.log("Paths",this.paths)
                        console.log("PATH", this.paths[i].trail[j], i, j)
                        return true
                    }
                }
            }
        }
        return false
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
        console.log("Current_Mode", current_mode)

        if (!this.is_started){ 
            image(this.tile,0,mouseY-mouseY%48)
        } else if (this.is_unfinished){
            
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