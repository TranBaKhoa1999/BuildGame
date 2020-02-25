var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var score=0;
//get param from URL to determine which character
var urlParams = new URLSearchParams(window.location.search);
var link="";
var linkbullet="";
var bulletHeight;
if(urlParams.has('red')==true){
    link="images/reddragon.png";
    linkbullet="images/fire.png";
}
else if(urlParams.has('blue')==true){
    link="images/bluedragon.png";
    linkbullet="images/bluefire.png";
}
else if(urlParams.has('white')==true){
    link="images/whitedragon.png";
    linkbullet="images/wind2.png";
}
else if(urlParams.has('toxic')==true){
    link="images/toxicdragon.png";
    linkbullet="images/doc.PNG";
}
else if(urlParams.has('machine')==true){
    link="images/machinedragon.png";
    linkbullet="images/lazer.png";
}
else{
    link="images/reddragon.png";
    linkbullet="images/fire.png";
}

//audio
var   enemyDeadSound = new Audio();
enemyDeadSound.src="sounds/enemydead.mp3";
var shootingSound= new Audio();
shootingSound.src="sounds/shoot.mp3";

//effect img
var slowed= new Image();
slowed.src="images/effect/slowed.png";
var burned = new Image();
burned.src="images/effect/burn.png";
var toxiceffect = new Image();
toxiceffect.src="images/effect/toxic.png";
// position where the frame will be draw
var character = new Image();
character.src = link;
var bg= new Image();
bg.src="images/map1.jpg";
var land = new Image();
land.src="images/land.jpg";
var bullet = new Image();
bullet.src=linkbullet;
bulletHeight=bullet.height;

var sheetWidth = 699;
var sheetHeight = 105;
var sheetFlyEnemyWidth = 400;
var sheetFlyEnemyHeight = 81;


var frameCount = 7;
var frameCol = 1;
var frameCountFlyEnemy=4;
var frameColFlyEnemy=1;


var width = sheetWidth / frameCount;
var height = sheetHeight / frameCol;
var flyEnemyWidth=sheetFlyEnemyWidth/frameCountFlyEnemy;
var flyEnemyHeight=sheetFlyEnemyHeight/frameColFlyEnemy;

var x = 0;
var y = (canvas.height-height)/2;

var srcX;
var srcY=0;
var flyEnemysrcX;
var flyEnemysrcY=0;

var currentFrame = 0;
var flyEnemyCurrentFrame=0;
var prex,prey;

var bulletShow = [];
var enemy= [];
enemy[0]={
    link:"images/flyenemy.png",
    hp:100,
    x:canvas.width-flyEnemyWidth,
    y:Math.floor(Math.random() * (canvas.height-flyEnemyHeight*2)),
    height:flyEnemyHeight,
    width:flyEnemyWidth,
    slow:false,
    burn:false,
    toxic:false,
    stackCC:0
};
document.addEventListener("keyup",fire);
function fire(event){
    if(event.keyCode==32|| event.keyCode==0){
        bulletShow.push({
           xBullet:x+width,
            yBullet:y+20
        });
    //shootingSound.play();
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
    flyEnemyCurrentFrame=flyEnemyCurrentFrame+1;
    flyEnemyCurrentFrame=flyEnemyCurrentFrame%frameCountFlyEnemy;
    
    //ctx.clearRect(x,y,width,height);
    srcX = currentFrame * width;
    srcY =0;
    flyEnemysrcX=flyEnemyCurrentFrame*flyEnemyWidth;
    flyEnemysrcY=0;
}

function drawImage() {
    updateFrame();
    ctx.drawImage(bg,0,0);
    ctx.drawImage(land,0,canvas.height-70);
    for(var i =0 ; i<bulletShow.length;i++){
        for(var k =0;k<enemy.length;k++){
            if(linkbullet=="images/lazer.png"){
                ctx.drawImage(bullet,bulletShow[i].xBullet,bulletShow[i].yBullet,canvas.width,bullet.height);
                   if(bulletShow[i].yBullet>=enemy[k].y && bulletShow[i].yBullet<=enemy[k].y+enemy[k].height && x<= enemy[k].x){
                        enemy[k].hp-=10;
                   }
               }
            else{
                if( (bulletShow[i].xBullet>=enemy[k].x)&&(bulletShow[i].xBullet<=enemy[k].x+width) && (bulletShow[i].yBullet>=enemy[k].y && bulletShow[i].yBullet<=enemy[k].y+enemy[k].height) && x<= enemy[k].x ){
                if(linkbullet=="images/wind2.png"){ // gió
                    enemy[k].hp-=10;
                    enemy[k].x+=20;
                     bulletShow.splice(i,1);
                }
                else if(linkbullet=="images/bluefire.png"){ // băng
                    enemy[k].slow=true;
                    enemy[k].hp-=10;
                    enemy[k].stackCC=50;
                    bulletShow.splice(i,1);
                }
                else if(linkbullet=="images/fire.png"){ // hỏa
                    bulletShow.splice(i,1);
                    enemy[k].burn=true;
                    enemy[k].hp-=7;
                    enemy[k].stackCC=15;
                }
                else if(linkbullet=="images/doc.PNG"){
                    bulletShow.splice(i,1);
                    enemy[k].toxic=true;
                    enemy[k].hp-=6*enemy[k].stackCC;
                    enemy[k].stackCC+=1;
                    }
//                else{
//                     enemy[k].hp-=10;
//                     bulletShow.splice(i,1);
//                }
               }
           else{
                ctx.drawImage(bullet,bulletShow[i].xBullet,bulletShow[i].yBullet);
                bulletShow[i].xBullet+=10;
           }
            }
        }
        if(enemy.length==0){
             if(linkbullet=="images/lazer.png"){
                ctx.drawImage(bullet,bulletShow[i].xBullet,bulletShow[i].yBullet,canvas.width,bullet.height);
             }
            else{
                ctx.drawImage(bullet,bulletShow[i].xBullet,bulletShow[i].yBullet);
                bulletShow[i].xBullet+=10;
            }
        }
        if(linkbullet=="images/lazer.png"){
            bulletShow.splice(i,1);
        }
    }
    for(var i =0;i<enemy.length;i++){
        
       if(enemy[i].hp>0){
           var enemyShow = new Image();
           enemyShow.src=enemy[i].link;
           ctx.drawImage(enemyShow,flyEnemysrcX,flyEnemysrcY,flyEnemyWidth,flyEnemyHeight,enemy[i].x,enemy[i].y,flyEnemyWidth,flyEnemyHeight);                    
            ctx.fillStyle="red";               
            ctx.fillRect(enemy[i].x,enemy[i].y+flyEnemyHeight,enemy[i].hp,10);
           if(enemy[i].slow==true && enemy[i].stackCC>=0){
               enemy[i].x-=1;
                ctx.drawImage(slowed,(enemy[i].x+enemy[i].width/2-3),enemy[i].y-30);
               enemy[i].stackCC-=0.5;
               
           }        
           else{
               enemy[i].x-=3;
           }
           if(enemy[i].burn==true && enemy[i].stackCC>=0){
            ctx.drawImage(burned,(enemy[i].x+enemy[i].width/2-3),enemy[i].y-30);
              enemy[i].hp-=1.5;
               enemy[i].stackCC-=1;
            }
           if(enemy[i].toxic==true && enemy[i].stackCC>=0){
            ctx.drawImage(toxiceffect,(enemy[i].x-30+enemy[i].width/2-3),enemy[i].y-30);
            ctx.fillText("x"+enemy[i].stackCC,(enemy[i].x+enemy[i].width/2-3),enemy[i].y-12);
            }
       }
        else{
            score+=1;
            enemyDeadSound.play();
            enemy.splice(i,1);
        }
        if(enemy[i].x<=0){
            enemy.splice(i,1);
        }
    }
     //ctx.clearRect(prex,prey,width,height);
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
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("SCORE: "+score,40,canvas.height-10);
    //requestAnimationFrame(drawImage);
}
//// sleep;
setInterval(drawImage,70);
function addEnemy(){
    var flag =  Math.floor(Math.random()*2);
    enemy.push({
        link:flag==1?"images/walkenemy.png":"images/flyenemy.png",
        hp:100,
        x:canvas.width-flyEnemyWidth,
        height:flyEnemyHeight,
        width:flyEnemyWidth,
        y:flag==1 ?canvas.height-height:Math.floor(Math.random() * (canvas.height-flyEnemyHeight*2)),
        slow:false,
        burn:false,
        toxic:false,
        stackCC:0
        
    });
}
setInterval(addEnemy,5000);