/**
 * Created by coffee on 02/03/2017.
 */

class Utils{

    static isObject(target):boolean {
        return typeof target === "object";
    }

    static isNumber(target):boolean {
        return typeof target === "number";
    }

    static isFunction(target):boolean {
        return typeof target === "function";
    }

    static isUndefined(target):boolean {
        return typeof target === "undefined";
    }

    static isArray(target):boolean {
        return Array.isArray(target);
    }

    static isNull(target):boolean{
        return target === null;
    }

    static isLikeArray(target):boolean {
        return Utils.isArray(target) && Utils.isNumber(target.length);
    }

    /**
     * 对数组、伪数组、对象属性列表进行遍历
     * @param target
     * @param callback
     * @return {boolean}
     */
    static each(target, callback){
        if(!Utils.isFunction(callback)) return false;

        if(Utils.isArray(target) || Utils.isLikeArray(target)){
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
    static _cloneArray(targetArray: any[]){

        let newArray:any[] = [];

        targetArray.forEach((ele, index) => {
            switch (typeof ele){
                case "number":
                case "undefined":
                case "string":
                case "boolean":
                    newArray[index] = ele;
                    break;

                case "object":
                    if(Utils.isNull(ele)){
                        newArray[index] = null;
                    }else if(Utils.isArray(ele)){
                        newArray[index] = Utils.cloneArray(ele);
                    }else {
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
    static clone(target: any|any[]){

        if(Utils.isArray(target)){
            return Utils._cloneArray(target);
        }

        let newTarget = {};

        Object.keys(target).forEach(prop => {

            switch (typeof target[prop]){

                case "number":
                case "undefined":
                case "string":
                case "boolean":
                    newTarget[prop] = target[prop];
                    break;

                case "object":
                    if(Utils.isNull(target[prop])){
                        newTarget[prop] = null;
                    }else{
                        newTarget[prop] = Utils.clone(target[prop]);
                    }
            }
        });

        return Object.keys(newTarget).length > 0 ? newTarget : target;
    }

}


export default Utils;

