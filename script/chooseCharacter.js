
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
ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("Press Enter to start!!",canvas.width/2,canvas.height/2);
//game start when enter
document.addEventListener("keyup",gameStart);
function gameStart(event){
    if(event.keyCode==13){
        window.location.href="/game.html?red=true";
    }
}