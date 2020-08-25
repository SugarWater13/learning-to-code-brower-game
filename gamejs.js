import "./map"
import "./animation"
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var margin = 10;
//set canvas size to window size minus margin
context.canvas.width  = window.innerWidth-margin;
context.canvas.height = window.innerHeight-margin;
//scale character to window
var characterWidth = window.innerWidth/20;
var characterHeight = window.innerWidth*3/40;
//starting possion and movement
var jumpHeight = 20;
let moveRight = false;
let moveLeft = false;
let jumpNow = false;
let onGround = false;
const fast = 5;
const grav = 1;
var startX = context.canvas.width/4 + margin/2 - characterWidth/2;
var speedX = 0;
var stopX = [];
var startY = margin+context.canvas.height/4 - characterHeight;
var speedY = 0;
var stopY = [];


var render = function() {

    //if move imput detected change speed
    if(moveRight) {
        speedX = fast;
    }
    if(moveLeft) {
        speedX = -fast;
    }   
    
    //define stopX
    stopX = startX+speedX

    //if character hits the walls stop speed
    if(stopX+characterWidth > context.canvas.width){
        speedX = 0;
        startX = context.canvas.width-characterWidth
    } else if(stopX < margin){
        speedX = 0;
        startX = margin;
    } else {
        //move character equal to speed
        startX =  stopX
    }

    
    if(jumpNow && onGround) {
        onGround = false;
        speedY -= jumpHeight
    }
    jumpNow = false;
    
    //add gravity to speedY while not on ground
    if(onGround) {
        speedY = 0;
    } else{
        speedY += grav;
    }
    
    //define stopY
    stopY = startY + speedY
    
    //stop character at floor or move down
    if(stopY+characterHeight >= margin+context.canvas.height/2) {
        startY = margin+context.canvas.height/2-characterHeight;
        speedY = 0;
        onGround = true;
    } else {
        startY = stopY
        onGround = false;
    }
    
    
    drawMap(context, margin, context.canvas.width, context.canvas.height, startX, startY, characterWidth, characterHeight, speedY, onGround)
    // console.log(speedY)
    // console.log(startY)
    // console.log(onGround)

    //draw character
    drawSprite(speedX, context, startX, startY, characterWidth, characterHeight, speedY);

    // //fix margin overlap
    drawRect(context, '#FFFFFF', -margin, -margin, margin, context.canvas.height)
    drawRect(context, '#FFFFFF', -margin, -margin, context.canvas.width, margin)
    
    speedX = 0;
    debugger
    requestAnimationFrame(render);
}

    window.addEventListener('keydown', function(event) {
        if(event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowLeft":
                moveLeft = true;
                break;
            case "ArrowRight":
                moveRight = true;
                break;
            case "ArrowUp":
                jumpNow = true;
            default:
                return;
        }
        event.preventDefault();
    }, true);
    window.addEventListener('keyup', function(event) {
        if(event.defaultPrevented) {
            return;
        }
        switch (event.key) {
            case "ArrowLeft":
                moveLeft = false;
                break;
            case "ArrowRight":
                moveRight = false;
                break;
            default:
                return;
        }
        event.preventDefault();
    }, true);
requestAnimationFrame(render);