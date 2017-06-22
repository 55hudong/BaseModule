/**
 * Created by coffee on 28/02/2017.
 */

import $ from "webpack-zepto";
import Tween from "../Tween/index";

export default class Scroll{

    /**
     * 滑动停止的时候，滚动元素在最后0.2s附带的速度
     */
    speedX:number;
    speedY:number;

    tween:Tween;

    constructor(options = {}){

        let defaults = this.defaults = $.extend({

            el: null, // 需要设置滚动的父级元素，需要为dom原生对象

            onChange: null, // 列表选中改变后发生的回调

            items     : [], // 列表项， 会自动生成HTML结构添加到父级元素
            itemHeight: 0, // 每个item的高度，自动生成

            offset      : 2, // 在顶部加入偏移量，让第一个选择在中间。
            offsetHeight: 0, // 动态计算需要偏移的高度

            showCount: 5, // 最多显示几个，超出的会被隐藏

        }, options);

        /**
         * 滚动组件的父级元素
         */
        this.scrollWrapper = $(defaults.el);

        /**
         * 列表选项，由它负责位移
         */
        this.scrollList = this.scrollWrapper.find(".ff-picker-list");
        this.scrollListItem = this.scrollList.find(".ff-picker-item");

        this.defaults.itemHeight   = this.scrollListItem.height();
        this.defaults.offsetHeight = this.defaults.itemHeight * 2;

        this.defaults.maxTop = this.defaults.offsetHeight;
        this.defaults.minTop = this.scrollList.height() - this.defaults.offsetHeight - this.defaults.itemHeight;

        console.log(this.defaults.maxTop, this.defaults.minTop);

        this._scrollY(0);

        this._init();
    }

    _init(){
        let _this = this;

        this.scrollWrapper.height(this.defaults.itemHeight*5);
        this.scrollListItem.eq(0).addClass("active").siblings().removeClass("active");

        let startY: number  = 0,
            endY: number    = 0,
            originY: number = 0;

        /**
         * 运动速度计算思路：
         * 记录上一帧的触发时间和距离，和当前进行对比得出速度。
         */
        let speedRecord = {

            _prevTime: null, // 上一次计算位置的时间，一般来说每隔0.2s就会刷新一次
            _prevY: null, // 上一个计算时间单位中的位置。 用来计算最后0.2s的速度

            _running: false,

            _speed: {
                x: 0,
                y: 0
            },

            /**
             * 开始记录每帧中的速度
             */
            start(){

                this._running = true;

                let lastTime:number,
                    lastY:number;

                let go = (now:number) => {

                    if(!lastTime){
                        lastTime = now;
                        lastY = endY;
                    }

                    let interval = now - lastTime;

                    this._speed.y = (lastY - endY)/(interval/1000);

                    lastTime = now;
                    lastY = endY;
                    if(this._running){
                        window.requestAnimationFrame(go);
                    }

                };

                window.requestAnimationFrame(go);
            },

            stop(){
                this._running = false;
            },

            /**
             * 返回一个对象，包含着x轴的速度和y轴的速度
             * @return {{x: number, y: number}}
             */
            getSpeed(){
                return this._speed;
            }
        };

        this.scrollList.on("touchstart", (event: TouchEvent) => {

            startY = endY = event.changedTouches[0].pageY;

            originY = this._getOriginY();

            console.log(`event type: ${event.type}.`);

            speedRecord.start();

        }).on("touchmove", (event: TouchEvent) => {
            event.preventDefault();

            console.log(`event type: ${event.type}.`);

            endY = event.changedTouches[0].pageY;

            this._scrollY(endY - startY + originY);

        }).on("touchend", (event) => {
            speedRecord.stop();

            console.log(`event type: ${event.type}.`);

            console.log(`speed: ${speedRecord.getSpeed().y}px/s`);

            this._startInertia(speedRecord.getSpeed());

        });
    }

    /**
     * 对滚动元素执行惯性动画
     * @private
     */
    _startInertia(speed){

        let _this = this;

        let y = this._getOriginY();

        this.tween = Tween.to({speed: speed.y}, {speed: 0}, 500);

        this.tween.onUpdate(function () {

            console.log(this.speed);

            _this._scrollY(_this._getOriginY() + -this.speed*_this.tween.fps/1000*0.5);


        }).onComplete(function () {
        });

        this.tween.start();
    }

    _stopInertia(){

    }

    /**
     * 计算当前命中的列表项
     * 说明：以可视区域的下边框为界, 命中的选项高出自身一半，便视为命中
     * 取值范围： start: 0, end: items.length-1
     * @private
     */
    _getCurrentIndex():number{

        let y:number = this._getOriginY() - this.defaults.itemHeight;

        let index:number = Math.round(y/this.defaults.itemHeight);

        //console.log(y%this.defaults.itemHeight);

        return -(index + 1);

    }

    _scrollY(y: number = 0){

        if(y > this.defaults.maxTop - this.defaults.offsetHeight){
            return;
        }

        if(y < this.defaults.minTop - this.defaults.offsetHeight){
            return;
        }

        this.scrollList.css({
            transform      : `translate3d(0, ${ y + this.defaults.offsetHeight}px, 0)`,
            webkitTransform: `translate3d(0, ${ y + this.defaults.offsetHeight}px, 0)`
        });

    }

    /**
     * 获取元素已经滚动的位置
     * @return {*}
     * @private
     */
    _getOriginY():number{

        // 通过正则将style属性里面的transform3d的y轴值提取出来。例如：translate3d(0px, 50px, 0px)
        let y:number = /\(.+,\s?([.0-9-]+)(px|rem)?,\s*?[.0-9-]+(px|rem)?\)/.exec(this.scrollList.css("transform"))[1];
        y = parseFloat(y);

        return y ? y - this.defaults.offsetHeight : null;
    }

}
