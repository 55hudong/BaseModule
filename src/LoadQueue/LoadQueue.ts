/**
 * Created by coffee on 2016/12/13.
 */

type Source = {
    /**
     * 资源的表示符，就像数据库的主键，不允许冲突
     */
    id: number|string,

    /**
     * 命名之后方便资源进行检索，如果名称有重复，查询时候只会返回第一个符合条件的值
     */
    name?: string,

    /**
     * 资源的地址
     */
    src: string,

    /**
     * @private
     * 加载完成后会保存一个HTMLElement元素，可能是 img, audio, video等
     */
    element?: HTMLElement,

    /**
     * @private
     * 是否已经加载成功，加载失败仍然会标记为false，等待下次加载
     */
    loaded?: boolean
};

type loaderType = {
    load?: Function,
    success?: Function,
    fail?: Function,
    get?: Function,
    getContent?: Function
}


/**
 * 自定义一个加载器
 * 说明： 传入的时候会执行该方法，并且第一个参数是一个loader对象，对这个对象进行添加基本的成功、失败、获取内容等事件
 * @param loader
 */
function imageLoader(loader:loaderType){

    loader.load = function (src) {
        let image = new Image();
        image.onload = () => this.success();
        image.onerror = () => this.fail();
        image.src = src;

        return image;
    };

}


export default class LoadQueue{

    private queueList:Source[] = [];

    /**
     * 事件列表
     */
    private eventList = {
        complete: [],
        completeOnce: [],
        progress: [],
        progressOnce: [],
        success: [],
        fail: []
    };

    static Event = {
        Complete: "complete",
        CompleteOnce: "completeOnce",
        Progress: "progress",
        ProgressOnce: "progressOnce",
        Success: "success",
        Fail: "fail"
    };

    private loaderList = {};

    constructor(sourceList:Source[] = []){

        if(sourceList.length > 0) this.addSource(sourceList);

        this.addLoader("image", imageLoader);

    }

    /**
     * 检索对象在列表中的位置， 不存在返回 -1
     * @param arr
     * @param obj
     */
    static findIndex(arr: any[], obj){

        let index = -1;

        arr.forEach((ele, i) => {
            let allPass = true;

            for(let i in obj){
                if(obj.hasOwnProperty(i)){
                    if(obj[i] !== ele[i]){
                        allPass = false;
                        break;
                    }
                }
            }

            if(allPass) index = i;

            return !allPass;
        });

        return index;
    }

    /**
     * 添加资源列表
     * @param sourceList
     * 说明： source.id作为列表的主键，冲突后的资源是无法添加到队列的
     */
    addSource(sourceList:Source[] = []): this{
        sourceList.forEach((source:Source) => {

            if(LoadQueue.findIndex(this.queueList, {id: source.id}) !== -1){
                console.warn(`检测到冲突的id: ${source.id}， 这个资源没有被添加到队列中`);
                return true;
            }

            this.queueList.push(source);

        });
        return this;
    }

    /**
     * 删除指定属性的资源
     * @param source 资源的属性，可以是主键或者其它属性一个或者多个
     */
    removeSource(source): this{
        let index = LoadQueue.findIndex(this.queueList, source);
        if(index !== -1){
            this.queueList.splice(index, 1);
        }
        return this;
    }

    /**
     * 通过name属性删除资源
     * @param name
     */
    removeSourceByName(name:string): this{
        this.removeSource({name});
        return this;
    }

    /**
     * 通过id属性删除资源
     * @param id
     */
    removeSourceById(id:string|number): this{
        this.removeSource({id});
        return this;
    }

    /**
     * 根据资源属性查询并返回指定的资源对象，不存在返回null
     * @param source 资源的某个属性
     * @return {Source}
     */
    getSource(source): Source{
        let index = LoadQueue.findIndex(this.queueList, source);
        return index === -1 ? null : this.queueList[index];
    }

    /**
     * 通过id查询出对应的资源对象，不存在则返回null
     * @param id
     * @return {Source}
     */
    getSourceById(id:number): Source{
        let index = LoadQueue.findIndex(this.queueList, {id});
        return index === -1 ? null : this.queueList[index];
    }

    /**
     * 通过name属性查询出对应的对象，不存在则返回null
     * @param name
     * @return {Source}
     */
    getSourceByName(name:string): Source{
        let index = LoadQueue.findIndex(this.queueList, {name});
        return index === -1 ? null : this.queueList[index];
    }

    /**
     * 通过资源属性返回HTML标签，例如：<img />
     * @param source
     */
    getContent(source): HTMLElement{
        let index = LoadQueue.findIndex(this.queueList, source);
        return index === -1 ? null : this.queueList[index].element;
    }

    getContentById(id:number): HTMLElement{
        let index = LoadQueue.findIndex(this.queueList, {id});
        return index === -1 ? null : this.queueList[index].element;
    }

    getContentByName(name:string): HTMLElement{
        let index = LoadQueue.findIndex(this.queueList, {name});
        return index === -1 ? null : this.queueList[index].element;
    }

    /**
     * 所有资源数量
     */
    public allCount:number = 0;

    /**
     * 完成资源数量
     */
    public finishCount:number = 0;

    /**
     * 成功加载的资源数量
     */
    public successCount:number = 0;

    /**
     * 加载失败的资源数量
     */
    public failCount:number = 0;

    start(): this{

        this.allCount = this.queueList.length;
        this.finishCount = 0;
        this.successCount = 0;
        this.failCount = 0;

        /**
         * 全部资源加载ok，触发对应事件，并且移除一次性事件(完成、进行中)
         */
        const checkFinish = () => {
            if(this.finishCount === this.allCount){

                this.eventList[LoadQueue.Event.Progress].forEach((eventFn:Function) => eventFn.call(this, this.allCount, this.finishCount, this.successCount, this.failCount));
                this.eventList[LoadQueue.Event.ProgressOnce].forEach((eventFn:Function) => eventFn.call(this, this.allCount, this.finishCount, this.successCount, this.failCount));

                this.eventList[LoadQueue.Event.Complete].forEach((eventFn:Function) => eventFn.call(this));
                this.eventList[LoadQueue.Event.CompleteOnce].forEach((eventFn:Function) => eventFn.call(this));

                this.eventList[LoadQueue.Event.CompleteOnce].length = 0;
                this.eventList[LoadQueue.Event.ProgressOnce].length = 0;

            }else{
                this.eventList[LoadQueue.Event.Progress].forEach((eventFn:Function) => eventFn.call(this, this.allCount, this.finishCount, this.successCount, this.failCount));
                this.eventList[LoadQueue.Event.ProgressOnce].forEach((eventFn:Function) => eventFn.call(this, this.allCount, this.finishCount, this.successCount, this.failCount));
            }
        };

        this.queueList.forEach((source:Source) => {

            let image:HTMLImageElement = document.createElement("img");
            image.onload = () => {
                this.finishCount++;
                this.successCount++;

                this.eventList[LoadQueue.Event.Success].forEach((eventFn:Function) => eventFn.call(this, source));
                source.element = image;

                checkFinish();
            };
            image.onerror = () => {
                this.failCount++;
                checkFinish();

                this.eventList[LoadQueue.Event.Fail].forEach((eventFn:Function) => eventFn.call(this, source));
            };

            image.src = source.src;
        });

        return this;
    }

    /**
     * 监听事件
     * @param eventName 事件名称，可以访问LoadQueue.Event这个静态属性来获得
     * @param callback
     */
    on(eventName: string, callback:Function):this{
        this.eventList[eventName].push(callback);

        return this;
    }

    /**
     * 增加一个类型加载器。如音频加载器
     * 说明：加载器名字大小写不敏感，全部都会转换为小写。
     * @param loaderName
     * @param loaderFn
     * @param override 是否覆盖之前的加载器
     */
    addLoader(loaderName:string, loaderFn: Function, override = false){

        let loader:loaderType = {};

        loaderName = loaderName.toLowerCase();
        loaderFn(loader);

        if(!this.loaderList[loaderName]){
            this.loaderList[loaderName] = loader;
        }else{
            if(!override){
                console.warn(`检测到"${loaderName}"加载器已经存在，如果需要请传入overrider参数为true`);
            }else{
                this.loaderList[loaderName] = loader;
            }
        }

    }
}

