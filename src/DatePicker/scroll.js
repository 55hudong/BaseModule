/**
 * Created by coffee on 28/02/2017.
 */

import $ from "webpack-zepto";

export default class Scroll{

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

        this._scrollY(0);

        this._init();
    }

    _init(){

        this.scrollWrapper.height(this.defaults.itemHeight*5);
        this.scrollListItem.eq(0).addClass("active").siblings().removeClass("active");


        let startY: number  = 0,
            endY: number    = 0,
            originY: number = 0;

        this.scrollList.on("touchstart", (event: TouchEvent) => {

            startY = event.changedTouches[0].pageY;

            originY = this._getOriginY();

            console.log(`event type: ${event.type}.`);

        }).on("touchmove", (event: TouchEvent) => {
            event.preventDefault();

            console.log(`event type: ${event.type}.`);

            endY = event.changedTouches[0].pageY;

            this._scrollY(endY - startY + originY);

        }).on("touchend", (event) => {

            console.log(`event type: ${event.type}.`);

        });
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

        this.scrollList.css({
            transform      : `translate3d(0, ${ y + this.defaults.itemHeight * 2}px, 0)`,
            webkitTransform: `translate3d(0, ${ y + this.defaults.itemHeight * 2}px, 0)`
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
