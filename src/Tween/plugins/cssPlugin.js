/**
 * CSS元素的缓动组件
 * Created by coffee on 07/03/2017.
 *
 * 支持缓动的属性
 * - 已支持： width, height, top, left, right, bottom, margin, padding
 * - 待支持： transform, color, opacity
 */


const cssPlugin = {

    name: "cssPlugin",

    version: "0.0.1",

    /**
     * 该插件能否支持目标对象
     * @param target
     */
    isSupport(target:HTMLElement){
        return target instanceof HTMLElement;
    },

    // 支持的属性
    _supportList: [
        "left", "right", "top", "bottom",
        "width", "height",
        "margin", "margin-left", "margin-right", "margin-top", "margin-bottom",
        "padding", "padding-left", "padding-right", "padding-top", "padding-bottom"
    ],

    // 可以合并的属性，设计到后续的解析的拆分
    _supportMergeList: [
        "margin", "padding"
    ],

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

    _update(htmlEleTarget){

    },

    /**
     * 读取HTML元素上style属性的值，解析成可以读取的对象
     * @private
     */
    _parse(){

    },

    /**
     *
     * @return {{}}
     * @private
     */
    _parseProps(props: any){
        let styleDict = {};

        return styleDict;
    }

};


export default cssPlugin;