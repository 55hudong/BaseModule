/**
 * Created by coffee on 20/01/2017.
 */

type Path = string|RegExp;

// 默认值为： after
// before: 跳转之前触发，可以打断跳转； after: 跳转成功之后触发
type TriggerType = "before" | "after";
type Callbacks = {
    pathName: string|RegExp, // 跳转地址
    callback: Function[], // 回调函数列表
};
type StrCallbacks = Callbacks & {
    pathName: string,
};
type RegCallbacks = Callbacks & {
    pathName: RegExp
}

function findIndex(array, predicate, fromIndex = 0){

    var index = -1;

    array = array.concat().splice(fromIndex);

    array.forEach(function(obj, index2){

        var _bool = true;

        if(typeof predicate === "object"){

            for(let i in predicate){
                if(predicate[i] !== obj[i]){
                    return false;
                }
            }
        }else if(typeof predicate === "function"){
            throw new Error("抱歉， 暂不支持传入function类型");
        }else{
            throw new Error("第二个参数是未知类型");
        }

        if(_bool){
            index = index2;
            return false;
        }

    });

    return index;
}

export default class Route{

    /**
     * 字符串匹配路径的回调对象
     * key: 匹配路径
     * value: 回调列表
     */
    strCallbacks: StrCallbacks[] = [];

    /**
     * 正则匹配路径的回调列表
     */
    regCallbacks: RegCallbacks[] = [];

    /**
     * 匹配任何路径的回调列表
     */
    allCallbacks: Function[] = [];

    beforeStrCallbacks: StrCallbacks[] = [];
    beforeRegCallbacks: RegCallbacks[] = [];
    beforeAllCallbacks: Function[] = [];

    /**
     * url里面的hash值
     */
    _hash: string;

    /**
     * 默认路由值
     */
    defaultHash: string;

    constructor(){

        window.addEventListener("hashchange", (event:HashChangeEvent) => {
            this.hash = location.hash.replace("#", "");
            this.triggerEvent(event);
        });

        window.addEventListener("popstate", (event:PopStateEvent) => {
            // console.log(event.state);
        });

        //触发默认事件
        setTimeout(() => {
            if (location.hash.replace("#", "").length > 0) {
                let event = document.createEvent("HashChangeEvent");
                event.initEvent("hashchange", false, false);
                window.dispatchEvent(event);
            }else{
                if(this.defaultHash){
                    location.hash = this.defaultHash;
                }
            }
        }, 0);

    }

    set hash(val){
        this._hash = val;
        window.location.hash = val;
    }

    get hash(){
        return this._hash;
    }

    /**
     *
     * @param path
     * @return {Promise}
     */
    setPath(path){
        return new Promise((resolve, reject) => {

        })
    }

    getPath(){
        return this._hash;
    }


    /**
     * 在路由发生改变的时候总是会被触发
     * @param callback {function}
     */
    all(callback:Function){
        if(typeof callback === "function"){
            this.allCallbacks.push(callback);
        }
        return this;
    }

    /**
     * 当匹配到对应的路径的时候触发回调
     * @param pathName 一个或者多个路径
     * @param callback {function}
     * @param trigger
     */
    on(pathName: Path|Path[], callback:Function, trigger:TriggerType = "after"){

        if(Array.isArray(pathName)){
            for(let path of pathName){
                this.on(path, callback);
            }
            return this;
        }

        if(typeof pathName === "string"){

            if(trigger === "after"){

                let index = findIndex(this.strCallbacks, {pathName});
                if(index !== -1){
                    this.strCallbacks[index].callback.push(callback);
                }else{
                    this.strCallbacks.push({
                        pathName,
                        callback: [callback]
                    });
                }

            }else if(trigger === "before"){

                let index = findIndex(this.beforeStrCallbacks, {pathName});
                if(index !== -1){
                    this.beforeStrCallbacks[index].callback.push(callback);
                }else{
                    this.beforeStrCallbacks.push({
                        pathName,
                        callback: [callback]
                    });
                }

            }else{
                throw new Error("未知的触发类型");
            }

        }else if(pathName instanceof RegExp){

            if(trigger === "after"){
                let index = findIndex(this.regCallbacks, {pathName: pathName.toString()});
                if(index === -1){
                    this.regCallbacks.push({
                        pathName,
                        callback: [callback]
                    });
                }else{
                    this.regCallbacks[index].callback.push(callback);
                }
            }else if(trigger === "before"){
                let index = findIndex(this.beforeRegCallbacks, {pathName: pathName.toString()});
                if(index === -1){
                    this.beforeRegCallbacks.push({
                        pathName,
                        callback: [callback]
                    });
                }else{
                    this.beforeStrCallbacks[index].callback.push(callback);
                }
            }else{
                throw new Error("未知的触发类型");
            }

        }else{
            console.warn(`非法的路径类型:`, pathName);
        }

        return this;
    }

    /**
     * 关闭指定路径的回调，如果不写回调方法则撤销改路径下的全部值
     * @param pathName
     * @param callback
     * @param trigger
     * @returns {Route}
     */
    off(pathName: Path|Path[], callback:Function, trigger:TriggerType = "after"){

        if(Array.isArray(pathName)){
            for(let path of pathName){
                this.off(path, callback);
            }
            return this;
        }

        if(typeof pathName === "string"){

            if(trigger === "after"){
                let index = findIndex(this.strCallbacks, {pathName: pathName.toString()});
                if(index !== -1){
                    if(!callback){
                        this.strCallbacks[index].callback.length = 0;
                    }else{
                        this.strCallbacks[index].callback = this.strCallbacks[index].callback.filter(fn => fn !== callback);
                    }
                }
            }else if(trigger === "before"){
                let index = findIndex(this.beforeStrCallbacks, {pathName: pathName.toString()});
                if(index !== -1){
                    if(!callback){
                        this.beforeStrCallbacks[index].callback.length = 0;
                    }else{
                        this.beforeRegCallbacks[index].callback = this.beforeStrCallbacks[index].callback.filter(fn => fn !== callback);
                    }
                }
            }

        }else if(pathName instanceof RegExp){

            if(trigger === "after"){
                let index = findIndex(
                    this.regCallbacks.map(obj => {
                        return {
                            pathName: obj.pathName.toString(),
                            callback: obj.callback
                        };
                    }),
                    {pathName: pathName.toString()}
                );

                if(index !== -1){
                    if(!callback){
                        this.regCallbacks[index].callback.length = 0;
                    }else{
                        this.regCallbacks[index].callback = this.regCallbacks[index].callback.filter(fn => fn !== callback);
                    }
                }
            }else if(trigger === "before"){
                let index = findIndex(
                    this.beforeRegCallbacks.map(obj => {
                        return {
                            pathName: obj.pathName.toString(),
                            callback: obj.callback
                        };
                    }),
                    {pathName: pathName.toString()}
                );

                if(index !== -1){
                    if(!callback){
                        this.beforeRegCallbacks[index].callback.length = 0;
                    }else{
                        this.beforeRegCallbacks[index].callback = this.beforeRegCallbacks[index].callback.filter(fn => fn !== callback);
                    }
                }
            }else{
                throw new Error("未知的触发类型");
            }



        }

        return this;
    }

    protected triggerEvent(event:HashChangeEvent){

        // 总是需要被触发的事件
        for(let fn of this.allCallbacks){
            fn.call(this, event);
        }

        // 判断字符串匹配的事件
        let strIndex = findIndex(this.strCallbacks, {pathName: this.hash});
        if(strIndex !== -1){
            for(let fn of this.strCallbacks[strIndex].callback){
                fn.call(this, event);
            }
        }

        // 判断正则匹配的事件
        for(let obj of this.regCallbacks){
            if(obj.pathName.test(this.hash)){
                for(let fn of obj.callback){
                    fn.call(this, event);
                }
            }
        }

    }

    /**
     * 设置路由的默认值
     * ps: 当路由值为空时执行
     */
    setDefault(value: string){
        this.defaultHash = value;
        return this;
    }

}
