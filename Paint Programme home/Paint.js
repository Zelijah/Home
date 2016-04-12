       
    //Declare variables
    var canvas;
    var context;

    //Calling canvas by name fro HTML Document        
    window.onload = function() {
    canvas = document.getElementById("drawingCanvas");
    context = canvas.getContext("2d");
            
    //Begin attaching events for drawing, based on user click
    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmouseout = stopDrawing;
    canvas.onmousemove = draw;

};


//initialize drawing process 
var isDrawing = false; 

function startDrawing(e) {
    //Begin Drawing
    isDrawing = true;
            
    //Create a new path with the current color and thickness of pen 
    context.beginPath();
            
            
    //Start drawing where users pen is positioned
    context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
        }

function stopDrawing() { 
    isDrawing = false;
}

function draw(e) {
    if(isDrawing == true) {
    //Find the new position of the mouse
    var x = e.pageX - canvas.offsetLeft;
    var y = e.pageY - canvas.offsetTop;
        
    //draw a line to end of the cursor position
    context.lineTo(x, y);
    context.stroke();
        
    }
}

// Keep track of the previous clicked <img id> element for color.
var previousColorElement;

function changeColor(color, imgElement) {
    // Change the current drawing color.
    context.strokeStyle = color;
            
    // Give the newly clicked <img id> element a new style.
    imgElement.className = "Selected";
            
    // Return the previously clicked <img id> element to its normal state.
    if (previousColorElement != null) previousColorElement.className = "";
        previousColorElement = imgElement;
}
        
//Keep track of the previously clicked  <img id> element of thickness
var previousThicknessElement; 
    
function changeThickness(thickness, imgElement) {
    //Change the current thickness of drawing
    context.lineWidth = thickness; 
        
        
    //Give the newly clicked <img id> element a new style 
    imgElement.className = "Selected";
        
    //Return the previously clicked <img id> element to its previous state.
    if (previousThicknessElement !=null) previousThicknessElement.className = ""; 
        previousThicknessElement = imgElement;
}


//Function to clear the canvas
function clearCanvas() {
 context.clearRect(0, 0, canvas.width, canvas.height);
}


//Function to save image to canvas 
function saveCanvas() {
 // Find the <img> element.
 var imageCopy = document.getElementById("savedImageCopy");
 // Show the canvas data in the image.
 imageCopy.src = canvas.toDataURL();
 // Unhide the <div> that holds the <img>, so the picture is now visible.
 var imageContainer = document.getElementById("savedCopyContainer");
 imageContainer.style.display = "block";
}
