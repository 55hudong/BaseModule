(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Route"] = factory();
	else
		root["Route"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by coffee on 20/01/2017.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
function findIndex(array, predicate, fromIndex) {
    if (fromIndex === void 0) {
        fromIndex = 0;
    }
    var index = -1;
    array = array.concat().splice(fromIndex);
    array.forEach(function (obj, index2) {
        var _bool = true;
        if ((typeof predicate === "undefined" ? "undefined" : _typeof(predicate)) === "object") {
            for (var i in predicate) {
                if (predicate[i] !== obj[i]) {
                    return false;
                }
            }
        } else if (typeof predicate === "function") {
            throw new Error("抱歉， 暂不支持传入function类型");
        } else {
            throw new Error("第二个参数是未知类型");
        }
        if (_bool) {
            index = index2;
            return false;
        }
    });
    return index;
}
var Route = function () {
    function Route() {
        var _this = this;
        /**
         * 字符串匹配路径的回调对象
         * key: 匹配路径
         * value: 回调列表
         */
        this.strCallbacks = [];
        /**
         * 正则匹配路径的回调列表
         */
        this.regCallbacks = [];
        /**
         * 匹配任何路径的回调列表
         */
        this.allCallbacks = [];
        this.beforeStrCallbacks = [];
        this.beforeRegCallbacks = [];
        this.beforeAllCallbacks = [];
        window.addEventListener("hashchange", function (event) {
            _this.hash = location.hash.replace("#", "");
            _this.triggerEvent(event);
        });
        window.addEventListener("popstate", function (event) {
            // console.log(event.state);
        });
        //触发默认事件
        setTimeout(function () {
            if (location.hash.replace("#", "").length > 0) {
                var event_1 = document.createEvent("HashChangeEvent");
                event_1.initEvent("hashchange", false, false);
                window.dispatchEvent(event_1);
            } else {
                if (_this.defaultHash) {
                    location.hash = _this.defaultHash;
                }
            }
        }, 0);
    }
    Object.defineProperty(Route.prototype, "hash", {
        get: function get() {
            return this._hash;
        },
        set: function set(val) {
            this._hash = val;
            window.location.hash = val;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param path
     * @return {Promise}
     */
    Route.prototype.setPath = function (path) {
        return new Promise(function (resolve, reject) {});
    };
    Route.prototype.getPath = function () {
        return this._hash;
    };
    /**
     * 在路由发生改变的时候总是会被触发
     * @param callback {function}
     */
    Route.prototype.all = function (callback) {
        if (typeof callback === "function") {
            this.allCallbacks.push(callback);
        }
        return this;
    };
    /**
     * 当匹配到对应的路径的时候触发回调
     * @param pathName 一个或者多个路径
     * @param callback {function}
     * @param trigger
     */
    Route.prototype.on = function (pathName, callback, trigger) {
        if (trigger === void 0) {
            trigger = "after";
        }
        if (Array.isArray(pathName)) {
            for (var _i = 0, pathName_1 = pathName; _i < pathName_1.length; _i++) {
                var path = pathName_1[_i];
                this.on(path, callback);
            }
            return this;
        }
        if (typeof pathName === "string") {
            if (trigger === "after") {
                var index = findIndex(this.strCallbacks, { pathName: pathName });
                if (index !== -1) {
                    this.strCallbacks[index].callback.push(callback);
                } else {
                    this.strCallbacks.push({
                        pathName: pathName,
                        callback: [callback]
                    });
                }
            } else if (trigger === "before") {
                var index = findIndex(this.beforeStrCallbacks, { pathName: pathName });
                if (index !== -1) {
                    this.beforeStrCallbacks[index].callback.push(callback);
                } else {
                    this.beforeStrCallbacks.push({
                        pathName: pathName,
                        callback: [callback]
                    });
                }
            } else {
                throw new Error("未知的触发类型");
            }
        } else if (pathName instanceof RegExp) {
            if (trigger === "after") {
                var index = findIndex(this.regCallbacks, { pathName: pathName.toString() });
                if (index === -1) {
                    this.regCallbacks.push({
                        pathName: pathName,
                        callback: [callback]
                    });
                } else {
                    this.regCallbacks[index].callback.push(callback);
                }
            } else if (trigger === "before") {
                var index = findIndex(this.beforeRegCallbacks, { pathName: pathName.toString() });
                if (index === -1) {
                    this.beforeRegCallbacks.push({
                        pathName: pathName,
                        callback: [callback]
                    });
                } else {
                    this.beforeStrCallbacks[index].callback.push(callback);
                }
            } else {
                throw new Error("未知的触发类型");
            }
        } else {
            console.warn("\u975E\u6CD5\u7684\u8DEF\u5F84\u7C7B\u578B:", pathName);
        }
        return this;
    };
    /**
     * 关闭指定路径的回调，如果不写回调方法则撤销改路径下的全部值
     * @param pathName
     * @param callback
     * @param trigger
     * @returns {Route}
     */
    Route.prototype.off = function (pathName, callback, trigger) {
        if (trigger === void 0) {
            trigger = "after";
        }
        if (Array.isArray(pathName)) {
            for (var _i = 0, pathName_2 = pathName; _i < pathName_2.length; _i++) {
                var path = pathName_2[_i];
                this.off(path, callback);
            }
            return this;
        }
        if (typeof pathName === "string") {
            if (trigger === "after") {
                var index = findIndex(this.strCallbacks, { pathName: pathName.toString() });
                if (index !== -1) {
                    if (!callback) {
                        this.strCallbacks[index].callback.length = 0;
                    } else {
                        this.strCallbacks[index].callback = this.strCallbacks[index].callback.filter(function (fn) {
                            return fn !== callback;
                        });
                    }
                }
            } else if (trigger === "before") {
                var index = findIndex(this.beforeStrCallbacks, { pathName: pathName.toString() });
                if (index !== -1) {
                    if (!callback) {
                        this.beforeStrCallbacks[index].callback.length = 0;
                    } else {
                        this.beforeRegCallbacks[index].callback = this.beforeStrCallbacks[index].callback.filter(function (fn) {
                            return fn !== callback;
                        });
                    }
                }
            }
        } else if (pathName instanceof RegExp) {
            if (trigger === "after") {
                var index = findIndex(this.regCallbacks.map(function (obj) {
                    return {
                        pathName: obj.pathName.toString(),
                        callback: obj.callback
                    };
                }), { pathName: pathName.toString() });
                if (index !== -1) {
                    if (!callback) {
                        this.regCallbacks[index].callback.length = 0;
                    } else {
                        this.regCallbacks[index].callback = this.regCallbacks[index].callback.filter(function (fn) {
                            return fn !== callback;
                        });
                    }
                }
            } else if (trigger === "before") {
                var index = findIndex(this.beforeRegCallbacks.map(function (obj) {
                    return {
                        pathName: obj.pathName.toString(),
                        callback: obj.callback
                    };
                }), { pathName: pathName.toString() });
                if (index !== -1) {
                    if (!callback) {
                        this.beforeRegCallbacks[index].callback.length = 0;
                    } else {
                        this.beforeRegCallbacks[index].callback = this.beforeRegCallbacks[index].callback.filter(function (fn) {
                            return fn !== callback;
                        });
                    }
                }
            } else {
                throw new Error("未知的触发类型");
            }
        }
        return this;
    };
    Route.prototype.triggerEvent = function (event) {
        // 总是需要被触发的事件
        for (var _i = 0, _a = this.allCallbacks; _i < _a.length; _i++) {
            var fn = _a[_i];
            fn.call(this, event);
        }
        // 判断字符串匹配的事件
        var strIndex = findIndex(this.strCallbacks, { pathName: this.hash });
        if (strIndex !== -1) {
            for (var _b = 0, _c = this.strCallbacks[strIndex].callback; _b < _c.length; _b++) {
                var fn = _c[_b];
                fn.call(this, event);
            }
        }
        // 判断正则匹配的事件
        for (var _d = 0, _e = this.regCallbacks; _d < _e.length; _d++) {
            var obj = _e[_d];
            if (obj.pathName.test(this.hash)) {
                for (var _f = 0, _g = obj.callback; _f < _g.length; _f++) {
                    var fn = _g[_f];
                    fn.call(this, event);
                }
            }
        }
    };
    /**
     * 设置路由的默认值
     * ps: 当路由值为空时执行
     */
    Route.prototype.setDefault = function (value) {
        this.defaultHash = value;
        return this;
    };
    return Route;
}();
exports.default = Route;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKioiLCJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGZmZmFkMTI1OGEzMDUxYTY1NDViP2UzZjIqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JvdXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZmluZEluZGV4IiwiYXJyYXkiLCJwcmVkaWNhdGUiLCJmcm9tSW5kZXgiLCJpbmRleCIsImNvbmNhdCIsInNwbGljZSIsImZvckVhY2giLCJvYmoiLCJpbmRleDIiLCJfYm9vbCIsImkiLCJFcnJvciIsIlJvdXRlIiwiX3RoaXMiLCJzdHJDYWxsYmFja3MiLCJyZWdDYWxsYmFja3MiLCJhbGxDYWxsYmFja3MiLCJiZWZvcmVTdHJDYWxsYmFja3MiLCJiZWZvcmVSZWdDYWxsYmFja3MiLCJiZWZvcmVBbGxDYWxsYmFja3MiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJoYXNoIiwibG9jYXRpb24iLCJyZXBsYWNlIiwidHJpZ2dlckV2ZW50Iiwic2V0VGltZW91dCIsImxlbmd0aCIsImV2ZW50XzEiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImRlZmF1bHRIYXNoIiwicHJvdG90eXBlIiwiZ2V0IiwiX2hhc2giLCJzZXQiLCJ2YWwiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwic2V0UGF0aCIsInBhdGgiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImdldFBhdGgiLCJhbGwiLCJjYWxsYmFjayIsInB1c2giLCJvbiIsInBhdGhOYW1lIiwidHJpZ2dlciIsIkFycmF5IiwiaXNBcnJheSIsIl9pIiwicGF0aE5hbWVfMSIsIlJlZ0V4cCIsInRvU3RyaW5nIiwiY29uc29sZSIsIndhcm4iLCJvZmYiLCJwYXRoTmFtZV8yIiwiZmlsdGVyIiwiZm4iLCJtYXAiLCJfYSIsImNhbGwiLCJzdHJJbmRleCIsIl9iIiwiX2MiLCJfZCIsIl9lIiwidGVzdCIsIl9mIiwiX2ciLCJzZXREZWZhdWx0IiwiZGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDN0RBO0FBQ0E7Ozs7OztBQUdBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFQyxPQUFPLElBQVQsRUFBN0M7QUFDQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQkMsU0FBMUIsRUFBcUNDLFNBQXJDLEVBQWdEO0FBQzVDLFFBQUlBLGNBQWMsS0FBSyxDQUF2QixFQUEwQjtBQUFFQSxvQkFBWSxDQUFaO0FBQWdCO0FBQzVDLFFBQUlDLFFBQVEsQ0FBQyxDQUFiO0FBQ0FILFlBQVFBLE1BQU1JLE1BQU4sR0FBZUMsTUFBZixDQUFzQkgsU0FBdEIsQ0FBUjtBQUNBRixVQUFNTSxPQUFOLENBQWMsVUFBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCO0FBQ2pDLFlBQUlDLFFBQVEsSUFBWjtBQUNBLFlBQUksUUFBT1IsU0FBUCx5Q0FBT0EsU0FBUCxPQUFxQixR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akUsTUFBTWtFLEdBQUdELEVBQUgsQ0FBVjtBQUNBLGdCQUFJakUsSUFBSTZDLFFBQUosQ0FBYXNCLElBQWIsQ0FBa0IsS0FBS25ELElBQXZCLENBQUosRUFBa0M7QUFDOUIscUJBQUssSUFBSW9ELEtBQUssQ0FBVCxFQUFZQyxLQUFLckUsSUFBSTBDLFFBQTFCLEVBQW9DMEIsS0FBS0MsR0FBR2hELE1BQTVDLEVBQW9EK0MsSUFBcEQsRUFBMEQ7QUFDdEQsd0JBQUlWLEtBQUtXLEdBQUdELEVBQUgsQ0FBVDtBQUNBVix1QkFBR0csSUFBSCxDQUFRLElBQVIsRUFBYzlDLEtBQWQ7QUFDSDtBQUNKO0FBQ0o7QUFDSixLQXhCRDtBQXlCQTs7OztBQUlBVixVQUFNdUIsU0FBTixDQUFnQjBDLFVBQWhCLEdBQTZCLFVBQVUvRSxLQUFWLEVBQWlCO0FBQzFDLGFBQUtvQyxXQUFMLEdBQW1CcEMsS0FBbkI7QUFDQSxlQUFPLElBQVA7QUFDSCxLQUhEO0FBSUEsV0FBT2MsS0FBUDtBQUNILENBelFZLEVBQWI7QUEwUUFmLFFBQVFpRixPQUFSLEdBQWtCbEUsS0FBbEIsQyIsImZpbGUiOiJSb3V0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJvdXRlXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJvdXRlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmZmYWQxMjU4YTMwNTFhNjU0NWIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ3JlYXRlZCBieSBjb2ZmZWUgb24gMjAvMDEvMjAxNy5cbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUsIGZyb21JbmRleCkge1xuICAgIGlmIChmcm9tSW5kZXggPT09IHZvaWQgMCkgeyBmcm9tSW5kZXggPSAwOyB9XG4gICAgdmFyIGluZGV4ID0gLTE7XG4gICAgYXJyYXkgPSBhcnJheS5jb25jYXQoKS5zcGxpY2UoZnJvbUluZGV4KTtcbiAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChvYmosIGluZGV4Mikge1xuICAgICAgICB2YXIgX2Jvb2wgPSB0cnVlO1xuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBwcmVkaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZGljYXRlW2ldICE9PSBvYmpbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuaKseatie+8jCDmmoLkuI3mlK/mjIHkvKDlhaVmdW5jdGlvbuexu+Wei1wiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuesrOS6jOS4quWPguaVsOaYr+acquefpeexu+Wei1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX2Jvb2wpIHtcbiAgICAgICAgICAgIGluZGV4ID0gaW5kZXgyO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGluZGV4O1xufVxudmFyIFJvdXRlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSb3V0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOWtl+espuS4suWMuemFjei3r+W+hOeahOWbnuiwg+WvueixoVxuICAgICAgICAgKiBrZXk6IOWMuemFjei3r+W+hFxuICAgICAgICAgKiB2YWx1ZTog5Zue6LCD5YiX6KGoXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN0ckNhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICog5q2j5YiZ5Yy56YWN6Lev5b6E55qE5Zue6LCD5YiX6KGoXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlZ0NhbGxiYWNrcyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICog5Yy56YWN5Lu75L2V6Lev5b6E55qE5Zue6LCD5YiX6KGoXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFsbENhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmJlZm9yZVN0ckNhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmJlZm9yZVJlZ0NhbGxiYWNrcyA9IFtdO1xuICAgICAgICB0aGlzLmJlZm9yZUFsbENhbGxiYWNrcyA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhhc2hjaGFuZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBfdGhpcy5oYXNoID0gbG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgICAgICAgICAgIF90aGlzLnRyaWdnZXJFdmVudChldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZXZlbnQuc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy/op6blj5Hpu5jorqTkuovku7ZcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaGFzaC5yZXBsYWNlKFwiI1wiLCBcIlwiKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50XzEgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkhhc2hDaGFuZ2VFdmVudFwiKTtcbiAgICAgICAgICAgICAgICBldmVudF8xLmluaXRFdmVudChcImhhc2hjaGFuZ2VcIiwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudF8xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kZWZhdWx0SGFzaCkge1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5oYXNoID0gX3RoaXMuZGVmYXVsdEhhc2g7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJvdXRlLnByb3RvdHlwZSwgXCJoYXNoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9oYXNoID0gdmFsO1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSB2YWw7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhdGhcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqL1xuICAgIFJvdXRlLnByb3RvdHlwZS5zZXRQYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBSb3V0ZS5wcm90b3R5cGUuZ2V0UGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDlnKjot6/nlLHlj5HnlJ/mlLnlj5jnmoTml7blgJnmgLvmmK/kvJrooqvop6blj5FcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufVxuICAgICAqL1xuICAgIFJvdXRlLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmFsbENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOW9k+WMuemFjeWIsOWvueW6lOeahOi3r+W+hOeahOaXtuWAmeinpuWPkeWbnuiwg1xuICAgICAqIEBwYXJhbSBwYXRoTmFtZSDkuIDkuKrmiJbogIXlpJrkuKrot6/lvoRcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sge2Z1bmN0aW9ufVxuICAgICAqIEBwYXJhbSB0cmlnZ2VyXG4gICAgICovXG4gICAgUm91dGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKHBhdGhOYW1lLCBjYWxsYmFjaywgdHJpZ2dlcikge1xuICAgICAgICBpZiAodHJpZ2dlciA9PT0gdm9pZCAwKSB7IHRyaWdnZXIgPSBcImFmdGVyXCI7IH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aE5hbWUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHBhdGhOYW1lXzEgPSBwYXRoTmFtZTsgX2kgPCBwYXRoTmFtZV8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gcGF0aE5hbWVfMVtfaV07XG4gICAgICAgICAgICAgICAgdGhpcy5vbihwYXRoLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBhdGhOYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAodHJpZ2dlciA9PT0gXCJhZnRlclwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHRoaXMuc3RyQ2FsbGJhY2tzLCB7IHBhdGhOYW1lOiBwYXRoTmFtZSB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RyQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjay5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RyQ2FsbGJhY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aE5hbWU6IHBhdGhOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IFtjYWxsYmFja11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHJpZ2dlciA9PT0gXCJiZWZvcmVcIikge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLmJlZm9yZVN0ckNhbGxiYWNrcywgeyBwYXRoTmFtZTogcGF0aE5hbWUgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZVN0ckNhbGxiYWNrc1tpbmRleF0uY2FsbGJhY2sucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZVN0ckNhbGxiYWNrcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhOYW1lOiBwYXRoTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBbY2FsbGJhY2tdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIuacquefpeeahOinpuWPkeexu+Wei1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwYXRoTmFtZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgaWYgKHRyaWdnZXIgPT09IFwiYWZ0ZXJcIikge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLnJlZ0NhbGxiYWNrcywgeyBwYXRoTmFtZTogcGF0aE5hbWUudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnQ2FsbGJhY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aE5hbWU6IHBhdGhOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IFtjYWxsYmFja11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZ0NhbGxiYWNrc1tpbmRleF0uY2FsbGJhY2sucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHJpZ2dlciA9PT0gXCJiZWZvcmVcIikge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLmJlZm9yZVJlZ0NhbGxiYWNrcywgeyBwYXRoTmFtZTogcGF0aE5hbWUudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlUmVnQ2FsbGJhY2tzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aE5hbWU6IHBhdGhOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IFtjYWxsYmFja11cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZVN0ckNhbGxiYWNrc1tpbmRleF0uY2FsbGJhY2sucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwi5pyq55+l55qE6Kem5Y+R57G75Z6LXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiXFx1OTc1RVxcdTZDRDVcXHU3Njg0XFx1OERFRlxcdTVGODRcXHU3QzdCXFx1NTc4QjpcIiwgcGF0aE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog5YWz6Zet5oyH5a6a6Lev5b6E55qE5Zue6LCD77yM5aaC5p6c5LiN5YaZ5Zue6LCD5pa55rOV5YiZ5pKk6ZSA5pS56Lev5b6E5LiL55qE5YWo6YOo5YC8XG4gICAgICogQHBhcmFtIHBhdGhOYW1lXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHRyaWdnZXJcbiAgICAgKiBAcmV0dXJucyB7Um91dGV9XG4gICAgICovXG4gICAgUm91dGUucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChwYXRoTmFtZSwgY2FsbGJhY2ssIHRyaWdnZXIpIHtcbiAgICAgICAgaWYgKHRyaWdnZXIgPT09IHZvaWQgMCkgeyB0cmlnZ2VyID0gXCJhZnRlclwiOyB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhdGhOYW1lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBwYXRoTmFtZV8yID0gcGF0aE5hbWU7IF9pIDwgcGF0aE5hbWVfMi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IHBhdGhOYW1lXzJbX2ldO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKHBhdGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGF0aE5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyID09PSBcImFmdGVyXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgodGhpcy5zdHJDYWxsYmFja3MsIHsgcGF0aE5hbWU6IHBhdGhOYW1lLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ckNhbGxiYWNrc1tpbmRleF0uY2FsbGJhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RyQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjayA9IHRoaXMuc3RyQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjay5maWx0ZXIoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbiAhPT0gY2FsbGJhY2s7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHJpZ2dlciA9PT0gXCJiZWZvcmVcIikge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGZpbmRJbmRleCh0aGlzLmJlZm9yZVN0ckNhbGxiYWNrcywgeyBwYXRoTmFtZTogcGF0aE5hbWUudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlU3RyQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjay5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iZWZvcmVSZWdDYWxsYmFja3NbaW5kZXhdLmNhbGxiYWNrID0gdGhpcy5iZWZvcmVTdHJDYWxsYmFja3NbaW5kZXhdLmNhbGxiYWNrLmZpbHRlcihmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuICE9PSBjYWxsYmFjazsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocGF0aE5hbWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyID09PSBcImFmdGVyXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgodGhpcy5yZWdDYWxsYmFja3MubWFwKGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhOYW1lOiBvYmoucGF0aE5hbWUudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBvYmouY2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSwgeyBwYXRoTmFtZTogcGF0aE5hbWUudG9TdHJpbmcoKSB9KTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVnQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjay5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdDYWxsYmFja3NbaW5kZXhdLmNhbGxiYWNrID0gdGhpcy5yZWdDYWxsYmFja3NbaW5kZXhdLmNhbGxiYWNrLmZpbHRlcihmdW5jdGlvbiAoZm4pIHsgcmV0dXJuIGZuICE9PSBjYWxsYmFjazsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0cmlnZ2VyID09PSBcImJlZm9yZVwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZmluZEluZGV4KHRoaXMuYmVmb3JlUmVnQ2FsbGJhY2tzLm1hcChmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoTmFtZTogb2JqLnBhdGhOYW1lLnRvU3RyaW5nKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogb2JqLmNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSksIHsgcGF0aE5hbWU6IHBhdGhOYW1lLnRvU3RyaW5nKCkgfSk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJlZm9yZVJlZ0NhbGxiYWNrc1tpbmRleF0uY2FsbGJhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYmVmb3JlUmVnQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjayA9IHRoaXMuYmVmb3JlUmVnQ2FsbGJhY2tzW2luZGV4XS5jYWxsYmFjay5maWx0ZXIoZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbiAhPT0gY2FsbGJhY2s7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwi5pyq55+l55qE6Kem5Y+R57G75Z6LXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUm91dGUucHJvdG90eXBlLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyDmgLvmmK/pnIDopoHooqvop6blj5HnmoTkuovku7ZcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuYWxsQ2FsbGJhY2tzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGZuID0gX2FbX2ldO1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Yik5pat5a2X56ym5Liy5Yy56YWN55qE5LqL5Lu2XG4gICAgICAgIHZhciBzdHJJbmRleCA9IGZpbmRJbmRleCh0aGlzLnN0ckNhbGxiYWNrcywgeyBwYXRoTmFtZTogdGhpcy5oYXNoIH0pO1xuICAgICAgICBpZiAoc3RySW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGhpcy5zdHJDYWxsYmFja3Nbc3RySW5kZXhdLmNhbGxiYWNrOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgIHZhciBmbiA9IF9jW19iXTtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyDliKTmlq3mraPliJnljLnphY3nmoTkuovku7ZcbiAgICAgICAgZm9yICh2YXIgX2QgPSAwLCBfZSA9IHRoaXMucmVnQ2FsbGJhY2tzOyBfZCA8IF9lLmxlbmd0aDsgX2QrKykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IF9lW19kXTtcbiAgICAgICAgICAgIGlmIChvYmoucGF0aE5hbWUudGVzdCh0aGlzLmhhc2gpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2YgPSAwLCBfZyA9IG9iai5jYWxsYmFjazsgX2YgPCBfZy5sZW5ndGg7IF9mKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gX2dbX2ZdO1xuICAgICAgICAgICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOiuvue9rui3r+eUseeahOm7mOiupOWAvFxuICAgICAqIHBzOiDlvZPot6/nlLHlgLzkuLrnqbrml7bmiafooYxcbiAgICAgKi9cbiAgICBSb3V0ZS5wcm90b3R5cGUuc2V0RGVmYXVsdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmRlZmF1bHRIYXNoID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFJvdXRlO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJvdXRlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1JvdXRlL2luZGV4LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==