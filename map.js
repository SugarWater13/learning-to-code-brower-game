window.drawRect = function drawRect(context, margin, color, x, y, width, height) {
    context.fillStyle = color
    context.fillRect(x + margin, y + margin, width, height);
}

function Plat(context, margin, color, x, y, width, height) {
    this.context = context;
    this.margin = margin;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

export const level={}

window.drawMap = function drawMap(context, margin, width, height) {

    //draw background
    drawRect(context, margin, "#a6a6a6", 0, 0, width, height);

    //platform width defined by characterWith*n as to adjust with screen size
    var platWidth = width / 20

    //draw floor
    //drawRect(context, margin, "#00670c", 0, height/2, width, height);

    //delete me
    //drawRect(context, margin,'#000000', width*19/20-platWidth, 250, platWidth*2, 10)

    //define platforms
    const plat0 = new Plat(context, margin, "#00670c", 0, height * 19 / 20, width, height)
    const plat1 = new Plat(context, margin, '#000000', width * 18 / 20 - platWidth, height * 13 / 20, platWidth * 2, 10);
    const plat2 = new Plat(context, margin, '#FFFFFF', width * 15 / 20 - platWidth, height * 16 / 20, platWidth * 3, 10);

    // //define map
    var levelMap = [plat0, plat1, plat2]
    level.levelMap=levelMap

    // //draw map
    for (var i = 0; i < levelMap.length; i++) {
        drawRect(levelMap[i].context, levelMap[i].margin, levelMap[i].color, levelMap[i].x, levelMap[i].y, levelMap[i].width, levelMap[i].height)
    }


}