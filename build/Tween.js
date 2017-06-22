(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Tween"] = factory();
	else
		root["Tween"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = __webpack_require__(2);

var _Utils2 = _interopRequireDefault(_Utils);

var _cssPlugin = __webpack_require__(3);

var _cssPlugin2 = _interopRequireDefault(_cssPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）； 说明： 假设 y 从 100 - 1000, 变化量应该是900
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
 */
var TweenType = {
    Linear: function Linear(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * (--t * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function easeIn(t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function easeIn(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function easeOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOut: function easeInOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function easeIn(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function easeOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function easeIn(t, b, c, d) {
            return c - TweenType.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t < d / 2) {
                return TweenType.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return TweenType.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var Tween = function () {

    /**
     * 哪个插件支持该目标
     */
    function Tween(target, fromProps, toProps, duration, ease) {
        var _this = this;

        _classCallCheck(this, Tween);

        this._events = {
            onUpdate: null,
            onComplete: null
        };

        // 这里两者都是同时拷贝，而不改变其自身属性，因为css样式以后需要引入额外插件来支持，现阶段只能在onUpdate事件里面手动维护
        this.fromProps = _Utils2.default.clone(fromProps);
        this._fromPropsOrigin = _Utils2.default.clone(fromProps);
        this.toProps = toProps;
        this.ease = ease;
        this.duration = duration;

        this._running = false;

        Tween.plugins.forEach(function (plugin, index) {
            if (plugin.isSupport(target)) {
                _this._pluginIndex = index;
            }
        });

        if (!_Utils2.default.isUndefined(this._pluginIndex)) {
            console.info("命中了插件：" + Tween.plugins[this._pluginIndex].name);
        }
    }

    /**
     * 缓动动画执行时候的帧率，在缓动停止的时候会设置成0
     */


    /**
     * 缓动动画已经运行时间
     * 说明： 通过不断累积每一帧所花费的时间
     */


    _createClass(Tween, [{
        key: "onUpdate",
        value: function onUpdate(callback) {
            this._events.onUpdate = callback;
            return this;
        }
    }, {
        key: "onComplete",
        value: function onComplete(callback) {
            this._events.onComplete = callback;
            return this;
        }

        /**
         * 开始动画
         * 说明： stop()之后的动画会重新开始
         * @return {Tween}
         */

    }, {
        key: "start",
        value: function start() {
            this._running = true;
            this._runningTime = 0;
            this.fps = 0;

            requestAnimationFrame(this._update.bind(this));

            return this;
        }

        /**
         * 停止动画
         * @return {Tween}
         */

    }, {
        key: "stop",
        value: function stop() {
            this._running = false;
            this._startTime = null;
            this.fps = 0;
            return this;
        }

        /**
         * 上一帧的时间
         */

    }, {
        key: "_update",
        value: function _update(now) {
            var _this2 = this;

            // 初始化开始时间
            if (_Utils2.default.isUndefined(this._lastTime)) {
                this._lastTime = now;
                requestAnimationFrame(this._update.bind(this));
                return false;
            }

            this.fps = 1000 / (now - this._lastTime);

            this._runningTime += now - this._lastTime;

            if (this._runningTime >= this.duration) {
                this.stop();
                this._fixedInEnd();
                this._events.onComplete && this._events.onComplete.call(this.fromProps);
            }

            this._events.onUpdate && this._events.onUpdate.call(this.fromProps);

            // 计算需要缓动的属性和对应值
            Object.keys(this.toProps).forEach(function (prop) {

                _this2.fromProps[prop] = _this2.ease(_this2._runningTime, _this2._fromPropsOrigin[prop], _this2.toProps[prop] - _this2._fromPropsOrigin[prop], _this2.duration);
            });

            if (this._running) {
                this._lastTime = now;
                requestAnimationFrame(this._update.bind(this));
            }
        }

        /**
         * 将缓动属性对齐
         * 说明： 因为结束时间几乎不可能卡在结束的那一毫秒，所以结束后需要手动将误差对齐
         * @private
         */

    }, {
        key: "_fixedInEnd",
        value: function _fixedInEnd() {
            var _this3 = this;

            Object.keys(this.toProps).forEach(function (prop) {
                _this3.fromProps[prop] = _this3.toProps[prop];
            });
        }

        /**
         * 以对象自身属性为起点，缓动到目标属性
         * @param target 选中对象
         * @param toProps 目标属性
         * @param duration {number} 耗时。 单位毫秒
         * @param ease 缓动类型
         * @param callback {Function} 完成之后的回调
         */

    }], [{
        key: "to",
        value: function to(target, toProps, duration) {
            var ease = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Tween.Ease.Linear;
            var callback = arguments[4];


            // 构建一个fromProps，重新生成一个Tween对象
            var fromProps = {};
            for (var i in toProps) {
                if (toProps.hasOwnProperty(i)) fromProps[i] = target[i];
            }

            var tween = new Tween(target, fromProps, toProps, duration, ease);

            if (callback) {
                tween.onComplete(callback);
            }

            return tween;
        }

        /**
         * 指定对象开始属性，缓动到目标属性
         * @param target 选中对象
         * @param fromProps 开始属性
         * @param toProps 目标属性
         * @param duration {number} 耗时。 单位毫秒
         * @param ease 缓动类型
         * @param callback {Function} 完成之后的回调
         */

    }, {
        key: "fromTo",
        value: function fromTo(target, fromProps, toProps, duration) {
            var ease = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : Tween.Ease.Linear;
            var callback = arguments[5];


            var tween = new Tween(target, fromProps, toProps, duration, ease);

            if (callback) {
                tween.onComplete(callback);
            }

            return tween;
        }
    }]);

    return Tween;
}();

// 设置为静态属性


Tween.Ease = TweenType;

Tween.plugins = [_cssPlugin2.default];

var tester = {

    player: document.createElement("div"),

    init: function init() {
        this.player.className = "test-doter";
        this.player.style.position = "absolute";
        this.player.style.top = "0";
        this.player.style.left = "0";
        this.player.style.width = "30px";
        this.player.style.height = "30px";
        this.player.style.background = "red";
        this.player.style.borderRadius = "50%";
        this.player.style.zIndex = "11111";

        document.body.appendChild(this.player);
    }
};

tester.init();

window.t = Tween.to({ x: 0, y: 0 }, { x: window.innerWidth - 30, y: window.innerHeight - 30 }, 2000, Tween.Ease.Cubic.easeInOut).onUpdate(function () {
    console.log(this.x, this.y);
    tester.player.style.top = this.y + "px";
    tester.player.style.left = this.x + "px";
}).onComplete(function () {
    console.info("I'm finish");
});

exports.default = Tween;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by coffee on 02/03/2017.
 */

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "isObject",
        value: function isObject(target) {
            return (typeof target === "undefined" ? "undefined" : _typeof(target)) === "object";
        }
    }, {
        key: "isNumber",
        value: function isNumber(target) {
            return typeof target === "number";
        }
    }, {
        key: "isFunction",
        value: function isFunction(target) {
            return typeof target === "function";
        }
    }, {
        key: "isUndefined",
        value: function isUndefined(target) {
            return typeof target === "undefined";
        }
    }, {
        key: "isArray",
        value: function isArray(target) {
            return Array.isArray(target);
        }
    }, {
        key: "isNull",
        value: function isNull(target) {
            return target === null;
        }
    }, {
        key: "isLikeArray",
        value: function isLikeArray(target) {
            return Utils.isArray(target) && Utils.isNumber(target.length);
        }

        /**
         * 对数组、伪数组、对象属性列表进行遍历
         * @param target
         * @param callback
         * @return {boolean}
         */

    }, {
        key: "each",
        value: function each(target, callback) {
            if (!Utils.isFunction(callback)) return false;

            if (Utils.isArray(target) || Utils.isLikeArray(target)) {
                Array.prototype.forEach.call(target, callback);
            }
            //else if(Utils.isObject(target)){
            //
            //    let keys = Object.keys(target);
            //
            //    keys.forEach((e, i) => {
            //        callback.call(this, e, i)
            //    });
            //
            //}
        }

        /**
         * 克隆一个数组
         * 说明：这个和自带的不同，该函数会自动对列表里面的对象进行深拷贝
         * @param targetArray
         * @return {any[]}
         */

    }, {
        key: "_cloneArray",
        value: function _cloneArray(targetArray) {

            var newArray = [];

            targetArray.forEach(function (ele, index) {
                switch (typeof ele === "undefined" ? "undefined" : _typeof(ele)) {
                    case "number":
                    case "undefined":
                    case "string":
                    case "boolean":
                        newArray[index] = ele;
                        break;

                    case "object":
                        if (Utils.isNull(ele)) {
                            newArray[index] = null;
                        } else if (Utils.isArray(ele)) {
                            newArray[index] = Utils.cloneArray(ele);
                        } else {
                            newArray[index] = Utils.clone(ele);
                        }
                }
            });

            return newArray;
        }

        /**
         * 克隆一个对象或者数组
         * 说明：参数如果是number,undefined,null,string,boolean等基础类型会直接返回自身
         * @param target 任何对象或者数组
         * @return {{}}
         */

    }, {
        key: "clone",
        value: function clone(target) {

            if (Utils.isArray(target)) {
                return Utils._cloneArray(target);
            }

            var newTarget = {};

            Object.keys(target).forEach(function (prop) {

                switch (_typeof(target[prop])) {

                    case "number":
                    case "undefined":
                    case "string":
                    case "boolean":
                        newTarget[prop] = target[prop];
                        break;

                    case "object":
                        if (Utils.isNull(target[prop])) {
                            newTarget[prop] = null;
                        } else {
                            newTarget[prop] = Utils.clone(target[prop]);
                        }
                }
            });

            return Object.keys(newTarget).length > 0 ? newTarget : target;
        }
    }]);

    return Utils;
}();

exports.default = Utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * CSS元素的缓动组件
 * Created by coffee on 07/03/2017.
 *
 * 支持缓动的属性
 * - 已支持： width, height, top, left, right, bottom, margin, padding
 * - 待支持： transform, color, opacity
 */

var cssPlugin = {

    name: "cssPlugin",

    version: "0.0.1",

    /**
     * 该插件能否支持目标对象
     * @param target
     */
    isSupport: function isSupport(target) {
        return target instanceof HTMLElement;
    },


    // 支持的属性
    _supportList: ["left", "right", "top", "bottom", "width", "height", "margin", "margin-left", "margin-right", "margin-top", "margin-bottom", "padding", "padding-left", "padding-right", "padding-top", "padding-bottom"],

    // 可以合并的属性，设计到后续的解析的拆分
    _supportMergeList: ["margin", "padding"],

    _example: {
        "width": {
            value: 1.63,
            unit: "rem"
        },

        // 如果设置的是整个margin，那么转换后的键会有四个，设置的时候也需要合并回去。反之，单独运算。
        "margin": {
            "top": {
                value: 100,
                unit: "rem"
            },
            "bottom": {
                value: 100,
                unit: "px"
            }
        }

    },

    _update: function _update(htmlEleTarget) {},


    /**
     * 读取HTML元素上style属性的值，解析成可以读取的对象
     * @private
     */
    _parse: function _parse() {},


    /**
     *
     * @return {{}}
     * @private
     */
    _parseProps: function _parseProps(props) {
        var styleDict = {};

        return styleDict;
    }
};

exports.default = cssPlugin;

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGZmZmFkMTI1OGEzMDUxYTY1NDViP2UzZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL1R3ZWVuL2luZGV4LmpzPzJiNDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpYnMvVXRpbHMuanM/Y2VkNiIsIndlYnBhY2s6Ly8vLi9zcmMvVHdlZW4vcGx1Z2lucy9jc3NQbHVnaW4uanM/OGE3MiJdLCJuYW1lcyI6WyJUd2VlblR5cGUiLCJMaW5lYXIiLCJ0IiwiYiIsImMiLCJkIiwiUXVhZCIsImVhc2VJbiIsImVhc2VPdXQiLCJlYXNlSW5PdXQiLCJDdWJpYyIsIlF1YXJ0IiwiUXVpbnQiLCJTaW5lIiwiTWF0aCIsImNvcyIsIlBJIiwic2luIiwiRXhwbyIsInBvdyIsIkNpcmMiLCJzcXJ0IiwiRWxhc3RpYyIsImEiLCJwIiwicyIsImFicyIsImFzaW4iLCJCYWNrIiwiQm91bmNlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93Iiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiVHdlZW4iLCJ0YXJnZXQiLCJmcm9tUHJvcHMiLCJ0b1Byb3BzIiwiZHVyYXRpb24iLCJlYXNlIiwiX2V2ZW50cyIsIm9uVXBkYXRlIiwib25Db21wbGV0ZSIsImNsb25lIiwiX2Zyb21Qcm9wc09yaWdpbiIsIl9ydW5uaW5nIiwicGx1Z2lucyIsImZvckVhY2giLCJwbHVnaW4iLCJpbmRleCIsImlzU3VwcG9ydCIsIl9wbHVnaW5JbmRleCIsImlzVW5kZWZpbmVkIiwiY29uc29sZSIsImluZm8iLCJuYW1lIiwiY2FsbGJhY2siLCJfcnVubmluZ1RpbWUiLCJmcHMiLCJfdXBkYXRlIiwiYmluZCIsIl9zdGFydFRpbWUiLCJub3ciLCJfbGFzdFRpbWUiLCJzdG9wIiwiX2ZpeGVkSW5FbmQiLCJjYWxsIiwiT2JqZWN0Iiwia2V5cyIsInByb3AiLCJFYXNlIiwiaSIsImhhc093blByb3BlcnR5IiwidHdlZW4iLCJ0ZXN0ZXIiLCJwbGF5ZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbml0IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJwb3NpdGlvbiIsInRvcCIsImxlZnQiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJib3JkZXJSYWRpdXMiLCJ6SW5kZXgiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJ0byIsIngiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwibG9nIiwiVXRpbHMiLCJBcnJheSIsImlzQXJyYXkiLCJpc051bWJlciIsImxlbmd0aCIsImlzRnVuY3Rpb24iLCJpc0xpa2VBcnJheSIsInByb3RvdHlwZSIsInRhcmdldEFycmF5IiwibmV3QXJyYXkiLCJlbGUiLCJpc051bGwiLCJjbG9uZUFycmF5IiwiX2Nsb25lQXJyYXkiLCJuZXdUYXJnZXQiLCJjc3NQbHVnaW4iLCJ2ZXJzaW9uIiwiSFRNTEVsZW1lbnQiLCJfc3VwcG9ydExpc3QiLCJfc3VwcG9ydE1lcmdlTGlzdCIsIl9leGFtcGxlIiwidmFsdWUiLCJ1bml0IiwiaHRtbEVsZVRhcmdldCIsIl9wYXJzZSIsIl9wYXJzZVByb3BzIiwicHJvcHMiLCJzdHlsZURpY3QiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtB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RCxnQkFKakQsQ0FmQTs7QUFzQmQ7QUFDQUMsdUJBQW1CLENBQ2YsUUFEZSxFQUNMLFNBREssQ0F2Qkw7O0FBMkJkQyxjQUFVO0FBQ04saUJBQVM7QUFDTEMsbUJBQU8sSUFERjtBQUVMQyxrQkFBTTtBQUZELFNBREg7O0FBTU47QUFDQSxrQkFBVTtBQUNOLG1CQUFPO0FBQ0hELHVCQUFPLEdBREo7QUFFSEMsc0JBQU07QUFGSCxhQUREO0FBS04sc0JBQVU7QUFDTkQsdUJBQU8sR0FERDtBQUVOQyxzQkFBTTtBQUZBO0FBTEo7O0FBUEosS0EzQkk7O0FBK0NkNUQsV0EvQ2MsbUJBK0NONkQsYUEvQ00sRUErQ1EsQ0FFckIsQ0FqRGE7OztBQW1EZDs7OztBQUlBQyxVQXZEYyxvQkF1RE4sQ0FFUCxDQXpEYTs7O0FBMkRkOzs7OztBQUtBQyxlQWhFYyx1QkFnRUZDLEtBaEVFLEVBZ0VTO0FBQ25CLFlBQUlDLFlBQVksRUFBaEI7O0FBRUEsZUFBT0EsU0FBUDtBQUNIO0FBcEVhLENBQWxCOztrQkF5RWVaLFMiLCJmaWxlIjoiVHdlZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJUd2VlblwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJUd2VlblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmZmYWQxMjU4YTMwNTFhNjU0NWIiLCJpbXBvcnQgVXRpbHMgZnJvbSAgXCIuLi9saWJzL1V0aWxzXCI7XG5pbXBvcnQgY3NzUGx1Z2luIGZyb20gXCIuL3BsdWdpbnMvY3NzUGx1Z2luXCI7XG5cbi8qXG4gKiBUd2Vlbi5qc1xuICogdDogY3VycmVudCB0aW1l77yI5b2T5YmN5pe26Ze077yJ77ybXG4gKiBiOiBiZWdpbm5pbmcgdmFsdWXvvIjliJ3lp4vlgLzvvInvvJtcbiAqIGM6IGNoYW5nZSBpbiB2YWx1Ze+8iOWPmOWMlumHj++8ie+8myDor7TmmI7vvJog5YGH6K6+IHkg5LuOIDEwMCAtIDEwMDAsIOWPmOWMlumHj+W6lOivpeaYrzkwMFxuICogZDogZHVyYXRpb27vvIjmjIHnu63ml7bpl7TvvInjgIJcbiAqIHlvdSBjYW4gdmlzaXQgJ2h0dHA6Ly9lYXNpbmdzLm5ldC96aC1jbicgdG8gZ2V0IGVmZmVjdFxuICovXG5sZXQgVHdlZW5UeXBlID0ge1xuICAgIExpbmVhcjogZnVuY3Rpb24odCwgYiwgYywgZCkgeyByZXR1cm4gYyp0L2QgKyBiOyB9LFxuICAgIFF1YWQ6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqKHQgLz0gZCkqKHQtMikgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKCgtLXQpICogKHQtMikgLSAxKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEN1YmljOiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZU91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0L2QgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCp0ICsgYjtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiooKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUXVhcnQ6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQqdCArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqICgodCA9IHQvZCAtIDEpICogdCAqIHQqdCAtIDEpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKCh0IC09IDIpICogdCAqIHQqdCAtIDIpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUXVpbnQ6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdC9kIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIqKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgU2luZToge1xuICAgICAgICBlYXNlSW46IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqIE1hdGguY29zKHQvZCAqIChNYXRoLlBJLzIpKSArIGMgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc2luKHQvZCAqIChNYXRoLlBJLzIpKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLmNvcyhNYXRoLlBJICogdC9kKSAtIDEpICsgYjtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgRXhwbzoge1xuICAgICAgICBlYXNlSW46IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodD09MCkgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQvZCAtIDEpKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiAodD09ZCkgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQvZCkgKyAxKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCkge1xuICAgICAgICAgICAgaWYgKHQ9PTApIHJldHVybiBiO1xuICAgICAgICAgICAgaWYgKHQ9PWQpIHJldHVybiBiK2M7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIGMgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKSArIGI7XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiAoLU1hdGgucG93KDIsIC0xMCAqIC0tdCkgKyAyKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIENpcmM6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0L2QgLSAxKSAqIHQpICsgYjtcbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEVsYXN0aWM6IHtcbiAgICAgICAgZWFzZUluOiBmdW5jdGlvbih0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgICAgICB2YXIgcztcbiAgICAgICAgICAgIGlmICh0PT0wKSByZXR1cm4gYjtcbiAgICAgICAgICAgIGlmICgodCAvPSBkKSA9PSAxKSByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHAgPT0gXCJ1bmRlZmluZWRcIikgcCA9IGQgKiAuMztcbiAgICAgICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkLCBhLCBwKSB7XG4gICAgICAgICAgICB2YXIgcztcbiAgICAgICAgICAgIGlmICh0PT0wKSByZXR1cm4gYjtcbiAgICAgICAgICAgIGlmICgodCAvPSBkKSA9PSAxKSByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHAgPT0gXCJ1bmRlZmluZWRcIikgcCA9IGQgKiAuMztcbiAgICAgICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBwLygyKk1hdGguUEkpICogTWF0aC5hc2luKGMvYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGIpO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlSW5PdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQsIGEsIHApIHtcbiAgICAgICAgICAgIHZhciBzO1xuICAgICAgICAgICAgaWYgKHQ9PTApIHJldHVybiBiO1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA9PSAyKSByZXR1cm4gYitjO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09IFwidW5kZWZpbmVkXCIpIHAgPSBkICogKC4zICogMS41KTtcbiAgICAgICAgICAgIGlmICghYSB8fCBhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gKDIgICpNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodCA8IDEpIHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwKiAodCAtPTEgKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwICkgKiAuNSArIGMgKyBiO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBCYWNrOiB7XG4gICAgICAgIGVhc2VJbjogZnVuY3Rpb24odCwgYiwgYywgZCwgcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09IFwidW5kZWZpbmVkXCIpIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VPdXQ6IGZ1bmN0aW9uKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcyA9PSBcInVuZGVmaW5lZFwiKSBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdC9kIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG4gICAgICAgIH0sXG4gICAgICAgIGVhc2VJbk91dDogZnVuY3Rpb24odCwgYiwgYywgZCwgcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09IFwidW5kZWZpbmVkXCIpIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gKDEuNTI1KSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgICAgICAgICAgcmV0dXJuIGMgLyAyKigodCAtPSAyKSAqIHQgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEJvdW5jZToge1xuICAgICAgICBlYXNlSW46IGZ1bmN0aW9uKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC0gVHdlZW5UeXBlLkJvdW5jZS5lYXNlT3V0KGQtdCwgMCwgYywgZCkgKyBiO1xuICAgICAgICB9LFxuICAgICAgICBlYXNlT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPCAoMSAvIDIuNzUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogdCAqIHQpICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAoMS41IC8gMi43NSkpICogdCArIC43NSkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgKDIuNSAvIDIuNzUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDIuMjUgLyAyLjc1KSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gKDIuNjI1IC8gMi43NSkpICogdCArIC45ODQzNzUpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZWFzZUluT3V0OiBmdW5jdGlvbih0LCBiLCBjLCBkKSB7XG4gICAgICAgICAgICBpZiAodCA8IGQgLyAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFR3ZWVuVHlwZS5Cb3VuY2UuZWFzZUluKHQgKiAyLCAwLCBjLCBkKSAqIC41ICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFR3ZWVuVHlwZS5Cb3VuY2UuZWFzZU91dCh0ICogMiAtIGQsIDAsIGMsIGQpICogLjUgKyBjICogLjUgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG5jbGFzcyBUd2VlbntcblxuICAgIF9zdGFydFRpbWU6bnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICog57yT5Yqo5Yqo55S75bey57uP6L+Q6KGM5pe26Ze0XG4gICAgICog6K+05piO77yaIOmAmui/h+S4jeaWree0r+enr+avj+S4gOW4p+aJgOiKsei0ueeahOaXtumXtFxuICAgICAqL1xuICAgIF9ydW5uaW5nVGltZTpudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiDlk6rkuKrmj5Lku7bmlK/mjIHor6Xnm67moIdcbiAgICAgKi9cbiAgICBfcGx1Z2luSW5kZXg6bnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICog57yT5Yqo5Yqo55S75omn6KGM5pe25YCZ55qE5bin546H77yM5Zyo57yT5Yqo5YGc5q2i55qE5pe25YCZ5Lya6K6+572u5oiQMFxuICAgICAqL1xuICAgIGZwczpudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6YW55LCBmcm9tUHJvcHM6YW55LCB0b1Byb3BzOmFueSwgZHVyYXRpb246bnVtYmVyLCBlYXNlOlR3ZWVuVHlwZSl7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge1xuICAgICAgICAgICAgb25VcGRhdGU6IG51bGwsXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8g6L+Z6YeM5Lik6ICF6YO95piv5ZCM5pe25ou36LSd77yM6ICM5LiN5pS55Y+Y5YW26Ieq6Lqr5bGe5oCn77yM5Zug5Li6Y3Nz5qC35byP5Lul5ZCO6ZyA6KaB5byV5YWl6aKd5aSW5o+S5Lu25p2l5pSv5oyB77yM546w6Zi25q615Y+q6IO95Zyob25VcGRhdGXkuovku7bph4zpnaLmiYvliqjnu7TmiqRcbiAgICAgICAgdGhpcy5mcm9tUHJvcHMgPSBVdGlscy5jbG9uZShmcm9tUHJvcHMpO1xuICAgICAgICB0aGlzLl9mcm9tUHJvcHNPcmlnaW4gPSBVdGlscy5jbG9uZShmcm9tUHJvcHMpO1xuICAgICAgICB0aGlzLnRvUHJvcHMgPSB0b1Byb3BzO1xuICAgICAgICB0aGlzLmVhc2UgPSBlYXNlO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG5cbiAgICAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIFR3ZWVuLnBsdWdpbnMuZm9yRWFjaCgocGx1Z2luLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYocGx1Z2luLmlzU3VwcG9ydCh0YXJnZXQpKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbHVnaW5JbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZighVXRpbHMuaXNVbmRlZmluZWQodGhpcy5fcGx1Z2luSW5kZXgpKXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIuWRveS4reS6huaPkuS7tu+8mlwiICsgVHdlZW4ucGx1Z2luc1t0aGlzLl9wbHVnaW5JbmRleF0ubmFtZSk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgb25VcGRhdGUoY2FsbGJhY2s6RnVuY3Rpb24pOnRoaXN7XG4gICAgICAgIHRoaXMuX2V2ZW50cy5vblVwZGF0ZSA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvbkNvbXBsZXRlKGNhbGxiYWNrOkZ1bmN0aW9uKTp0aGlze1xuICAgICAgICB0aGlzLl9ldmVudHMub25Db21wbGV0ZSA9IGNhbGxiYWNrO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlvIDlp4vliqjnlLtcbiAgICAgKiDor7TmmI7vvJogc3RvcCgp5LmL5ZCO55qE5Yqo55S75Lya6YeN5paw5byA5aeLXG4gICAgICogQHJldHVybiB7VHdlZW59XG4gICAgICovXG4gICAgc3RhcnQoKTp0aGlze1xuICAgICAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcnVubmluZ1RpbWUgPSAwO1xuICAgICAgICB0aGlzLmZwcyA9IDA7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlgZzmraLliqjnlLtcbiAgICAgKiBAcmV0dXJuIHtUd2Vlbn1cbiAgICAgKi9cbiAgICBzdG9wKCk6dGhpc3tcbiAgICAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuICAgICAgICB0aGlzLmZwcyA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS4iuS4gOW4p+eahOaXtumXtFxuICAgICAqL1xuICAgIF9sYXN0VGltZTpudW1iZXI7XG5cbiAgICBfdXBkYXRlKG5vdyl7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW5byA5aeL5pe26Ze0XG4gICAgICAgIGlmKFV0aWxzLmlzVW5kZWZpbmVkKHRoaXMuX2xhc3RUaW1lKSl7XG4gICAgICAgICAgICB0aGlzLl9sYXN0VGltZSA9IG5vdztcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl91cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZwcyA9IDEwMDAvKG5vdyAtIHRoaXMuX2xhc3RUaW1lKTtcblxuICAgICAgICB0aGlzLl9ydW5uaW5nVGltZSArPSBub3cgLSB0aGlzLl9sYXN0VGltZTtcblxuICAgICAgICBpZih0aGlzLl9ydW5uaW5nVGltZSA+PSB0aGlzLmR1cmF0aW9uKXtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5fZml4ZWRJbkVuZCgpO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRzLm9uQ29tcGxldGUgJiYgdGhpcy5fZXZlbnRzLm9uQ29tcGxldGUuY2FsbCh0aGlzLmZyb21Qcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9ldmVudHMub25VcGRhdGUgJiYgdGhpcy5fZXZlbnRzLm9uVXBkYXRlLmNhbGwodGhpcy5mcm9tUHJvcHMpO1xuXG4gICAgICAgIC8vIOiuoeeul+mcgOimgee8k+WKqOeahOWxnuaAp+WSjOWvueW6lOWAvFxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRvUHJvcHMpLmZvckVhY2goKHByb3ApID0+IHtcblxuICAgICAgICAgICAgdGhpcy5mcm9tUHJvcHNbcHJvcF0gPSB0aGlzLmVhc2UodGhpcy5fcnVubmluZ1RpbWUsIHRoaXMuX2Zyb21Qcm9wc09yaWdpbltwcm9wXSwgdGhpcy50b1Byb3BzW3Byb3BdIC0gdGhpcy5fZnJvbVByb3BzT3JpZ2luW3Byb3BdLCB0aGlzLmR1cmF0aW9uKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICBpZih0aGlzLl9ydW5uaW5nKXtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RUaW1lID0gbm93O1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX3VwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWwhue8k+WKqOWxnuaAp+Wvuem9kFxuICAgICAqIOivtOaYju+8miDlm6DkuLrnu5PmnZ/ml7bpl7Tlh6DkuY7kuI3lj6/og73ljaHlnKjnu5PmnZ/nmoTpgqPkuIDmr6vnp5LvvIzmiYDku6Xnu5PmnZ/lkI7pnIDopoHmiYvliqjlsIbor6/lt67lr7npvZBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9maXhlZEluRW5kKCl7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMudG9Qcm9wcykuZm9yRWFjaCgocHJvcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mcm9tUHJvcHNbcHJvcF0gPSB0aGlzLnRvUHJvcHNbcHJvcF07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOS7peWvueixoeiHqui6q+WxnuaAp+S4uui1t+eCue+8jOe8k+WKqOWIsOebruagh+WxnuaAp1xuICAgICAqIEBwYXJhbSB0YXJnZXQg6YCJ5Lit5a+56LGhXG4gICAgICogQHBhcmFtIHRvUHJvcHMg55uu5qCH5bGe5oCnXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIHtudW1iZXJ9IOiAl+aXtuOAgiDljZXkvY3mr6vnp5JcbiAgICAgKiBAcGFyYW0gZWFzZSDnvJPliqjnsbvlnotcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge0Z1bmN0aW9ufSDlrozmiJDkuYvlkI7nmoTlm57osINcbiAgICAgKi9cbiAgICBzdGF0aWMgdG8odGFyZ2V0OmFueSAsIHRvUHJvcHM6YW55LCBkdXJhdGlvbjpudW1iZXIsIGVhc2U6VHdlZW5UeXBlID0gVHdlZW4uRWFzZS5MaW5lYXIsIGNhbGxiYWNrPzpGdW5jdGlvbik6IFR3ZWVue1xuXG4gICAgICAgIC8vIOaehOW7uuS4gOS4qmZyb21Qcm9wc++8jOmHjeaWsOeUn+aIkOS4gOS4qlR3ZWVu5a+56LGhXG4gICAgICAgIGxldCBmcm9tUHJvcHMgPSB7fTtcbiAgICAgICAgZm9yKGxldCBpIGluIHRvUHJvcHMpe1xuICAgICAgICAgICAgaWYodG9Qcm9wcy5oYXNPd25Qcm9wZXJ0eShpKSkgZnJvbVByb3BzW2ldID0gdGFyZ2V0W2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHR3ZWVuID0gbmV3IFR3ZWVuKHRhcmdldCwgZnJvbVByb3BzLCB0b1Byb3BzLCBkdXJhdGlvbiwgZWFzZSk7XG5cbiAgICAgICAgaWYoY2FsbGJhY2spe1xuICAgICAgICAgICAgdHdlZW4ub25Db21wbGV0ZShjYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHdlZW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5oyH5a6a5a+56LGh5byA5aeL5bGe5oCn77yM57yT5Yqo5Yiw55uu5qCH5bGe5oCnXG4gICAgICogQHBhcmFtIHRhcmdldCDpgInkuK3lr7nosaFcbiAgICAgKiBAcGFyYW0gZnJvbVByb3BzIOW8gOWni+WxnuaAp1xuICAgICAqIEBwYXJhbSB0b1Byb3BzIOebruagh+WxnuaAp1xuICAgICAqIEBwYXJhbSBkdXJhdGlvbiB7bnVtYmVyfSDogJfml7bjgIIg5Y2V5L2N5q+r56eSXG4gICAgICogQHBhcmFtIGVhc2Ug57yT5Yqo57G75Z6LXG4gICAgICogQHBhcmFtIGNhbGxiYWNrIHtGdW5jdGlvbn0g5a6M5oiQ5LmL5ZCO55qE5Zue6LCDXG4gICAgICovXG4gICAgc3RhdGljIGZyb21Ubyh0YXJnZXQ6YW55LCBmcm9tUHJvcHM6YW55LCB0b1Byb3BzOmFueSwgZHVyYXRpb246bnVtYmVyLCBlYXNlOlR3ZWVuVHlwZSA9IFR3ZWVuLkVhc2UuTGluZWFyLCBjYWxsYmFjaz86RnVuY3Rpb24pOiBUd2VlbntcblxuICAgICAgICBsZXQgdHdlZW4gPSBuZXcgVHdlZW4odGFyZ2V0LCBmcm9tUHJvcHMsIHRvUHJvcHMsIGR1cmF0aW9uLCBlYXNlKTtcblxuICAgICAgICBpZihjYWxsYmFjayl7XG4gICAgICAgICAgICB0d2Vlbi5vbkNvbXBsZXRlKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0d2VlbjtcbiAgICB9XG5cbn1cblxuLy8g6K6+572u5Li66Z2Z5oCB5bGe5oCnXG5Ud2Vlbi5FYXNlID0gVHdlZW5UeXBlO1xuXG5Ud2Vlbi5wbHVnaW5zID0gW1xuICAgIGNzc1BsdWdpblxuXTtcblxuY29uc3QgdGVzdGVyID0ge1xuXG4gICAgcGxheWVyOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuXG4gICAgaW5pdCgpe1xuICAgICAgICB0aGlzLnBsYXllci5jbGFzc05hbWUgPSBcInRlc3QtZG90ZXJcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLnRvcCA9IFwiMFwiO1xuICAgICAgICB0aGlzLnBsYXllci5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLndpZHRoID0gXCIzMHB4XCI7XG4gICAgICAgIHRoaXMucGxheWVyLnN0eWxlLmhlaWdodCA9IFwiMzBweFwiO1xuICAgICAgICB0aGlzLnBsYXllci5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZWRcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCI1MCVcIjtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc3R5bGUuekluZGV4ID0gXCIxMTExMVwiO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wbGF5ZXIpO1xuICAgIH1cblxufTtcblxudGVzdGVyLmluaXQoKTtcblxud2luZG93LnQgPSBUd2Vlbi50byh7eDogMCwgeTowfSwge3g6IHdpbmRvdy5pbm5lcldpZHRoIC0gMzAsIHk6IHdpbmRvdy5pbm5lckhlaWdodCAtIDMwfSwgMjAwMCwgVHdlZW4uRWFzZS5DdWJpYy5lYXNlSW5PdXQpXG4gICAgLm9uVXBkYXRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy54LCB0aGlzLnkpO1xuICAgICAgICB0ZXN0ZXIucGxheWVyLnN0eWxlLnRvcCA9IGAke3RoaXMueX1weGA7XG4gICAgICAgIHRlc3Rlci5wbGF5ZXIuc3R5bGUubGVmdCA9IGAke3RoaXMueH1weGA7XG4gICAgfSlcbiAgICAub25Db21wbGV0ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhcIkknbSBmaW5pc2hcIik7XG4gICAgfSk7XG5cblxuZXhwb3J0IGRlZmF1bHQgVHdlZW47XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1R3ZWVuL2luZGV4LmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGNvZmZlZSBvbiAwMi8wMy8yMDE3LlxuICovXG5cbmNsYXNzIFV0aWxze1xuXG4gICAgc3RhdGljIGlzT2JqZWN0KHRhcmdldCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc051bWJlcih0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gXCJudW1iZXJcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNGdW5jdGlvbih0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc1VuZGVmaW5lZCh0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRhcmdldCA9PT0gXCJ1bmRlZmluZWRcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNBcnJheSh0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh0YXJnZXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc051bGwodGFyZ2V0KTpib29sZWFue1xuICAgICAgICByZXR1cm4gdGFyZ2V0ID09PSBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBpc0xpa2VBcnJheSh0YXJnZXQpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gVXRpbHMuaXNBcnJheSh0YXJnZXQpICYmIFV0aWxzLmlzTnVtYmVyKHRhcmdldC5sZW5ndGgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOWvueaVsOe7hOOAgeS8quaVsOe7hOOAgeWvueixoeWxnuaAp+WIl+ihqOi/m+ihjOmBjeWOhlxuICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIHN0YXRpYyBlYWNoKHRhcmdldCwgY2FsbGJhY2spe1xuICAgICAgICBpZighVXRpbHMuaXNGdW5jdGlvbihjYWxsYmFjaykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZihVdGlscy5pc0FycmF5KHRhcmdldCkgfHwgVXRpbHMuaXNMaWtlQXJyYXkodGFyZ2V0KSl7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhcmdldCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgICAgIC8vZWxzZSBpZihVdGlscy5pc09iamVjdCh0YXJnZXQpKXtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICBrZXlzLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICAgICAgLy8gICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSwgaSlcbiAgICAgICAgLy8gICAgfSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5YWL6ZqG5LiA5Liq5pWw57uEXG4gICAgICog6K+05piO77ya6L+Z5Liq5ZKM6Ieq5bim55qE5LiN5ZCM77yM6K+l5Ye95pWw5Lya6Ieq5Yqo5a+55YiX6KGo6YeM6Z2i55qE5a+56LGh6L+b6KGM5rex5ou36LSdXG4gICAgICogQHBhcmFtIHRhcmdldEFycmF5XG4gICAgICogQHJldHVybiB7YW55W119XG4gICAgICovXG4gICAgc3RhdGljIF9jbG9uZUFycmF5KHRhcmdldEFycmF5OiBhbnlbXSl7XG5cbiAgICAgICAgbGV0IG5ld0FycmF5OmFueVtdID0gW107XG5cbiAgICAgICAgdGFyZ2V0QXJyYXkuZm9yRWFjaCgoZWxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgZWxlKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm9vbGVhblwiOlxuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheVtpbmRleF0gPSBlbGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgICAgICAgICBpZihVdGlscy5pc051bGwoZWxlKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcnJheVtpbmRleF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihVdGlscy5pc0FycmF5KGVsZSkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXlbaW5kZXhdID0gVXRpbHMuY2xvbmVBcnJheShlbGUpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcnJheVtpbmRleF0gPSBVdGlscy5jbG9uZShlbGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDlhYvpmobkuIDkuKrlr7nosaHmiJbogIXmlbDnu4RcbiAgICAgKiDor7TmmI7vvJrlj4LmlbDlpoLmnpzmmK9udW1iZXIsdW5kZWZpbmVkLG51bGwsc3RyaW5nLGJvb2xlYW7nrYnln7rnoYDnsbvlnovkvJrnm7TmjqXov5Tlm57oh6rouqtcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOS7u+S9leWvueixoeaIluiAheaVsOe7hFxuICAgICAqIEByZXR1cm4ge3t9fVxuICAgICAqL1xuICAgIHN0YXRpYyBjbG9uZSh0YXJnZXQ6IGFueXxhbnlbXSl7XG5cbiAgICAgICAgaWYoVXRpbHMuaXNBcnJheSh0YXJnZXQpKXtcbiAgICAgICAgICAgIHJldHVybiBVdGlscy5fY2xvbmVBcnJheSh0YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1RhcmdldCA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRhcmdldCkuZm9yRWFjaChwcm9wID0+IHtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdGFyZ2V0W3Byb3BdKXtcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwidW5kZWZpbmVkXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgICAgIG5ld1RhcmdldFtwcm9wXSA9IHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgIGlmKFV0aWxzLmlzTnVsbCh0YXJnZXRbcHJvcF0pKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RhcmdldFtwcm9wXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGFyZ2V0W3Byb3BdID0gVXRpbHMuY2xvbmUodGFyZ2V0W3Byb3BdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3VGFyZ2V0KS5sZW5ndGggPiAwID8gbmV3VGFyZ2V0IDogdGFyZ2V0O1xuICAgIH1cblxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGlicy9VdGlscy5qcyIsIi8qKlxuICogQ1NT5YWD57Sg55qE57yT5Yqo57uE5Lu2XG4gKiBDcmVhdGVkIGJ5IGNvZmZlZSBvbiAwNy8wMy8yMDE3LlxuICpcbiAqIOaUr+aMgee8k+WKqOeahOWxnuaAp1xuICogLSDlt7LmlK/mjIHvvJogd2lkdGgsIGhlaWdodCwgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBtYXJnaW4sIHBhZGRpbmdcbiAqIC0g5b6F5pSv5oyB77yaIHRyYW5zZm9ybSwgY29sb3IsIG9wYWNpdHlcbiAqL1xuXG5cbmNvbnN0IGNzc1BsdWdpbiA9IHtcblxuICAgIG5hbWU6IFwiY3NzUGx1Z2luXCIsXG5cbiAgICB2ZXJzaW9uOiBcIjAuMC4xXCIsXG5cbiAgICAvKipcbiAgICAgKiDor6Xmj5Lku7bog73lkKbmlK/mjIHnm67moIflr7nosaFcbiAgICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAgICovXG4gICAgaXNTdXBwb3J0KHRhcmdldDpIVE1MRWxlbWVudCl7XG4gICAgICAgIHJldHVybiB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICB9LFxuXG4gICAgLy8g5pSv5oyB55qE5bGe5oCnXG4gICAgX3N1cHBvcnRMaXN0OiBbXG4gICAgICAgIFwibGVmdFwiLCBcInJpZ2h0XCIsIFwidG9wXCIsIFwiYm90dG9tXCIsXG4gICAgICAgIFwid2lkdGhcIiwgXCJoZWlnaHRcIixcbiAgICAgICAgXCJtYXJnaW5cIiwgXCJtYXJnaW4tbGVmdFwiLCBcIm1hcmdpbi1yaWdodFwiLCBcIm1hcmdpbi10b3BcIiwgXCJtYXJnaW4tYm90dG9tXCIsXG4gICAgICAgIFwicGFkZGluZ1wiLCBcInBhZGRpbmctbGVmdFwiLCBcInBhZGRpbmctcmlnaHRcIiwgXCJwYWRkaW5nLXRvcFwiLCBcInBhZGRpbmctYm90dG9tXCJcbiAgICBdLFxuXG4gICAgLy8g5Y+v5Lul5ZCI5bm255qE5bGe5oCn77yM6K6+6K6h5Yiw5ZCO57ut55qE6Kej5p6Q55qE5ouG5YiGXG4gICAgX3N1cHBvcnRNZXJnZUxpc3Q6IFtcbiAgICAgICAgXCJtYXJnaW5cIiwgXCJwYWRkaW5nXCJcbiAgICBdLFxuXG4gICAgX2V4YW1wbGU6IHtcbiAgICAgICAgXCJ3aWR0aFwiOiB7XG4gICAgICAgICAgICB2YWx1ZTogMS42MyxcbiAgICAgICAgICAgIHVuaXQ6IFwicmVtXCJcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDlpoLmnpzorr7nva7nmoTmmK/mlbTkuKptYXJnaW7vvIzpgqPkuYjovazmjaLlkI7nmoTplK7kvJrmnInlm5vkuKrvvIzorr7nva7nmoTml7blgJnkuZ/pnIDopoHlkIjlubblm57ljrvjgILlj43kuYvvvIzljZXni6zov5DnrpfjgIJcbiAgICAgICAgXCJtYXJnaW5cIjoge1xuICAgICAgICAgICAgXCJ0b3BcIjoge1xuICAgICAgICAgICAgICAgIHZhbHVlOiAxMDAsXG4gICAgICAgICAgICAgICAgdW5pdDogXCJyZW1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYm90dG9tXCI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogMTAwLFxuICAgICAgICAgICAgICAgIHVuaXQ6IFwicHhcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgX3VwZGF0ZShodG1sRWxlVGFyZ2V0KXtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDor7vlj5ZIVE1M5YWD57Sg5LiKc3R5bGXlsZ7mgKfnmoTlgLzvvIzop6PmnpDmiJDlj6/ku6Xor7vlj5bnmoTlr7nosaFcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYXJzZSgpe1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybiB7e319XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcGFyc2VQcm9wcyhwcm9wczogYW55KXtcbiAgICAgICAgbGV0IHN0eWxlRGljdCA9IHt9O1xuXG4gICAgICAgIHJldHVybiBzdHlsZURpY3Q7XG4gICAgfVxuXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNzc1BsdWdpbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvVHdlZW4vcGx1Z2lucy9jc3NQbHVnaW4uanMiXSwic291cmNlUm9vdCI6IiJ9