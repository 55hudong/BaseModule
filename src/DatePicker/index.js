/**
 * Created by coffee on 23/02/2017.
 */

import $ from "webpack-zepto";
import Scroll from "./scroll";

import Tween from "../Tween/index";

import htmlStr from "./datePicker.html";
import "./datePicker.scss";

window.$ = $;

class DatePicker{

    constructor(){

        document.body.insertAdjacentHTML("beforeEnd", htmlStr);

        $(".ff-picker-scroll").each((i, e) => {

            window["s" + i] = new Scroll({
                el: e
            });
        });

    }

    /**
     * 重新设置开始日期
     */
    setStartDate(){

    }

    /**
     * 重新设置结束日期
     */
    setEndDate(){

    }

    show(){

    }

    hide(){

    }

    /**
     * 渲染日期的HTML结构
     * @private
     */
    _render(){

    }

}


module.exports = DatePicker;