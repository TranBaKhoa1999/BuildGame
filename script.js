var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// position where the frame will be draw
var character = new Image();
character.src = "images/reddragon.png";


var sheetWidth = 699;
var sheetHeight = 105;

var frameCount = 7;
var frameCol = 1;


var width = sheetWidth / frameCount;
var height = sheetHeight / frameCol;

var x = 0;
var y = (canvas.height-height)/2;
var srcX;
var srcY=0;

var currentFrame = 0;

// Process Moving
document.addEventListener("keydown",pressArrowKeys,true);
function pressArrowKeys(Event){
    var Up,Down,Left,Right;
    var prex=x,prey=y;
//    switch(Event.keyCode){
//        case 38:
//            y-=30;
//            break;
//        case 40:
//            y+=10;
//            break;
//        case 37:
//            x-=10;
//            break;
//        case 39:
//            x+=10;
//            break;
//    }
    if(Event.keyCode==38|| Event.keyCode==87){
        Up=true;
    }
    if(Event.keyCode==40|| Event.keyCode==83){
        Down=true;
    }
    if(Event.keyCode==37|| Event.keyCode==65){
        Left=true;
    }
    if(Event.keyCode==39|| Event.keyCode==68){
        Right=true;
    }
    //
    if(Up==true){
        y-=30;
    }
    if(Down==true){
        y+=20;
    }
    if(Left==true){
        x-=10;
    }
    if(Right==true){
        x+=10;
    }
     ctx.clearRect(prex,prey,width,height);
}
//void KeyPressed(){
//    if(Event.keyCode==38) Up=true;
//    if(Event.keyCode==40 )Down=true;
//    if(Event.keyCode==37) Left=true;
//    if(Event.keyCode==39) Right=true;
//}
function keyRealeased(){
    Up=false;
    Down=false;
    Left=false;
    Right=false;
}
//End
function updateFrame() {
    currentFrame=currentFrame+1;
    currentFrame = currentFrame % frameCount;
    ctx.clearRect(x,y,width,height);
    srcX = currentFrame * width;
    srcY =0;
}

function drawImage() {
    updateFrame();
    if(y+height>=canvas.height){
        y=canvas.height-height;
    }
    else if(y<=0){
       y=0;
    };
    if(x<=0){
        x=0;
    }
    else if(x+width>=canvas.width){
        
        x=canvas.width-width;
    }
    ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
}

// sleep
setInterval(function(){
    drawImage();
},100);