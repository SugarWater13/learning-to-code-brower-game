import "./map.js"
import { level } from './map.js'
import "./animation.js"
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var margin = 10;
//set canvas size to window size minus margin
context.canvas.width = window.innerWidth - margin;
context.canvas.height = window.innerHeight - margin;
//scale character to window
var characterWidth = window.innerWidth / 20;
var characterHeight = window.innerWidth * 3 / 40;
//starting possion and movement
var jumpHeight = 20;
let moveRight = false;
let moveLeft = false;
let jumpNow = false;
let onGround = false;
var standingOn = 0;
const fast = 5;
const grav = 1;
var startX = context.canvas.width / 4 + margin / 2 - characterWidth / 2;
var speedX = 0;
var stopX = [];
var startY = margin + context.canvas.height / 4 - characterHeight;
var speedY = 0;
var stopY = [];

loadMap(context.canvas.width, context.canvas.height, './level1.JSON')

var render = function () {

    //if move imput detected change speed
    if (moveRight) {
        speedX = fast;
    }
    if (moveLeft) {
        speedX = -fast;
    }

    //define stopX
    stopX = startX + speedX

    //if character hits the walls stop speed
    if (stopX + characterWidth > context.canvas.width) {
        speedX = 0;
        startX = context.canvas.width - characterWidth
    } else if (stopX < margin) {
        speedX = 0;
        startX = margin;
    } else {
        //move character equal to speed
        startX = stopX
    }


    if (jumpNow && onGround) {
        onGround = false;
        speedY -= jumpHeight
    }
    jumpNow = false;

    //add gravity to speedY while not on ground

    if (!onGround) {
        speedY += grav;
    }

    //define stopY
    stopY = startY + speedY

    //function defined in "map.js" sets floor
    drawMap(context, margin, context.canvas.width, context.canvas.height, startX, stopX, startY, stopY, characterWidth, characterHeight, speedY, onGround)

    //creatue matrix from imported function
    const levelMap = level.levelMap
    const coinMap = level.coinMap
    //debugger

    //check each platform objust in the matrix
    for (var i = 0; i < levelMap.length; i++) {
        if (
            //right side of character passes left side of platform
            startX + characterWidth >= levelMap[i].x + margin
            //left side of character does not pass right side of platform
            && startX <= levelMap[i].x + levelMap[i].width + margin
            //character is above platform at the beginning of the frame
            && startY + characterHeight < levelMap[i].y
            //character would be below platform at the end of the frame
            && stopY + characterHeight >= levelMap[i].y
        ) {
            stopY = levelMap[i].y + margin - characterHeight;
            onGround = true;
            speedY = 0;
            standingOn = i;
            break;
        }
    }

    if (
        levelMap.length > standingOn
        //character walks off left side of platform
        && (
            stopX + characterWidth < levelMap[standingOn].x + margin
            //character walks off right side of platform
            || stopX > levelMap[standingOn].x + levelMap[standingOn].width + margin
        )
    ) {
        onGround = false;
    }

    startY = stopY;

    for (var i = 0; i < coinMap.length; i++) {
        if (
            //right side of character passes left side of coin
            startX + characterWidth >= coinMap[i].x
            //left side of character does not pass right side of coin
            && startX <= coinMap[i].x + coinMap[i].width
            //bottum of character is below top of coin
            && startY + characterHeight >= coinMap[i].y
            //top of character is above bottom of coin
            && startY <= coinMap[i].y + coinMap[i].height
        ) {
            coinMap.splice(i);
        }
        if (coinMap.length == 0) {
            loadMap(context.canvas.width, context.canvas.height, './level2.JSON')
        }
    }
    
    //draw character
    drawSprite(speedX, context, startX, startY, characterWidth, characterHeight, speedY);

    // //fix margin overlap
    drawRect(context, '#FFFFFF', -margin, -margin, margin, context.canvas.height)
    drawRect(context, '#FFFFFF', -margin, -margin, context.canvas.width, margin)

    speedX = 0;

    // const debugText = JSON.stringify({ gotCoin })
    // context.fillText(debugText, 200, 200);


    requestAnimationFrame(render);
}

window.addEventListener('keydown', function (event) {
    if (event.defaultPrevented) {
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
window.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
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