import "./animation"

window.drawRect = function drawRect(context, margin, color, x, y, width, height) {
    context.fillStyle = color
    context.fillRect(x+margin, y+margin, width, height);
}

window.platform = function platform(context, margin, color, x, y, width, height, startX, startY, stopY, characterWidth, characterHeight, speedY, onGround) {
    drawRect(context, margin, color, x, y, width, height)
    if(startX+characterWidth >= margin+x && startX <= margin+x+width) {
        if(startY+characterHeight < margin+y && stopY+characterHeight > margin+y) {  
            stopY =  margin+y-characterHeight;
            speedY = 0;
            onGround = true;
        }    
    }    
}    




window.drawMap = function drawMap(context, margin, width, height, startX, stopX, startY, stopY, characterWidth, characterHeight, speedY, onGround) {

    //draw background
    drawRect(context, margin, "#a6a6a6", 0, 0, width, height)
    
    //platform width defined by characterWith*n as to adjust with screen size
    var platWidth = characterWidth
    
    //draw floor
    platform(context, margin, "#00670c", 0, height/2, width, height, startX, startY, stopY, characterWidth, characterHeight, speedY, onGround)

    //draw platform, platform X given in width*n/20 where n is 1-20 to allow for screen adjust
    platform(context, margin,'#000000',  width*19/20-platWidth, 250, platWidth*2, 10, startX, startY, stopY, characterWidth, characterHeight, speedY, onGround)
    platform(context, margin,'#FFFFFF',  width*17/20-platWidth, 400, platWidth*3, 10, startX, startY, stopY, characterWidth, characterHeight, speedY, onGround)
    
}