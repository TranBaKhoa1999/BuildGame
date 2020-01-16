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
function back(){
    window.location.href="./index.html";
}