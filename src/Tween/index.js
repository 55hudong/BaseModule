import Utils from  "../libs/Utils";
import cssPlugin from "./plugins/cssPlugin";

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）； 说明： 假设 y 从 100 - 1000, 变化量应该是900
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
 */
let TweenType = {
    Linear: function(t, b, c, d) { return c*t/d + b; },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
            return c / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t*t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(t, b, c, d) {
            return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
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
        easeOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == "undefined") p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p/(2*Math.PI) * Math.asin(c/a);
            }
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
        },
        easeInOut: function(t, b, c, d, a, p) {
            var s;
            if (t==0) return b;
            if ((t /= d / 2) == 2) return b+c;
            if (typeof p == "undefined") p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2  *Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function(t, b, c, d, s) {
            if (typeof s == "undefined") s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t, b, c, d) {
            return c - TweenType.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            } else if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
            }
        },
        easeInOut: function(t, b, c, d) {
            if (t < d / 2) {
                return TweenType.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return TweenType.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

class Tween{

    _startTime:number;

    /**
     * 缓动动画已经运行时间
     * 说明： 通过不断累积每一帧所花费的时间
     */
    _runningTime:number;

    /**
     * 哪个插件支持该目标
     */
    _pluginIndex:number;

    /**
     * 缓动动画执行时候的帧率，在缓动停止的时候会设置成0
     */
    fps:number;

    constructor(target:any, fromProps:any, toProps:any, duration:number, ease:TweenType){

        this._events = {
            onUpdate: null,
            onComplete: null
        };

        // 这里两者都是同时拷贝，而不改变其自身属性，因为css样式以后需要引入额外插件来支持，现阶段只能在onUpdate事件里面手动维护
        this.fromProps = Utils.clone(fromProps);
        this._fromPropsOrigin = Utils.clone(fromProps);
        this.toProps = toProps;
        this.ease = ease;
        this.duration = duration;

        this._running = false;

        Tween.plugins.forEach((plugin, index) => {
            if(plugin.isSupport(target)){
                this._pluginIndex = index;
            }
        });

        if(!Utils.isUndefined(this._pluginIndex)){
            console.info("命中了插件：" + Tween.plugins[this._pluginIndex].name);
        }


    }

    onUpdate(callback:Function):this{
        this._events.onUpdate = callback;
        return this;
    }

    onComplete(callback:Function):this{
        this._events.onComplete = callback;
        return this;
    }

    /**
     * 开始动画
     * 说明： stop()之后的动画会重新开始
     * @return {Tween}
     */
    start():this{
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
    stop():this{
        this._running = false;
        this._startTime = null;
        this.fps = 0;
        return this;
    }

    /**
     * 上一帧的时间
     */
    _lastTime:number;

    _update(now){

        // 初始化开始时间
        if(Utils.isUndefined(this._lastTime)){
            this._lastTime = now;
            requestAnimationFrame(this._update.bind(this));
            return false;
        }

        this.fps = 1000/(now - this._lastTime);

        this._runningTime += now - this._lastTime;

        if(this._runningTime >= this.duration){
            this.stop();
            this._fixedInEnd();
            this._events.onComplete && this._events.onComplete.call(this.fromProps);
        }

        this._events.onUpdate && this._events.onUpdate.call(this.fromProps);

        // 计算需要缓动的属性和对应值
        Object.keys(this.toProps).forEach((prop) => {

            this.fromProps[prop] = this.ease(this._runningTime, this._fromPropsOrigin[prop], this.toProps[prop] - this._fromPropsOrigin[prop], this.duration);

        });

        if(this._running){
            this._lastTime = now;
            requestAnimationFrame(this._update.bind(this));
        }
    }

    /**
     * 将缓动属性对齐
     * 说明： 因为结束时间几乎不可能卡在结束的那一毫秒，所以结束后需要手动将误差对齐
     * @private
     */
    _fixedInEnd(){
        Object.keys(this.toProps).forEach((prop) => {
            this.fromProps[prop] = this.toProps[prop];
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
    static to(target:any , toProps:any, duration:number, ease:TweenType = Tween.Ease.Linear, callback?:Function): Tween{

        // 构建一个fromProps，重新生成一个Tween对象
        let fromProps = {};
        for(let i in toProps){
            if(toProps.hasOwnProperty(i)) fromProps[i] = target[i];
        }

        let tween = new Tween(target, fromProps, toProps, duration, ease);

        if(callback){
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
    static fromTo(target:any, fromProps:any, toProps:any, duration:number, ease:TweenType = Tween.Ease.Linear, callback?:Function): Tween{

        let tween = new Tween(target, fromProps, toProps, duration, ease);

        if(callback){
            tween.onComplete(callback);
        }

        return tween;
    }

}

// 设置为静态属性
Tween.Ease = TweenType;

Tween.plugins = [
    cssPlugin
];

const tester = {

    player: document.createElement("div"),

    init(){
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

window.t = Tween.to({x: 0, y:0}, {x: window.innerWidth - 30, y: window.innerHeight - 30}, 2000, Tween.Ease.Cubic.easeInOut)
    .onUpdate(function () {
        console.log(this.x, this.y);
        tester.player.style.top = `${this.y}px`;
        tester.player.style.left = `${this.x}px`;
    })
    .onComplete(function () {
        console.info("I'm finish");
    });


export default Tween;