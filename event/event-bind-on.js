/* 事件库  bind unbind  on run off */
/* 处理IE下
 1 this指向问题 -》 call
 2 绑定多次 重复执行问题 -> 事件池
 3 执行顺序问题 -》 on run off
 * */

// 系统事件绑定
function bind(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
    }else{
        //ie
        var tmp = function () {
            fn.call(obj);
        };
        tmp.name=fn;
        if(!obj['on'+type]){
            obj['on'+type]=[];
        };
        var aE = obj['on'+type];
        for(var i=0;i<aE.length;i++){
            if(aE[i].name==fn) return;
        }
        aE.push(tmp); // 这个自定义数组是用来过滤的
        obj.attachEvent('on'+type,tmp);
    }
}
// 系统事件解绑
function unbind(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        //ie
        var aE = obj['on'+type];
        if(aE && aE.length){
            for(var i=0;i<aE.length;i++){
                if(aE[i].name==fn) {
                    obj.detachEvent('on'+type,aE[i]);
                    aE.splice(i,1);//在自定义数组中删除该事件
                    return;
                };
            }
        }
    }
}

// on run off 解决顺序执行问题
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
    }else{
        //ie 将方法fn 放入自定义数组 而事件池中只放入一个run方法
        if(!obj['on'+type]){
            obj['on'+type]=[];
        };
        var aE = obj['on'+type];
        for(var i=0;i<aE.length;i++){
            if(aE[i]==fn) return;
        }
        aE.push(fn); // 这个自定义数组是用来过滤的
        bind(obj,type,run);
    }
}

// 拿到数组 顺序执行函数方法 注意this
function run(){
    // ie 中处理事件对象
    var e =window.event;
    var aE = this['on'+e.type];
    if(aE && aE.length){
        for(var i=0;i<aE.length;i++){
           if(typeof aE[i]=='function'){
               aE[i].call(this,e);
           }else{
               aE.splice(i,1);
               i--; // 防止数组塌陷
           }
        }
    }
}

// 解绑 删除自定义数组
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        var aE = obj['on'+type];
        if(aE && aE.length) {
            for (var i = 0; i < aE.length; i++) {
                if(aE[i]==fn){
                    aE[i]=null; //不进行删除
                    return;
                }
            }
        }
    }
}