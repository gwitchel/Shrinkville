
class PathSet{
    constructor(x,y,w,h,sprite) {
        this.width = w
        this.height = h 
        this.x = x 
        this.y = y 
        this.tiles = []
        // propagate the tiles initially with all grass images. 
        this.tile_options = [ basic_grass_img.get(0,48*2,48,48), basic_grass_img.get(0,48*3,48,48), basic_grass_img.get(0,48*7,48,48)]
        console.log("TILES OPTIONS", this.tile_options)
        for(var i = 0; i < this.width; i++){
            var temp_row = [] 
            for(var j = 0; j < this.height; j++){
                //temp_row.push(random(this.tile_options))
                temp_row.push(this.tile_options[0])
            }
            this.tiles.push(temp_row)
        }
        console.log("TILES", this.tiles)
    }

    display(){
         for(var i = 0; i < this.tiles.length; i++){
             for(var j = 0; j < this.tiles[i].length; j++){
                 image(this.tiles[i][j],i*48,j*48)
             }
         }
    }
}

class path{
    // TODO determine how to display a path. 
    constructor(){

    }
}