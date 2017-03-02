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

    static isLikeArray(target):boolean {
        return Utils.isArray(target) && Utils.isNumber(target.length);
    }

    static each(target, callback){
        if(!Utils.isFunction(callback)) return false;

        if(Utils.isArray(target) || Utils.isLikeArray(target)){
            Array.prototype.forEach.call(target, callback);
        }else if(Utils.isObject(target)){
            let n = 0;
            for(let i in target){

            }
        }


    }

}

export function each(target, callback) {

}


export default Utils;

