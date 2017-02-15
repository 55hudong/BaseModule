## 基础对话框组件 (确认取消、确认)
---------------

注：只能修改标题和内容且只能是纯文本。如果需要增加其它HTML请使用modal模块。

### 使用说明

#### 基础声明
``` javascript
    var dialog = new FF.Dialog("title", "content");
```

#### 回调方法
```
    var dialog = new FF.Dialog("title", "content");
    dialog.ok(function(){
        console.log("点击了确定");
    }).cancel(function(){
        console.log("点击了取消");
    })
```