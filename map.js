window.drawRect = function drawRect(context, color, x, y, width, height) {
    context.fillStyle = color
    context.fillRect(x, y, width, height);
}

function Entity(color, x, y, width, height) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}

window.loadMap = function (width, height, requestURL) {
    return fetch(requestURL)
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
            data.sky.forEach((one) => {
                var sky = new Entity(one.color, 0, 0, width, height)
                level.sky.push(sky)
            })
            var spawn = new Coordinates((data.spawn.x * width), (data.spawn.y * height))
            level.spawn = spawn
            return level
        })
}

window.drawMap = function drawMap(context) {

    //draw background
    level.sky.forEach((one) => {
        drawRect(context, one.color, one.x, one.y, one.width, one.height);
    })
    level.levelMap.forEach((one) => {
        drawRect(context, one.color, one.x, one.y, one.width, one.height)
    })
    level.coinMap.forEach((one) => {
        drawRect(context, one.color, one.x, one.y, one.width, one.height)
    })
}



export const level = {
    levelMap: [],
    coinMap: [],
    sky: [],
    spawn: { x: 0, y: 0 }
}