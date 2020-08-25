const spriteSheet = document.getElementById('characterSprites');
const spriteSheetContinentsRunX = [230, 320, 410, 500, 590, 680];
const spriteSheetContinentsidleX = [230, 320, 410, 500];
const spriteSheetContinentsY = [35, 125, 385];
var animationMatrix = [];
var cycle = 0;
var characterStep = 0;
var groundState = 0;


function spriteLookLeft(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, context) {
    context.translate(dx+dWidth, dy)
    context.scale(-1,1);
    context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
    context.setTransform(1,0,0,1,0,0);
}

window.drawSprite = function drawSprite (speedX, context, startX, startY, characterWidth, characterHeight, speedY) {
    //every render generates a cycle and cycle move through srpitesheet matricies at an ajusting rate.
    if(cycle >= 32/animationMatrix.length) {
        characterStep ++;
        cycle = 0
    }
    //character setps from 0-(matrix length-1) then reset
    if(characterStep >= animationMatrix.length) {
        characterStep = 0
    }
    //change character matrix based on speed polarity
    if(speedY == 0) {
        if(speedX < 0){
                characterImageY = spriteSheetContinentsY[1];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[characterStep];
                spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
        } else if(speedX > 0) {
                characterImageY = spriteSheetContinentsY[1];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[characterStep];
                context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
        } else {
                var characrterImageX = spriteSheetContinentsidleX[characterStep];
                characterImageY = spriteSheetContinentsY[0];
                animationMatrix = spriteSheetContinentsidleX
                context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
            }
        }
    if(speedY < 0) {
        if (speedX < 0){
                characterImageY = spriteSheetContinentsY[2];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[2];
                spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
        } else {
                characterImageY = spriteSheetContinentsY[2];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[2];
                context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
            }
        }
    if(speedY > 0) {
        if (speedX < 0){
                characterImageY = spriteSheetContinentsY[2];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[4];
                spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
        } else {
                characterImageY = spriteSheetContinentsY[2];
                animationMatrix = spriteSheetContinentsRunX
                var characrterImageX = spriteSheetContinentsRunX[4];
                context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
        }
    
    }
    cycle ++;
}