var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// position where the frame will be draw
var character = new Image();
character.src = "images/reddragon.png";
var bg= new Image();
bg.src="images/map1.jpg";
var bullet = new Image();
bullet.src="images/fire1.png";

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
var prex,prey;

var bulletShow = [];
//bulletShow[0]={
//    xBullet : x+width,
//    yBullet : (canvas.height-height)/2+20
//};
document.addEventListener("keyup",fire);
function fire(event){
    if(event.keyCode==32|| event.keyCode==0){
        bulletShow.push({
           xBullet:x+width,
            yBullet:y+20
        });
    }
}
// Process Moving
document.addEventListener("keydown",pressArrowKeys,true);
function pressArrowKeys(Event){
    var Up,Down,Left,Right;
    //ctx.clearRect(x,y,width,height);
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
    prex=x;
    prey=y;
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
        y-=20;
    }
    if(Down==true){
        y+=20;
    }
    if(Left==true){
        x-=20;
    }
    if(Right==true){
        x+=20;
    }
    drawImage();
}

//function keyRealeased(){
//    Up=false;
//    Down=false;
//    Left=false;
//    Right=false;
//}
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
    ctx.drawImage(bg,0,0);
    for(var i =0 ; i<bulletShow.length;i++){
            ctx.drawImage(bullet,bulletShow[i].xBullet,bulletShow[i].yBullet);
        bulletShow[i].xBullet+=10;
    }
     ctx.clearRect(prex,prey,width,height);
    if(y+height>=canvas.height){
        y=canvas.height-height;
    }
    else if(y<=0){
       y=0;
    }
    
    if(x<=0){
        x=0;
    }
    else if(x+width>=canvas.width){
        
        x=canvas.width-width;
    }
    ctx.drawImage(character,srcX,srcY,width,height,x,y,width,height);
    //requestAnimationFrame(drawImage);
}
//// sleep
setInterval(function(){
    drawImage();
},70);