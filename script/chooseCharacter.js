
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var soundTrack = new Audio();
soundTrack.src="sounds/soundtrack.mp3";
function playormute(){
    if(soundTrack.paused){
         soundTrack.play();
        document.getElementById("show").className="fa fa-volume-up";
     }
    else{
        soundTrack.pause();
        document.getElementById("show").className="fa fa-volume-mute";
    }
}
var bg = new Image();
bg.src="images/redavt.png";

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Press Enter to start!!",canvas.width/2,canvas.height-10);
//game start when enter
document.addEventListener("keyup",gameStart);
function gameStart(event){
    if(event.keyCode==13){
        window.location.href="./game.html?red=true";
    }
}
//list character
// các phần tử để canh chính : [0] cho hàng 1 và [3] , [3] cho hàng 2
var width=93;
var height=76;
var character=[];
character[0]={
    link:"images/redavt.png",
    x:(canvas.width-width)/2,
    y:(canvas.height-height)/2-100
};
character[1]={
    link:"images/redavt.png",
    x:character[0].x-width,
    y:character[0].y
};
character[2]={
    link:"images/redavt.png",
    x:character[0].x+width,
    y:character[0].y
};
character[3]={
    link:"images/redavt.png",
    x:character[0].x,
    y:character[0].y+height
};
character[4]={
    link:"images/redavt.png",
    x:character[3].x-width,
    y:character[3].y
};
character[5]={
    link:"images/redavt.png",
    x:character[3].x+width,
    y:character[3].y
};
// draw list
function drawImage(){
    for(var i =0 ;i<character.length;i++){
        var img= new Image();
        img.src=character[i].link;
        ctx.drawImage(img,character[i].x,character[i].y);
    }
    requestAnimationFrame(drawImage);
}
drawImage();