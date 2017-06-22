(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["LoadQueue"] = factory();
	else
		root["LoadQueue"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by coffee on 2016/12/13.
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 自定义一个加载器
 * 说明： 传入的时候会执行该方法，并且第一个参数是一个loader对象，对这个对象进行添加基本的成功、失败、获取内容等事件
 * @param loader
 */
function imageLoader(loader) {
    loader.load = function (src) {
        var _this = this;
        var image = new Image();
        image.onload = function () {
            return _this.success();
        };
        image.onerror = function () {
            return _this.fail();
        };
        image.src = src;
        return image;
    };
}
var LoadQueue = function () {
    function LoadQueue(sourceList) {
        if (sourceList === void 0) {
            sourceList = [];
        }
        this.queueList = [];
        /**
         * 事件列表
         */
        this.eventList = {
            complete: [],
            completeOnce: [],
            progress: [],
            progressOnce: [],
            success: [],
            fail: []
        };
        this.loaderList = {};
        /**
         * 所有资源数量
         */
        this.allCount = 0;
        /**
         * 完成资源数量
         */
        this.finishCount = 0;
        /**
         * 成功加载的资源数量
         */
        this.successCount = 0;
        /**
         * 加载失败的资源数量
         */
        this.failCount = 0;
        if (sourceList.length > 0) this.addSource(sourceList);
        this.addLoader("image", imageLoader);
    }
    /**
     * 检索对象在列表中的位置， 不存在返回 -1
     * @param arr
     * @param obj
     */
    LoadQueue.findIndex = function (arr, obj) {
        var index = -1;
        arr.forEach(function (ele, i) {
            var allPass = true;
            for (var i_1 in obj) {
                if (obj.hasOwnProperty(i_1)) {
                    if (obj[i_1] !== ele[i_1]) {
                        allPass = false;
                        break;
                    }
                }
            }
            if (allPass) index = i;
            return !allPass;
        });
        return index;
    };
    /**
     * 添加资源列表
     * @param sourceList
     * 说明： source.id作为列表的主键，冲突后的资源是无法添加到队列的
     */
    LoadQueue.prototype.addSource = function (sourceList) {
        var _this = this;
        if (sourceList === void 0) {
            sourceList = [];
        }
        if (Array.isArray(sourceList)) {
            sourceList.forEach(function (source) {
                if (LoadQueue.findIndex(_this.queueList, { id: source.id }) !== -1) {
                    console.warn("\u68C0\u6D4B\u5230\u51B2\u7A81\u7684id: " + source.id + "\uFF0C \u8FD9\u4E2A\u8D44\u6E90\u6CA1\u6709\u88AB\u6DFB\u52A0\u5230\u961F\u5217\u4E2D");
                    return true;
                }
                _this.queueList.push(source);
            });
        } else {
            this.addSource([sourceList]);
        }
        return this;
    };
    /**
     * 删除指定属性的资源
     * @param source 资源的属性，可以是主键或者其它属性一个或者多个
     */
    LoadQueue.prototype.removeSource = function (source) {
        var index = LoadQueue.findIndex(this.queueList, source);
        if (index !== -1) {
            this.queueList.splice(index, 1);
        }
        return this;
    };
    /**
     * 通过name属性删除资源
     * @param name
     */
    LoadQueue.prototype.removeSourceByName = function (name) {
        this.removeSource({ name: name });
        return this;
    };
    /**
     * 通过id属性删除资源
     * @param id
     */
    LoadQueue.prototype.removeSourceById = function (id) {
        this.removeSource({ id: id });
        return this;
    };
    /**
     * 根据资源属性查询并返回指定的资源对象，不存在返回null
     * @param source 资源的某个属性
     * @return {Source}
     */
    LoadQueue.prototype.getSource = function (source) {
        var index = LoadQueue.findIndex(this.queueList, source);
        return index === -1 ? null : this.queueList[index];
    };
    /**
     * 通过id查询出对应的资源对象，不存在则返回null
     * @param id
     * @return {Source}
     */
    LoadQueue.prototype.getSourceById = function (id) {
        var index = LoadQueue.findIndex(this.queueList, { id: id });
        return index === -1 ? null : this.queueList[index];
    };
    /**
     * 通过name属性查询出对应的对象，不存在则返回null
     * @param name
     * @return {Source}
     */
    LoadQueue.prototype.getSourceByName = function (name) {
        var index = LoadQueue.findIndex(this.queueList, { name: name });
        return index === -1 ? null : this.queueList[index];
    };
    /**
     * 通过资源属性返回HTML标签，例如：<img />
     * @param source
     */
    LoadQueue.prototype.getContent = function (source) {
        var index = LoadQueue.findIndex(this.queueList, source);
        return index === -1 ? null : this.queueList[index].element;
    };
    LoadQueue.prototype.getContentById = function (id) {
        var index = LoadQueue.findIndex(this.queueList, { id: id });
        return index === -1 ? null : this.queueList[index].element;
    };
    LoadQueue.prototype.getContentByName = function (name) {
        var index = LoadQueue.findIndex(this.queueList, { name: name });
        return index === -1 ? null : this.queueList[index].element;
    };
    LoadQueue.prototype.start = function () {
        var _this = this;
        this.allCount = this.queueList.length;
        this.finishCount = 0;
        this.successCount = 0;
        this.failCount = 0;
        /**
         * 全部资源加载ok，触发对应事件，并且移除一次性事件(完成、进行中)
         */
        var checkFinish = function checkFinish() {
            if (_this.finishCount === _this.allCount) {
                _this.eventList[LoadQueue.Event.Progress].forEach(function (eventFn) {
                    return eventFn.call(_this, _this.allCount, _this.finishCount, _this.successCount, _this.failCount);
                });
                _this.eventList[LoadQueue.Event.ProgressOnce].forEach(function (eventFn) {
                    return eventFn.call(_this, _this.allCount, _this.finishCount, _this.successCount, _this.failCount);
                });
                _this.eventList[LoadQueue.Event.Complete].forEach(function (eventFn) {
                    return eventFn.call(_this);
                });
                _this.eventList[LoadQueue.Event.CompleteOnce].forEach(function (eventFn) {
                    return eventFn.call(_this);
                });
                _this.eventList[LoadQueue.Event.CompleteOnce].length = 0;
                _this.eventList[LoadQueue.Event.ProgressOnce].length = 0;
            } else {
                _this.eventList[LoadQueue.Event.Progress].forEach(function (eventFn) {
                    return eventFn.call(_this, _this.allCount, _this.finishCount, _this.successCount, _this.failCount);
                });
                _this.eventList[LoadQueue.Event.ProgressOnce].forEach(function (eventFn) {
                    return eventFn.call(_this, _this.allCount, _this.finishCount, _this.successCount, _this.failCount);
                });
            }
        };
        this.queueList.forEach(function (source) {
            var image = document.createElement("img");
            image.onload = function () {
                _this.finishCount++;
                _this.successCount++;
                _this.eventList[LoadQueue.Event.Success].forEach(function (eventFn) {
                    return eventFn.call(_this, source);
                });
                source.element = image;
                checkFinish();
            };
            image.onerror = function () {
                _this.failCount++;
                checkFinish();
                _this.eventList[LoadQueue.Event.Fail].forEach(function (eventFn) {
                    return eventFn.call(_this, source);
                });
            };
            image.src = source.src;
        });
        return this;
    };
    /**
     * 监听事件
     * @param eventName 事件名称，可以访问LoadQueue.Event这个静态属性来获得
     * @param callback
     */
    LoadQueue.prototype.on = function (eventName, callback) {
        this.eventList[eventName].push(callback);
        return this;
    };
    /**
     * 增加一个类型加载器。如音频加载器
     * 说明：加载器名字大小写不敏感，全部都会转换为小写。
     * @param loaderName
     * @param loaderFn
     * @param override 是否覆盖之前的加载器
     */
    LoadQueue.prototype.addLoader = function (loaderName, loaderFn, override) {
        if (override === void 0) {
            override = false;
        }
        var loader = {};
        loaderName = loaderName.toLowerCase();
        loaderFn(loader);
        if (!this.loaderList[loaderName]) {
            this.loaderList[loaderName] = loader;
        } else {
            if (!override) {
                console.warn("\u68C0\u6D4B\u5230\"" + loaderName + "\"\u52A0\u8F7D\u5668\u5DF2\u7ECF\u5B58\u5728\uFF0C\u5982\u679C\u9700\u8981\u8BF7\u4F20\u5165overrider\u53C2\u6570\u4E3Atrue");
            } else {
                this.loaderList[loaderName] = loader;
            }
        }
    };
    LoadQueue.Event = {
        Complete: "complete",
        CompleteOnce: "completeOnce",
        Progress: "progress",
        ProgressOnce: "progressOnce",
        Success: "success",
        Fail: "fail"
    };
    return LoadQueue;
}();
exports.default = LoadQueue;
window["LoadQueue"] = LoadQueue;

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKioqIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZmZhZDEyNThhMzA1MWE2NTQ1Yj9lM2YyKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTG9hZFF1ZXVlL0xvYWRRdWV1ZS50cyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImltYWdlTG9hZGVyIiwibG9hZGVyIiwibG9hZCIsInNyYyIsIl90aGlzIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInN1Y2Nlc3MiLCJvbmVycm9yIiwiZmFpbCIsIkxvYWRRdWV1ZSIsInNvdXJjZUxpc3QiLCJxdWV1ZUxpc3QiLCJldmVudExpc3QiLCJjb21wbGV0ZSIsImNvbXBsZXRlT25jZSIsInByb2dyZXNzIiwicHJvZ3Jlc3NPbmNlIiwibG9hZGVyTGlzdCIsImFsbENvdW50IiwiZmluaXNoQ291bnQiLCJzdWNjZXNzQ291bnQiLCJmYWlsQ291bnQiLCJsZW5ndGgiLCJhZGRTb3VyY2UiLCJhZGRMb2FkZXIiLCJmaW5kSW5kZXgiLCJhcnIiLCJvYmoiLCJpbmRleCIsImZvckVhY2giLCJlbGUiLCJpIiwiYWxsUGFzcyIsImlfMSIsImhhc093blByb3BlcnR5IiwicHJvdG90eXBlIiwiQXJyYXkiLCJpc0FycmF5Iiwic291cmNlIiwiaWQiLCJjb25zb2xlIiwid2FybiIsInB1c2giLCJyZW1vdmVTb3VyY2UiLCJzcGxpY2UiLCJyZW1vdmVTb3VyY2VCeU5hbWUiLCJuYW1lIiwicmVtb3ZlU291cmNlQnlJZCIsImdldFNvdXJjZSIsImdldFNvdXJjZUJ5SWQiLCJnZXRTb3VyY2VCeU5hbWUiLCJnZXRDb250ZW50IiwiZWxlbWVudCIsImdldENvbnRlbnRCeUlkIiwiZ2V0Q29udGVudEJ5TmFtZSIsInN0YXJ0IiwiY2hlY2tGaW5pc2giLCJFdmVudCIsIlByb2dyZXNzIiwiZXZlbnRGbiIsImNhbGwiLCJQcm9ncmVzc09uY2UiLCJDb21wbGV0ZSIsIkNvbXBsZXRlT25jZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIlN1Y2Nlc3MiLCJGYWlsIiwib24iLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImxvYWRlck5hbWUiLCJsb2FkZXJGbiIsIm92ZXJyaWRlIiwidG9Mb3dlckNhc2UiLCJkZWZhdWx0Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUM3REE7QUFDQTs7OztBQUdBQSxPQUFPQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFQyxPQUFPLElBQVQsRUFBN0M7QUFDQTs7Ozs7QUFLQSxTQUFTQyxXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUN6QkEsV0FBT0MsSUFBUCxHQUFjLFVBQVVDLEdBQVYsRUFBZTtBQUN6QixZQUFJQyxRQUFRLElBQVo7QUFDQSxZQUFJQyxRQUFRLElBQUlDLEtBQUosRUFBWjtBQUNBRCxjQUFNRSxNQUFOLEdBQWUsWUFBWTtBQUFFLG1CQUFPSCxNQUFNSSxPQUFOLEVBQVA7QUFBeUIsU0FBdEQ7QUFDQUgsY0FBTUksT0FBTixH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LGlCQUFLdEQsVUFBTCxDQUFnQnNELFVBQWhCLElBQThCeEUsTUFBOUI7QUFDSCxTQUZELE1BR0s7QUFDRCxnQkFBSSxDQUFDMEUsUUFBTCxFQUFlO0FBQ1hqQyx3QkFBUUMsSUFBUixDQUFhLHlCQUF5QjhCLFVBQXpCLEdBQXNDLDZIQUFuRDtBQUNILGFBRkQsTUFHSztBQUNELHFCQUFLdEQsVUFBTCxDQUFnQnNELFVBQWhCLElBQThCeEUsTUFBOUI7QUFDSDtBQUNKO0FBQ0osS0FoQkQ7QUFpQkFVLGNBQVVnRCxLQUFWLEdBQWtCO0FBQ2RLLGtCQUFVLFVBREk7QUFFZEMsc0JBQWMsY0FGQTtBQUdkTCxrQkFBVSxVQUhJO0FBSWRHLHNCQUFjLGNBSkE7QUFLZEssaUJBQVMsU0FMSztBQU1kQyxjQUFNO0FBTlEsS0FBbEI7QUFRQSxXQUFPMUQsU0FBUDtBQUNILENBMU9nQixFQUFqQjtBQTJPQWIsUUFBUStFLE9BQVIsR0FBa0JsRSxTQUFsQjtBQUNBbUUsT0FBTyxXQUFQLElBQXNCbkUsU0FBdEIsQyIsImZpbGUiOiJMb2FkUXVldWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJMb2FkUXVldWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiTG9hZFF1ZXVlXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmZmYWQxMjU4YTMwNTFhNjU0NWIiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ3JlYXRlZCBieSBjb2ZmZWUgb24gMjAxNi8xMi8xMy5cbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqXG4gKiDoh6rlrprkuYnkuIDkuKrliqDovb3lmahcbiAqIOivtOaYju+8miDkvKDlhaXnmoTml7blgJnkvJrmiafooYzor6Xmlrnms5XvvIzlubbkuJTnrKzkuIDkuKrlj4LmlbDmmK/kuIDkuKpsb2FkZXLlr7nosaHvvIzlr7nov5nkuKrlr7nosaHov5vooYzmt7vliqDln7rmnKznmoTmiJDlip/jgIHlpLHotKXjgIHojrflj5blhoXlrrnnrYnkuovku7ZcbiAqIEBwYXJhbSBsb2FkZXJcbiAqL1xuZnVuY3Rpb24gaW1hZ2VMb2FkZXIobG9hZGVyKSB7XG4gICAgbG9hZGVyLmxvYWQgPSBmdW5jdGlvbiAoc3JjKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5zdWNjZXNzKCk7IH07XG4gICAgICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBfdGhpcy5mYWlsKCk7IH07XG4gICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH07XG59XG52YXIgTG9hZFF1ZXVlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMb2FkUXVldWUoc291cmNlTGlzdCkge1xuICAgICAgICBpZiAoc291cmNlTGlzdCA9PT0gdm9pZCAwKSB7IHNvdXJjZUxpc3QgPSBbXTsgfVxuICAgICAgICB0aGlzLnF1ZXVlTGlzdCA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICog5LqL5Lu25YiX6KGoXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmV2ZW50TGlzdCA9IHtcbiAgICAgICAgICAgIGNvbXBsZXRlOiBbXSxcbiAgICAgICAgICAgIGNvbXBsZXRlT25jZTogW10sXG4gICAgICAgICAgICBwcm9ncmVzczogW10sXG4gICAgICAgICAgICBwcm9ncmVzc09uY2U6IFtdLFxuICAgICAgICAgICAgc3VjY2VzczogW10sXG4gICAgICAgICAgICBmYWlsOiBbXVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxvYWRlckxpc3QgPSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaJgOaciei1hOa6kOaVsOmHj1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbGxDb3VudCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlrozmiJDotYTmupDmlbDph49cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmluaXNoQ291bnQgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICog5oiQ5Yqf5Yqg6L2955qE6LWE5rqQ5pWw6YePXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN1Y2Nlc3NDb3VudCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDliqDovb3lpLHotKXnmoTotYTmupDmlbDph49cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZmFpbENvdW50ID0gMDtcbiAgICAgICAgaWYgKHNvdXJjZUxpc3QubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHRoaXMuYWRkU291cmNlKHNvdXJjZUxpc3QpO1xuICAgICAgICB0aGlzLmFkZExvYWRlcihcImltYWdlXCIsIGltYWdlTG9hZGVyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5qOA57Si5a+56LGh5Zyo5YiX6KGo5Lit55qE5L2N572u77yMIOS4jeWtmOWcqOi/lOWbniAtMVxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICovXG4gICAgTG9hZFF1ZXVlLmZpbmRJbmRleCA9IGZ1bmN0aW9uIChhcnIsIG9iaikge1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgICAgICAgICAgdmFyIGFsbFBhc3MgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaV8xKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqW2lfMV0gIT09IGVsZVtpXzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxQYXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxQYXNzKVxuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgIHJldHVybiAhYWxsUGFzcztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOa3u+WKoOi1hOa6kOWIl+ihqFxuICAgICAqIEBwYXJhbSBzb3VyY2VMaXN0XG4gICAgICog6K+05piO77yaIHNvdXJjZS5pZOS9nOS4uuWIl+ihqOeahOS4u+mUru+8jOWGsueqgeWQjueahOi1hOa6kOaYr+aXoOazlea3u+WKoOWIsOmYn+WIl+eahFxuICAgICAqL1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUuYWRkU291cmNlID0gZnVuY3Rpb24gKHNvdXJjZUxpc3QpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHNvdXJjZUxpc3QgPT09IHZvaWQgMCkgeyBzb3VyY2VMaXN0ID0gW107IH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc291cmNlTGlzdCkpIHtcbiAgICAgICAgICAgIHNvdXJjZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKExvYWRRdWV1ZS5maW5kSW5kZXgoX3RoaXMucXVldWVMaXN0LCB7IGlkOiBzb3VyY2UuaWQgfSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlxcdTY4QzBcXHU2RDRCXFx1NTIzMFxcdTUxQjJcXHU3QTgxXFx1NzY4NGlkOiBcIiArIHNvdXJjZS5pZCArIFwiXFx1RkYwQyBcXHU4RkQ5XFx1NEUyQVxcdThENDRcXHU2RTkwXFx1NkNBMVxcdTY3MDlcXHU4OEFCXFx1NkRGQlxcdTUyQTBcXHU1MjMwXFx1OTYxRlxcdTUyMTdcXHU0RTJEXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3RoaXMucXVldWVMaXN0LnB1c2goc291cmNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hZGRTb3VyY2UoW3NvdXJjZUxpc3RdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOWIoOmZpOaMh+WumuWxnuaAp+eahOi1hOa6kFxuICAgICAqIEBwYXJhbSBzb3VyY2Ug6LWE5rqQ55qE5bGe5oCn77yM5Y+v5Lul5piv5Li76ZSu5oiW6ICF5YW25a6D5bGe5oCn5LiA5Liq5oiW6ICF5aSa5LiqXG4gICAgICovXG4gICAgTG9hZFF1ZXVlLnByb3RvdHlwZS5yZW1vdmVTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IExvYWRRdWV1ZS5maW5kSW5kZXgodGhpcy5xdWV1ZUxpc3QsIHNvdXJjZSk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMucXVldWVMaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDpgJrov4duYW1l5bGe5oCn5Yig6Zmk6LWE5rqQXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKi9cbiAgICBMb2FkUXVldWUucHJvdG90eXBlLnJlbW92ZVNvdXJjZUJ5TmFtZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlU291cmNlKHsgbmFtZTogbmFtZSB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDpgJrov4dpZOWxnuaAp+WIoOmZpOi1hOa6kFxuICAgICAqIEBwYXJhbSBpZFxuICAgICAqL1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUucmVtb3ZlU291cmNlQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB0aGlzLnJlbW92ZVNvdXJjZSh7IGlkOiBpZCB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDmoLnmja7otYTmupDlsZ7mgKfmn6Xor6Llubbov5Tlm57mjIflrprnmoTotYTmupDlr7nosaHvvIzkuI3lrZjlnKjov5Tlm55udWxsXG4gICAgICogQHBhcmFtIHNvdXJjZSDotYTmupDnmoTmn5DkuKrlsZ7mgKdcbiAgICAgKiBAcmV0dXJuIHtTb3VyY2V9XG4gICAgICovXG4gICAgTG9hZFF1ZXVlLnByb3RvdHlwZS5nZXRTb3VyY2UgPSBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IExvYWRRdWV1ZS5maW5kSW5kZXgodGhpcy5xdWV1ZUxpc3QsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyBudWxsIDogdGhpcy5xdWV1ZUxpc3RbaW5kZXhdO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog6YCa6L+HaWTmn6Xor6Llh7rlr7nlupTnmoTotYTmupDlr7nosaHvvIzkuI3lrZjlnKjliJnov5Tlm55udWxsXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQHJldHVybiB7U291cmNlfVxuICAgICAqL1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUuZ2V0U291cmNlQnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgaW5kZXggPSBMb2FkUXVldWUuZmluZEluZGV4KHRoaXMucXVldWVMaXN0LCB7IGlkOiBpZCB9KTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IG51bGwgOiB0aGlzLnF1ZXVlTGlzdFtpbmRleF07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiDpgJrov4duYW1l5bGe5oCn5p+l6K+i5Ye65a+55bqU55qE5a+56LGh77yM5LiN5a2Y5Zyo5YiZ6L+U5ZuebnVsbFxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHJldHVybiB7U291cmNlfVxuICAgICAqL1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUuZ2V0U291cmNlQnlOYW1lID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gTG9hZFF1ZXVlLmZpbmRJbmRleCh0aGlzLnF1ZXVlTGlzdCwgeyBuYW1lOiBuYW1lIH0pO1xuICAgICAgICByZXR1cm4gaW5kZXggPT09IC0xID8gbnVsbCA6IHRoaXMucXVldWVMaXN0W2luZGV4XTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOmAmui/h+i1hOa6kOWxnuaAp+i/lOWbnkhUTUzmoIfnrb7vvIzkvovlpoLvvJo8aW1nIC8+XG4gICAgICogQHBhcmFtIHNvdXJjZVxuICAgICAqL1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gTG9hZFF1ZXVlLmZpbmRJbmRleCh0aGlzLnF1ZXVlTGlzdCwgc291cmNlKTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSAtMSA/IG51bGwgOiB0aGlzLnF1ZXVlTGlzdFtpbmRleF0uZWxlbWVudDtcbiAgICB9O1xuICAgIExvYWRRdWV1ZS5wcm90b3R5cGUuZ2V0Q29udGVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gTG9hZFF1ZXVlLmZpbmRJbmRleCh0aGlzLnF1ZXVlTGlzdCwgeyBpZDogaWQgfSk7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyBudWxsIDogdGhpcy5xdWV1ZUxpc3RbaW5kZXhdLmVsZW1lbnQ7XG4gICAgfTtcbiAgICBMb2FkUXVldWUucHJvdG90eXBlLmdldENvbnRlbnRCeU5hbWUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBMb2FkUXVldWUuZmluZEluZGV4KHRoaXMucXVldWVMaXN0LCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gLTEgPyBudWxsIDogdGhpcy5xdWV1ZUxpc3RbaW5kZXhdLmVsZW1lbnQ7XG4gICAgfTtcbiAgICBMb2FkUXVldWUucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFsbENvdW50ID0gdGhpcy5xdWV1ZUxpc3QubGVuZ3RoO1xuICAgICAgICB0aGlzLmZpbmlzaENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5zdWNjZXNzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmZhaWxDb3VudCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDlhajpg6jotYTmupDliqDovb1va++8jOinpuWPkeWvueW6lOS6i+S7tu+8jOW5tuS4lOenu+mZpOS4gOasoeaAp+S6i+S7tijlrozmiJDjgIHov5vooYzkuK0pXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY2hlY2tGaW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuZmluaXNoQ291bnQgPT09IF90aGlzLmFsbENvdW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRMaXN0W0xvYWRRdWV1ZS5FdmVudC5Qcm9ncmVzc10uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRGbikgeyByZXR1cm4gZXZlbnRGbi5jYWxsKF90aGlzLCBfdGhpcy5hbGxDb3VudCwgX3RoaXMuZmluaXNoQ291bnQsIF90aGlzLnN1Y2Nlc3NDb3VudCwgX3RoaXMuZmFpbENvdW50KTsgfSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRMaXN0W0xvYWRRdWV1ZS5FdmVudC5Qcm9ncmVzc09uY2VdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50Rm4pIHsgcmV0dXJuIGV2ZW50Rm4uY2FsbChfdGhpcywgX3RoaXMuYWxsQ291bnQsIF90aGlzLmZpbmlzaENvdW50LCBfdGhpcy5zdWNjZXNzQ291bnQsIF90aGlzLmZhaWxDb3VudCk7IH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50TGlzdFtMb2FkUXVldWUuRXZlbnQuQ29tcGxldGVdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50Rm4pIHsgcmV0dXJuIGV2ZW50Rm4uY2FsbChfdGhpcyk7IH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50TGlzdFtMb2FkUXVldWUuRXZlbnQuQ29tcGxldGVPbmNlXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZuKSB7IHJldHVybiBldmVudEZuLmNhbGwoX3RoaXMpOyB9KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5ldmVudExpc3RbTG9hZFF1ZXVlLkV2ZW50LkNvbXBsZXRlT25jZV0ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICBfdGhpcy5ldmVudExpc3RbTG9hZFF1ZXVlLkV2ZW50LlByb2dyZXNzT25jZV0ubGVuZ3RoID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50TGlzdFtMb2FkUXVldWUuRXZlbnQuUHJvZ3Jlc3NdLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50Rm4pIHsgcmV0dXJuIGV2ZW50Rm4uY2FsbChfdGhpcywgX3RoaXMuYWxsQ291bnQsIF90aGlzLmZpbmlzaENvdW50LCBfdGhpcy5zdWNjZXNzQ291bnQsIF90aGlzLmZhaWxDb3VudCk7IH0pO1xuICAgICAgICAgICAgICAgIF90aGlzLmV2ZW50TGlzdFtMb2FkUXVldWUuRXZlbnQuUHJvZ3Jlc3NPbmNlXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZuKSB7IHJldHVybiBldmVudEZuLmNhbGwoX3RoaXMsIF90aGlzLmFsbENvdW50LCBfdGhpcy5maW5pc2hDb3VudCwgX3RoaXMuc3VjY2Vzc0NvdW50LCBfdGhpcy5mYWlsQ291bnQpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5xdWV1ZUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmZpbmlzaENvdW50Kys7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3VjY2Vzc0NvdW50Kys7XG4gICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRMaXN0W0xvYWRRdWV1ZS5FdmVudC5TdWNjZXNzXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZuKSB7IHJldHVybiBldmVudEZuLmNhbGwoX3RoaXMsIHNvdXJjZSk7IH0pO1xuICAgICAgICAgICAgICAgIHNvdXJjZS5lbGVtZW50ID0gaW1hZ2U7XG4gICAgICAgICAgICAgICAgY2hlY2tGaW5pc2goKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpbWFnZS5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmZhaWxDb3VudCsrO1xuICAgICAgICAgICAgICAgIGNoZWNrRmluaXNoKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZXZlbnRMaXN0W0xvYWRRdWV1ZS5FdmVudC5GYWlsXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEZuKSB7IHJldHVybiBldmVudEZuLmNhbGwoX3RoaXMsIHNvdXJjZSk7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHNvdXJjZS5zcmM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIOebkeWQrOS6i+S7tlxuICAgICAqIEBwYXJhbSBldmVudE5hbWUg5LqL5Lu25ZCN56ew77yM5Y+v5Lul6K6/6ZeuTG9hZFF1ZXVlLkV2ZW506L+Z5Liq6Z2Z5oCB5bGe5oCn5p2l6I635b6XXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICovXG4gICAgTG9hZFF1ZXVlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0W2V2ZW50TmFtZV0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICog5aKe5Yqg5LiA5Liq57G75Z6L5Yqg6L295Zmo44CC5aaC6Z+z6aKR5Yqg6L295ZmoXG4gICAgICog6K+05piO77ya5Yqg6L295Zmo5ZCN5a2X5aSn5bCP5YaZ5LiN5pWP5oSf77yM5YWo6YOo6YO95Lya6L2s5o2i5Li65bCP5YaZ44CCXG4gICAgICogQHBhcmFtIGxvYWRlck5hbWVcbiAgICAgKiBAcGFyYW0gbG9hZGVyRm5cbiAgICAgKiBAcGFyYW0gb3ZlcnJpZGUg5piv5ZCm6KaG55uW5LmL5YmN55qE5Yqg6L295ZmoXG4gICAgICovXG4gICAgTG9hZFF1ZXVlLnByb3RvdHlwZS5hZGRMb2FkZXIgPSBmdW5jdGlvbiAobG9hZGVyTmFtZSwgbG9hZGVyRm4sIG92ZXJyaWRlKSB7XG4gICAgICAgIGlmIChvdmVycmlkZSA9PT0gdm9pZCAwKSB7IG92ZXJyaWRlID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIGxvYWRlciA9IHt9O1xuICAgICAgICBsb2FkZXJOYW1lID0gbG9hZGVyTmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsb2FkZXJGbihsb2FkZXIpO1xuICAgICAgICBpZiAoIXRoaXMubG9hZGVyTGlzdFtsb2FkZXJOYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkZXJMaXN0W2xvYWRlck5hbWVdID0gbG9hZGVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFvdmVycmlkZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlxcdTY4QzBcXHU2RDRCXFx1NTIzMFxcXCJcIiArIGxvYWRlck5hbWUgKyBcIlxcXCJcXHU1MkEwXFx1OEY3RFxcdTU2NjhcXHU1REYyXFx1N0VDRlxcdTVCNThcXHU1NzI4XFx1RkYwQ1xcdTU5ODJcXHU2NzlDXFx1OTcwMFxcdTg5ODFcXHU4QkY3XFx1NEYyMFxcdTUxNjVvdmVycmlkZXJcXHU1M0MyXFx1NjU3MFxcdTRFM0F0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkZXJMaXN0W2xvYWRlck5hbWVdID0gbG9hZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBMb2FkUXVldWUuRXZlbnQgPSB7XG4gICAgICAgIENvbXBsZXRlOiBcImNvbXBsZXRlXCIsXG4gICAgICAgIENvbXBsZXRlT25jZTogXCJjb21wbGV0ZU9uY2VcIixcbiAgICAgICAgUHJvZ3Jlc3M6IFwicHJvZ3Jlc3NcIixcbiAgICAgICAgUHJvZ3Jlc3NPbmNlOiBcInByb2dyZXNzT25jZVwiLFxuICAgICAgICBTdWNjZXNzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgRmFpbDogXCJmYWlsXCJcbiAgICB9O1xuICAgIHJldHVybiBMb2FkUXVldWU7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gTG9hZFF1ZXVlO1xud2luZG93W1wiTG9hZFF1ZXVlXCJdID0gTG9hZFF1ZXVlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0xvYWRRdWV1ZS9Mb2FkUXVldWUudHMiXSwic291cmNlUm9vdCI6IiJ9