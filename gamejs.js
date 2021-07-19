import "./map.js"
import { level } from './map.js'
import "./animation.js"
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

//set canvas size to window size
context.canvas.width = window.innerWidth - 20;
context.canvas.height = window.innerHeight - 20;
//scale character to window
var characterWidth = context.canvas.width / 20;
var characterHeight = context.canvas.height * 3 / 40;
//starting possion and movement
var jumpHeight = context.canvas.height * 0.021;
let moveRight = false;
let moveLeft = false;
let jumpNow = false;
let onGround = false;
var standingOn = 0;
const fast = 5;
const grav = context.canvas.height * 0.001;
var startX = 0
var speedX = 0;
var stopX = [];
var startY = 0
var speedY = 0;
var stopY = [];
let progress = 1
let overWorld = ['./level1.JSON', './level2.JSON', './level3.JSON', './level4.JSON', './level5.JSON']
let youWin = false;

loadMap(context.canvas.width, context.canvas.height, './level1.JSON')
    .then((data) => {
        startX = data.spawn.x
        startY = (data.spawn.y - characterHeight)
    })


var render = function () {
    let nextMap = overWorld[progress]

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
        stopX = context.canvas.width - characterWidth
    } else if (stopX <= 0) {
        speedX = 0;
        stopX = 0;
    }

    if (stopY <= 0) {
        speedY = 0;
        stopY = 0;
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
    drawMap(context)

    //creatue matrix from imported function
    const levelMap = level.levelMap
    const coinMap = level.coinMap

    //check each platform objust in the matrix
    for (var i = 0; i < levelMap.length; i++) {
        if (
            //right side of character passes left side of platform
            startX + characterWidth >= levelMap[i].x
            //left side of character does not pass right side of platform
            && startX <= levelMap[i].x + levelMap[i].width
            //character is above platform at the beginning of the frame
            && startY + characterHeight < levelMap[i].y
            //character would be below platform at the end of the frame
            && stopY + characterHeight >= levelMap[i].y
        ) {
            stopY = levelMap[i].y - characterHeight;
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
            stopX + characterWidth < levelMap[standingOn].x
            //character walks off right side of platform
            || stopX > levelMap[standingOn].x + levelMap[standingOn].width
        )
    ) {
        onGround = false;
    }


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
            coinMap.splice(i, 1);
        }
        if (coinMap.length == 0) {
            if (progress < overWorld.length) {
                loadMap(context.canvas.width, context.canvas.height, nextMap)
                    .then((data) => {
                        startX = data.spawn.x
                        startY = (data.spawn.y - characterHeight)
                    })
                progress++
                speedX = 0
                speedY = 0
                onGround = false
            }
            else if (progress >= overWorld.length) {
                loadMap(context.canvas.width, context.canvas.height, './theEnd.JSON')
                youWin = true;
            }
        }
    }


    if (youWin == true) {
        context.fillText('You Win!', context.canvas.width / 2, context.canvas.height / 2);
    } else {
        context.fillText('use the arrow keys to move and jump', context.canvas.width / 2, context.canvas.height / 2);
    }

    startX = stopX
    startY = stopY;

    //draw character
    drawSprite(speedX, context, startX, startY, characterWidth, characterHeight, speedY);

    speedX = 0;

    // const debugText = JSON.stringify({ variable i want to read })
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