/**
 * Created by coffee on 23/02/2017.
 */

import htmlStr from "./datePicker.html";
import "./datePicker.scss"

console.log(htmlStr);

class DatePicker{

    constructor(){

        document.body.insertAdjacentHTML("beforeEnd", htmlStr);

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


window["DatePicker"] = DatePicker;