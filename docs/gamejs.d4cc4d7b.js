// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"map.js":[function(require,module,exports) {
window.drawRect = function drawRect(context, margin, color, x, y, width, height) {
  context.fillStyle = color;
  context.fillRect(x + margin, y + margin, width, height);
};

function Plat(context, margin, color, x, y, width, height) {
  this.context = context;
  this.margin = margin;
  this.color = color;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

window.drawMap = function drawMap(context, margin, width, height) {
  //draw background
  drawRect(context, margin, "#a6a6a6", 0, 0, width, height); //platform width defined by characterWith*n as to adjust with screen size

  var platWidth = width / 20; //draw floor

  drawRect(context, margin, "#00670c", 0, height / 2, width, height); //delete me

  drawRect(context, margin, '#000000', width * 19 / 20 - platWidth, 250, platWidth * 2, 10); //define platforms

  var plat1 = new Plat(context, margin, '#000000', width * 19 / 20 - platWidth, 250, platWidth * 2, 10);
  var plat2 = new Plat(context, margin, '#FFFFFF', width * 17 / 20 - platWidth, 400, platWidth * 3, 10); //define map

  var levelMap = [plat1, plat2]; //draw map

  for (var i = 0; i < levelMap.length; i++) {
    drawRect(levelMap[i].context, levelMap[i].margin, levelMap[i].color, levelMap[i].x, levelMap[i].y, levelMap[i].width, levelMap[i].hight);
  }
};
},{}],"animation.js":[function(require,module,exports) {
var spriteSheet = document.getElementById('characterSprites');
var spriteSheetContinentsRunX = [230, 320, 410, 500, 590, 680];
var spriteSheetContinentsidleX = [230, 320, 410, 500];
var spriteSheetContinentsY = [35, 125, 385];
var animationMatrix = [];
var cycle = 0;
var characterStep = 0;
var groundState = 0;

function spriteLookLeft(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, context) {
  context.translate(dx + dWidth, dy);
  context.scale(-1, 1);
  context.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);
  context.setTransform(1, 0, 0, 1, 0, 0);
}

window.drawSprite = function drawSprite(speedX, context, startX, startY, characterWidth, characterHeight, speedY) {
  //every render generates a cycle and cycle move through srpitesheet matricies at an ajusting rate.
  if (cycle >= 32 / animationMatrix.length) {
    characterStep++;
    cycle = 0;
  } //character setps from 0-(matrix length-1) then reset


  if (characterStep >= animationMatrix.length) {
    characterStep = 0;
  } //change character matrix based on speed polarity


  if (speedY == 0) {
    if (speedX < 0) {
      characterImageY = spriteSheetContinentsY[1];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[characterStep];
      spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
    } else if (speedX > 0) {
      characterImageY = spriteSheetContinentsY[1];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[characterStep];
      context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
    } else {
      var characrterImageX = spriteSheetContinentsidleX[characterStep];
      characterImageY = spriteSheetContinentsY[0];
      animationMatrix = spriteSheetContinentsidleX;
      context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
    }
  }

  if (speedY < 0) {
    if (speedX < 0) {
      characterImageY = spriteSheetContinentsY[2];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[2];
      spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
    } else {
      characterImageY = spriteSheetContinentsY[2];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[2];
      context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
    }
  }

  if (speedY > 0) {
    if (speedX < 0) {
      characterImageY = spriteSheetContinentsY[2];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[4];
      spriteLookLeft(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight, context);
    } else {
      characterImageY = spriteSheetContinentsY[2];
      animationMatrix = spriteSheetContinentsRunX;
      var characrterImageX = spriteSheetContinentsRunX[4];
      context.drawImage(spriteSheet, characrterImageX, characterImageY, 80, 70, startX, startY, characterWidth, characterHeight);
    }
  }

  cycle++;
};
},{}],"gamejs.js":[function(require,module,exports) {
"use strict";

require("./map");

var _map2 = require("./map.js");

require("./animation");

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var margin = 10; //set canvas size to window size minus margin

context.canvas.width = window.innerWidth - margin;
context.canvas.height = window.innerHeight - margin; //scale character to window

var characterWidth = window.innerWidth / 20;
var characterHeight = window.innerWidth * 3 / 40; //starting possion and movement

var jumpHeight = 20;
var moveRight = false;
var moveLeft = false;
var jumpNow = false;
var onGround = false;
var fast = 5;
var grav = 1;
var startX = context.canvas.width / 4 + margin / 2 - characterWidth / 2;
var speedX = 0;
var stopX = [];
var startY = margin + context.canvas.height / 4 - characterHeight;
var speedY = 0;
var stopY = [];

var render = function render() {
  //if move imput detected change speed
  if (moveRight) {
    speedX = fast;
  }

  if (moveLeft) {
    speedX = -fast;
  } //define stopX


  stopX = startX + speedX; //if character hits the walls stop speed

  if (stopX + characterWidth > context.canvas.width) {
    speedX = 0;
    startX = context.canvas.width - characterWidth;
  } else if (stopX < margin) {
    speedX = 0;
    startX = margin;
  } else {
    //move character equal to speed
    startX = stopX;
  }

  if (jumpNow && onGround) {
    onGround = false;
    speedY -= jumpHeight;
  }

  jumpNow = false; //add gravity to speedY while not on ground

  if (onGround) {
    speedY = 0;
  } else {
    speedY += grav;
  } //define stopY


  stopY = startY + speedY; //stop character at floor or move down

  if (stopY + characterHeight >= margin + context.canvas.height / 2) {
    startY = margin + context.canvas.height / 2 - characterHeight;
    speedY = 0;
    onGround = true;
  } else {
    startY = stopY;
    onGround = false;
  }

  drawMap(context, margin, context.canvas.width, context.canvas.height, startX, stopX, startY, stopY, characterWidth, characterHeight, speedY, onGround);

  for (var i = 0; i < length.levelMap; i++) {
    if (startX + characterWidth >= margin + _map2.levelMap[i].x && startX <= margin + _map2.levelMap[i].x + _map2.levelMap[i].width) {
      if (startY + characterHeight < margin + _map2.levelMap[i].y && stopY + characterHeight > margin + _map2.levelMap[i].y) {
        stopY = margin + _map2.levelMap[i].y - characterHeight;
        speedY = 0;
        onGround = true;
      }
    }
  } //draw character


  drawSprite(speedX, context, startX, startY, characterWidth, characterHeight, speedY); // //fix margin overlap

  drawRect(context, '#FFFFFF', -margin, -margin, margin, context.canvas.height);
  drawRect(context, '#FFFFFF', -margin, -margin, context.canvas.width, margin);
  speedX = 0;
  debugger;
  requestAnimationFrame(render);
};

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
},{"./map":"map.js","./map.js":"map.js","./animation":"animation.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53115" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gamejs.js"], null)
//# sourceMappingURL=/gamejs.d4cc4d7b.js.map