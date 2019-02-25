/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/Vector */ \"./src/lib/Vector.js\");\n/* harmony import */ var _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib_Vector__WEBPACK_IMPORTED_MODULE_0__);\n\n/**\r\n * requestAnimationFrame\r\n */\n\nwindow.requestAnimationFrame = function () {\n  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {\n    // 60 fps\n    window.setTimeout(callback, 1000 / 60);\n  };\n}(); // 角度換算弧度\n\n\nfunction angleToRadian(angle) {\n  return angle * Math.PI / 180;\n} // 弧度換算角度\n\n\nfunction radianToAngle(radian) {\n  return radian * 180 / Math.PI;\n}\n\nwindow.onload = function () {\n  var canvas = document.getElementById('canvas'),\n      bufferCvs = document.createElement('canvas'),\n      time = document.getElementById('time'),\n      BACKGROUND_COLOR = 'darkgreen';\n  var ctx, bufferCtx, screenWidth, screenHeight, grad, center; // 固定save, beginPath, restore\n\n  function draw(ctx, f) {\n    ctx.save();\n    ctx.beginPath();\n    f(ctx);\n    ctx.restore();\n  }\n\n  var drawLine = function drawLine(ctx, pointA, pointB, style) {\n    style = style || {};\n    draw(ctx, function (ctx) {\n      ctx.strokeStyle = style.color || 'rgba(255,255,255, .1)';\n      if (style.lineDash) //[5, 15]\n        ctx.setLineDash(style.lineDash);\n      ctx.lineWidth = style.lineWidth || 1;\n      ctx.moveTo(pointA.x, pointA.y);\n      ctx.lineTo(pointB.x, pointB.y);\n      ctx.stroke();\n    });\n  };\n\n  var fillCanvas = function fillCanvas(ctx, color) {\n    draw(ctx, function (ctx) {\n      ctx.fillStyle = color;\n      ctx.fillRect(-center.x, -center.y, screenWidth, screenHeight);\n    });\n  };\n\n  var resetBase = function resetBase() {\n    ctx.restore(); // 設定基底\n\n    fillCanvas(ctx, BACKGROUND_COLOR);\n    fillCanvas(ctx, grad); // 瞄準線\n\n    drawLine(ctx, {\n      x: -center.x,\n      y: 0\n    }, {\n      x: center.x * 2,\n      y: 0\n    });\n    drawLine(ctx, {\n      x: 0,\n      y: -center.y\n    }, {\n      x: 0,\n      y: center.y * 2\n    });\n    clear(bufferCtx); // 刻度\n\n    draw(bufferCtx, function (ctx) {\n      ctx.strokeStyle = ctx.fillStyle = '#fff';\n      ctx.font = \"15px Arial\";\n\n      for (var count = 60, i = 0, r = 250; i < count; i++) {\n        var deg = angleToRadian(i * (360 / count));\n        var scale = .01 + (i % 5 == 0 ? .01 : 0) + (i % 15 == 0 ? .02 : 0),\n            basePoint = _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default()(r * Math.cos(deg), r * Math.sin(deg));\n        drawLine(ctx, basePoint, _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default.a.scale(basePoint, 1 + scale));\n        ctx.stroke(); // 每九十度顯示數字\n\n        if (radianToAngle(deg) % 90 == 0) {\n          var font = _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default.a.scale(basePoint, 1 - scale * 1.5);\n          ctx.fillText(\"\".concat(radianToAngle(deg) * 1 / 30 + 3), font.x - 15 / 2, font.y + 15 / 2);\n        }\n      }\n    });\n    ctx.drawImage(bufferCvs, -center.x, -center.y);\n  };\n\n  function resize(e) {\n    screenWidth = canvas.width = window.innerWidth;\n    screenHeight = canvas.height = window.innerHeight;\n    bufferCvs.width = screenWidth;\n    bufferCvs.height = screenHeight;\n    ctx = canvas.getContext('2d');\n    bufferCtx = bufferCvs.getContext('2d');\n    center = _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default()(screenWidth * 0.5, screenHeight * 0.5); // 方便畫圖 -> 之後(0,0)為中心點\n\n    ctx.translate(center.x, center.y);\n    bufferCtx.translate(center.x, center.y);\n    grad = ctx.createRadialGradient(0, 0, 0, 0, 0, center.length);\n    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');\n    grad.addColorStop(1, 'rgba(0, 0, 0, .35)'); // resetBase();\n  }\n\n  function clear(ctx) {\n    ctx.clearRect(-center.x, -center.y, canvas.width, canvas.height);\n  }\n\n  window.addEventListener('resize', resize, false);\n  resize(null);\n\n  var loop = function loop(t) {\n    resetBase(); // 取得時間\n\n    var now = new Date(),\n        //now\n    then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),\n        //midnight\n    diffInMil = now.getTime() - then.getTime(),\n        // difference in milliseconds\n    h = diffInMil / (1000 * 60 * 60),\n        //hours\n    m = h * 60,\n        //minutes\n    s = m * 60; //seconds\n    // 畫出波動狀圓形內圍\n\n    draw(ctx, function (ctx) {\n      for (var count = 360, i = 0, r = 200; i <= count; i++) {\n        //Math.cos -> 波動型狀 -> 要是2PI的倍數(一個週期)否則週期不完整\n        var nowR = r + 3 * Math.sin(2 * Math.PI * (t * i) * .001);\n        var deg = angleToRadian(i * (360 / count));\n        ctx.lineTo(nowR * Math.cos(deg), nowR * Math.sin(deg));\n      }\n\n      ctx.strokeStyle = '#fff';\n      ctx.stroke();\n    }); // 畫出波動狀圓形外圍\n\n    draw(ctx, function (ctx) {\n      for (var count = 360, i = 0, r = 350; i <= count; i++) {\n        //Math.cos -> 波動型狀 -> 要是2PI的倍數(一個週期)否則週期不完整\n        var nowR = r + 4 * Math.cos(2 * Math.PI * (i / 10 + t / 100));\n        var deg = angleToRadian(i * (360 / count));\n        ctx.lineTo(nowR * Math.cos(deg), nowR * Math.sin(deg));\n      }\n\n      ctx.strokeStyle = '#fff';\n      ctx.stroke();\n    }); // 秒針\n\n    var sDeg = angleToRadian(-90 + s * 6),\n        sR = 280;\n    drawLine(ctx, _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default()(0, 0), {\n      x: sR * Math.cos(sDeg),\n      y: sR * Math.sin(sDeg)\n    }, {\n      color: '#fff'\n    }); // 分針\n\n    var mDeg = angleToRadian(-90 + m * 6),\n        mR = 150;\n    drawLine(ctx, _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default()(0, 0), {\n      x: mR * Math.cos(mDeg),\n      y: mR * Math.sin(mDeg)\n    }, {\n      color: '#fff',\n      lineWidth: 2\n    }); // 時針\n\n    var hDeg = angleToRadian(-90 + h * 30),\n        hR = 100;\n    drawLine(ctx, _lib_Vector__WEBPACK_IMPORTED_MODULE_0___default()(0, 0), {\n      x: hR * Math.cos(hDeg),\n      y: hR * Math.sin(hDeg)\n    }, {\n      color: '#fff',\n      lineWidth: 4\n    });\n    time.innerText = \"+00:\".concat(now.getHours(), \":\").concat(now.getMinutes(), \":\").concat(now.getSeconds()); // ctx.drawImage(bufferCvs, -center.x, -center.y);\n\n    window.requestAnimationFrame(loop);\n  };\n\n  loop();\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/lib/Vector.js":
/*!***************************!*\
  !*** ./src/lib/Vector.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\n/**\r\n * Vector 向量\r\n */\n;\n\n(function (global, factory) {\n  // For CommonJS and CommonJS-like environments where a proper window is present,\n  // execute the factory \n  if (( false ? undefined : _typeof(module)) === \"object\" && _typeof(module.exports) === \"object\") {\n    module.exports = factory(global, true);\n  } else {\n    factory(global);\n  } // Pass this if window is not defined yet\n\n})(typeof window !== \"undefined\" ? window : this, function (global, noGlobal) {\n  var Vector = function Vector(x, y) {\n    return new Vector.init(x, y);\n  };\n\n  Vector.prototype = {\n    set: function set(x, y) {\n      if (_typeof(x) === 'object') {\n        y = x.y;\n        x = x.x;\n      }\n\n      this.x = x || 0;\n      this.y = y || 0;\n      return this;\n    },\n    add: function add(v) {\n      this.x += v.x;\n      this.y += v.y;\n      return this;\n    },\n    sub: function sub(v) {\n      this.x -= v.x;\n      this.y -= v.y;\n      return this;\n    },\n    scale: function scale(s) {\n      this.x *= s;\n      this.y *= s;\n      return this;\n    },\n\n    get length() {\n      return Math.sqrt(this.x * this.x + this.y * this.y);\n    },\n\n    get lengthSq() {\n      return this.x * this.x + this.y * this.y;\n    },\n\n    // 單位向量(正規化向量)\n    normalize: function normalize() {\n      var m = this.length; //Math.sqrt(this.x * this.x + this.y * this.y);\n\n      if (m) {\n        this.x /= m;\n        this.y /= m;\n      }\n\n      return this;\n    },\n    angle: function angle() {\n      return Math.atan2(this.y, this.x);\n    },\n    angleTo: function angleTo(v) {\n      var dx = v.x - this.x,\n          dy = v.y - this.y;\n      return Math.atan2(dy, dx);\n    },\n    // angle: function() {\n    //     return Math.atan(this.y / this.x);\n    // },\n    // angleTo: function(v) {\n    //     var dx = v.x - this.x,\n    //         dy = v.y - this.y;\n    //     return Math.atan(dy / dx);\n    // },\n    distanceTo: function distanceTo(v) {\n      var dx = v.x - this.x,\n          dy = v.y - this.y;\n      return Math.sqrt(dx * dx + dy * dy);\n    },\n    distanceToSq: function distanceToSq(v) {\n      var dx = v.x - this.x,\n          dy = v.y - this.y;\n      return dx * dx + dy * dy;\n    },\n    // for x1, y1 To x2, y2 spend t time\n    lerp: function lerp(v, t) {\n      this.x += (v.x - this.x) * t;\n      this.y += (v.y - this.y) * t;\n      return this;\n    },\n    clone: function clone() {\n      return Vector(this.x, this.y);\n    },\n    toString: function toString() {\n      return '(x:' + this.x + ', y:' + this.y + ')';\n    }\n  };\n\n  Vector.init = function (x, y) {\n    var self = this;\n    self.x = x;\n    self.y = y;\n  };\n\n  Vector.add = function (a, b) {\n    return Vector(a.x + b.x, a.y + b.y);\n  };\n\n  Vector.sub = function (a, b) {\n    return Vector(a.x - b.x, a.y - b.y);\n  };\n\n  Vector.scale = function (v, s) {\n    return v.clone().scale(s);\n  };\n\n  Vector.random = function () {\n    return Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);\n  };\n\n  Vector.init.prototype = Vector.prototype;\n\n  if (!noGlobal) {\n    global.Vector = global.$V = Vector;\n  } else return Vector;\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/lib/Vector.js?");

/***/ })

/******/ });