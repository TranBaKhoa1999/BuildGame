
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ctx1 = canvas.getContext("2d");
var choosedCharacter=0;
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
    link:"images/windavt.png",
    x:(canvas.width-width)/2-width,
    y:(canvas.height-height)/2-100,
    href:"./game.html?white=true",
    hover:true,
    showoff:"images/showoff/whitedragon.png",
    strength:3,
    health:5,
    defend:4,
    skill:"Scream of Storm: repel the enemy 10m per shot"
};
character[1]={
    link:"images/windavt.png",
    x:character[0].x+width,
    y:character[0].y,
    href:"./game.html?white=true",
    hover:false,
    showoff:"images/showoff/whitedragon.png",
    strength:3,
    health:5,
    defend:4,
    skill:"Scream of Storm: repel the enemy 10m per shot"
};
character[2]={
    link:"images/redavt.png",
    x:character[1].x+width,
    y:character[0].y,
    href:"./game.html?red=true",
    hover:false,
    showoff:"images/showoff/reddragon.png",
    strength:5,
    health:5,
    defend:2,
    skill:"Death's fire: burning enemy with death's fire , deal 3% of enemy's hp per second"
};
character[3]={
    link:"images/icedragonavt.png",
    x:character[0].x,
    y:character[0].y+height,
    href:"./game.html?blue=true",
    hover:false,
    showoff:"images/showoff/bluedragon.png",
    strength:4,
    health:3,
    defend:5,
    skill:"Ice Breath: slow enemies by 90% for 2.7 seconds"
};
character[4]={
    link:"images/machineavt.png",
    x:character[3].x+width,
    y:character[3].y,
    href:"./game.html?machine=true",
    hover:false,
    showoff:"images/showoff/machinedragon.jpg",
    strength:5,
    health:3,
    defend:4,
    skill:"The Death Ray: shot through enemies with the ray of death , deal 10% hp of them."
};
character[5]={
    link:"images/toxicavt.png",
    x:character[4].x+width,
    y:character[3].y,
    href:"./game.html?toxic=true",
    hover:false,
    showoff:"images/showoff/toxicdragon.jpg",
    strength:5,
    health:4,
    defend:4,
    skill:"Death's fire: burning enemy with death's fire , deal 3% of enemy's hp per second"
};

//event
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
        var showoff = new Image();
            showoff.src=character[i].showoff;
            ctx.drawImage(showoff,canvas.width-showoff.width-100,20);
        var star= new Image();
            star.src="images/star.png";
            var starx=canvas.width-showoff.width-100,
                starStrengthy=30+showoff.height,
                starHealthy=starStrengthy+star.height+15,
                starDefendy=starHealthy+star.height+15;
            for(var c =0 ; c<character[i].strength;c++){
                ctx.drawImage(star,starx,starStrengthy);
                starx+=star.width;
            }
            ctx.fillText("Strength:",canvas.width-showoff.width-170,starStrengthy+star.height);
            starx=canvas.width-showoff.width-100;
            for(var k =0 ; k<character[i].health;k++){
                ctx.drawImage(star,starx,starHealthy);
                starx+=star.width;
            }
            ctx.fillText("Health:",canvas.width-showoff.width-170,starHealthy+star.height);
            starx=canvas.width-showoff.width-100;
            for(var k =0 ; k<character[i].defend;k++){
                ctx.drawImage(star,starx,starDefendy);
                starx+=star.width;
            }
            ctx.fillText("Defend:",canvas.width-showoff.width-170,starDefendy+star.height);
            ctx.fillText(character[i].skill,canvas.width-showoff.width-50,starDefendy+star.height*3,700);
        ctx.strokeRect(character[i].x,character[i].y,width,height);
        }
    }
    requestAnimationFrame(drawImage);
}
drawImage();