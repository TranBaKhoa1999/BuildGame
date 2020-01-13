
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx1 = canvas.getContext("2d");
var choosedCharacter=0;
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
ctx.strokeStyle="#0ff";
ctx.lineWidth=4;
//game start when enter
document.addEventListener("keyup",gameStart);
function gameStart(event){
    if(event.keyCode==13){
        window.location.href=character[choosedCharacter].href;
    }
}
//list character
// các phần tử để canh chính : [0] cho hàng 1 và [3] , [3] cho hàng 2
var width=93;
var height=76;
var character=[];
character[0]={
    link:"images/redavt.png",
    x:(canvas.width-width)/2-width,
    y:(canvas.height-height)/2-100,
    href:"./game.html?white=true",
    hover:true
};
character[1]={
    link:"images/redavt.png",
    x:character[0].x+width,
    y:character[0].y,
    href:"./game.html?white=true",
    hover:false
};
character[2]={
    link:"images/redavt.png",
    x:character[1].x+width,
    y:character[0].y,
    href:"./game.html?red=true",
    hover:false
};
character[3]={
    link:"images/redavt.png",
    x:character[0].x,
    y:character[0].y+height,
    href:"./game.html?blue=true",
    hover:false
};
character[4]={
    link:"images/redavt.png",
    x:character[3].x+width,
    y:character[3].y,
    href:"./game.html?machine=true",
    hover:false
};
character[5]={
    link:"images/redavt.png",
    x:character[4].x+width,
    y:character[3].y,
    href:"./game.html?toxic=true",
    hover:false
};

//event
        var hoverLink = ""; // Href of the link which cursor points at

        // Draw the link
    function update(){
        for(var i=0;i<character.length;i++){
            character[i].hover=false;
        }
    }
        // Link hover
    function on_mousemove (ev) {
        var x, y;
        var k;
        // Get the mouse position relative to the canvas element
        if (ev.layerX || ev.layerX == 0) { // For Firefox
            x = ev.layerX;
            y = ev.layerY;
        }

        // Link hover
        for (var i = character.length - 1; i >= 0; i--) {
            var linkX=character[i].x,
                linkY=character[i].y,
                linkWidth=width,
                linkHeight=height;

            // Check if cursor is in the link area
            if (x >= linkX && x <= (linkX + linkWidth) && y >= linkY && y <= (linkY + linkHeight)){
                document.body.style.cursor = "pointer";
                choosedCharacter=i;
                break;
            }
            else {
                document.body.style.cursor = "";
            }
        };
    }

    // character click
    function on_click(e) {
        update();
        character[choosedCharacter].hover=true;
    }
canvas.addEventListener("mousemove", on_mousemove, false);
canvas.addEventListener("click", on_click, false);
document.addEventListener("keydown",press,true);
    function press(ev){
        var flag;
        for(var i=0;i<character.length;i++){
            if(character[i].hover==true){
                flag=i;
                break;
            }
        }
        if(ev.keyCode==83||ev.keyCode==65||ev.keyCode==37||ev.keyCode==40){ // down
            if(flag-1>=0){
                choosedCharacter=flag-1;
                on_click();
            }
        }
       else if(ev.keyCode==87||ev.keyCode==68||ev.keyCode==38||ev.keyCode==39){ // up
           if(flag+1<=character.length-1){
               choosedCharacter=flag+1;
                on_click();
           }
       }
        
    }

// draw list
function drawImage(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillText("Press Enter to start!!",canvas.width/2,canvas.height-10);
    for(var i =0 ;i<character.length;i++){
        var img= new Image();
        img.src=character[i].link;
        ctx.drawImage(img,character[i].x,character[i].y);
        if(character[i].hover==true){
            ctx.strokeRect(character[i].x,character[i].y,width,height);
        }
    }
    requestAnimationFrame(drawImage);
}
drawImage();