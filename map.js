window.drawRect = function drawRect(context, margin, color, x, y, width, height) {
    context.fillStyle = color
    context.fillRect(x + margin, y + margin, width, height);
}

function Entity(color, x, y, width, height) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

window.loadMap = function (width, height, requestURL) {
    fetch(requestURL)
        .then((r) => r.json())
        .then((data) => {
            level.levelMap.length = 0
            data.platforms.forEach((one) => {
                var newPlat = new Entity(one.color, (one.x * width), (one.y * height), (one.width * width), (one.height * height))
                level.levelMap.push(newPlat)
            })
            data.coin.forEach((one) => {
                var newCoin = new Entity(one.color, (one.x * width), (one.y * height), (one.width * width), (one.height * height))
                level.coinMap.push(newCoin)
            })
        })
}

window.drawMap = function drawMap(context, margin, width, height) {

    //draw background
    drawRect(context, margin, "#a6a6a6", 0, 0, width, height);

    level.levelMap.forEach((one) => {
        drawRect(context, margin, one.color, one.x, one.y, one.width, one.height)
    })
    level.coinMap.forEach((one) => {
        drawRect(context, margin, one.color, one.x, one.y, one.width, one.height)
    })
}



export const level = {
    levelMap: [],
    coinMap: []
}