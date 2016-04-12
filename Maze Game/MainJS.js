

// Define the global var for the canvas and the drawing context. 

var canvas;
var context;

window.onload = function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    
    //Draw maze that html page starts with
    drawMaze ("easy_maze.png", 5, 5);
    
    //When the user presses a key, run the processKey() function
    window.onkeydown = processKey;
};
    
    //Keeping track of the current position of emoji
    var x = 0;
    var y = 0;
    
    function drawMaze(mazeFile, startingX, startingY) {
        //Load selected maze 
        imgMaze = new Image();
        imgMaze.onload = function() {
            //resize the canvas to match the size of maze image 
            canvas.width = imgMaze.width;
            canvas.height = imgMaze.height;
            
            //Now draw the maze 
            var imgFace = document.getElementById("face");
            context.drawImage(imgMaze, 0, 0);
            
            //then draw the face
            x = startingX;
            y = startingY;
            
            context.drawImage(imgFace, x, y);
            context.stroke();
            
            //Draw the next frame in 10 milliseconds 
            setTimeout("drawFrame()", 10);
        };
            imgMaze.src = mazeFile;  
        }
    var dx = 0;
    var dy = 0; 
    
    function processKey(e) {
        //if the emoji is moving then stop it
        dx = 0;
        dy = 0; 
        
        //When Arrow Up is pressed, move up
        if (e.keyCode == 38) {
            dy = -1;
        }
        
        //When Arrow Down is pressed, move down
        if (e.keyCode == 40) {
            dy = 1; 
        }
        
        //When Arrow Left is pressed, move left 
        if(e.keyCode == 37) {
            dx = -1;
        }
        
        //When Arrow Right is pressed, move right 
        if(e.keyCode == 39) {
            dx = 1;
        }
    }

//Get pixels starting at point (0,0) and stretching out 100 pixels to the right and 50 pixels down 
var imageData = context.getImageData(0, 0, 100, 50);

var pixels = imageData.data;

    //For loop to check each pixel then invert the color
    for (var i = 0, n = pixels.length; i < n; i+=4) {
        
        //Get the data for one pixel
        var red = pixels[i];
        var green = pixels[i+1];
        var blue = pixels[i+2];
        var alpha = pixels[i+3];
        
        //now invert the colors 
        pixels[i] = 255 - red;
        pixels[i+1] = 255 - green;
        pixels[i+2] = 255 - blue;   
    }
context.putImageData(imageData, 0, 0);

function checkForCollision() {
    //Grab the block of pixels surrounding the 'Face' but extend edges slighty, to minimize unnecessary collision.
    var imgData = context.getImageData(x-1, y-1, 15+2, 15+2);
    var pixels = imgData.data;
    
    //Check these pixels
    for (var i = 0; n = pixels.length, i < n; i +=4) {
        
        var red = pixels[i];
        var green = pixels[i+1];
        var blue = pixels[i+2];
        var alpha = pixels[i+3];
        
        //look for black walls (another form of collision)
        if (red == 0 && green == 0 && blue == 0) {
            return true;
        }
        //look for gray edge space (another form of collision)
        if (red == 169 && green == 169 && blue == 169){
            return true;
        }
        
    }
    //If there was no collision 
    return false; 
}


    function drawFrame() {
        if (dx != 0 || dy != 0) {
            
            context.beginPath();
            context.fillStyle = "rgb(254,244,207)";
            context.rect(x, y, 14, 14);
            context.fill();
            
            //Increment the face's position
            x += dx;
            y += dy;
            
            if(checkForCollision()) {
                x -= dx;
                y -= dy;
                dx = 0;
                dy = 0;
            }
            
            var imgFace = document.getElementById("face");
            context.drawImage(imgFace, x, y);
            
            if (y > (canvas.height -17)) {
                alert("Congratulations, you escaped the maze");
                return;
            }
        }
        
        //Draw a new frame in 10 milliseconds
        setTimeout("drawFrame()", 10);
        
        }
        function loadEasy() {
        drawMaze('easy_maze.png', 5, 5);  
        
}

        function loadMedium() {
        drawMaze("mazes.png", 268, 5);
}
        function loadHard(){
        drawMaze("Hard_maze.png", 12, 3);
            
}
        function loadExtreme(){
        drawMaze("Super_maze.png", 12, 3);
}


    
    
    
    
    
    
