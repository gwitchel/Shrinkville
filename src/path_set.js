
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
        this.tile_options = [ basic_grass_img, basic_grass_img.get(0,32*3,32,32), basic_grass_img.get(0,32*7,32,32)]
        for(var i = 0; i < this.width; i++){
            var temp_row = [] 
            for(var j = 0; j < this.height; j++){
                //temp_row.push(random(this.tile_options))
                temp_row.push(this.tile_options[0])
            }
            this.tiles.push(temp_row)
        }
        this.tiles[this.end_tile_pos[0]][this.end_tile_pos[1]] = castle_img


    }

    display(){
        // display all tiles
         for(var i = 0; i < this.tiles.length; i++){
             for(var j = 0; j < this.tiles[i].length; j++){
                 image(this.tiles[i][j],i*32,j*32)

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
                console.log("UNFINISHED PATH CHECK ID", this.unfinished_path)
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
                curr_path.end = 0
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
                        curr_path.end = this.paths[i].id
                        return true
                    }
                }
            }
        }
        return false
    }
}

class path{
    constructor(id = int(random(1000))){
        // if two paths have the same Id number they are actually the same path but split
        this.id = id // id number is a random number, technically two could have same ID, but very unlikely, change leter
        this.is_unfinished = true; 
        this.is_started = false;
        this.trail = []
        this.end = undefined; // path endpoint, either the main end, or merges with another path. 
        this.tile = basic_dirt_img
    }

    construct(){
        console.log("Current_Mode", current_mode)

        if (!this.is_started){ 
            image(this.tile,0,mouseY-mouseY%32,)
        } else if (this.is_unfinished){
            
        }
        this.display()
    }

    display(){
        for (var i = 0; i < this.trail.length; i++){
            let block = this.trail[i]
            image(this.tile,block["x"]*32,block["y"]*32)
        }

        let end_block = this.trail[this.trail.length-1]
        if (this.end!= 0 && this.end != undefined){
            image(gate_img,end_block["x"]*32,end_block["y"]*32)
        }
    }
}

function splitPath(x,y){
    /* Will eventually split paths based on ID, but until then will arbitrarily generate a new path
    one square above the current square in the pathSet*/ 
    console.log("BAse_Scene", base_scene)
    base_scene.unfinished_path = new path();
    console.log("BAse_Scene with new path", base_scene)

    base_scene.unfinished_path.is_started = true; 
    base_scene.unfinished_path.trail.push({
        "x":(mouseX-mouseX%32)/32,
        "y":(mouseY-mouseY%32)/32 - 1,
      })
    current_mode = "draw_path"

}