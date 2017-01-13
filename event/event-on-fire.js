/* event： on off run Fire 加入事件订阅发布*/

// 绑定
function on(obj,type,fn){
    var reg = /^self/g; // 以self开始的 为订阅的事件
    if(reg.test(type)){
        if(!obj[type]){
            obj[type]=[];
        }
        var onE =obj[type];
        for(var i=0;i<onE.length;i++){
            if(onE[i]==fn) return;
        }
        onE.push(fn);
    }else{
        if(obj.addEventListener){
            obj.addEventListener(type,fn,false);
        }else{
            if(!obj[type+'onEvent']){
                obj[type+'onEvent']=[];
                // 系统事件池只创建一次
                obj.attachEvent('on'+type, function () {
                    run.call(obj);
                })
            }
            var aE =obj[type+'onEvent'];
            for(var i=0;i<aE.length;i++){
                if(aE[i]==fn) return;
            }
            aE.push(fn);
        }
    }
};
//顺序执行函数
function run(){
    var e= window.event;
    var aE =this[e.type+'onEvent'];
    if(aE&&aE.length){
        for(var i=0;i<aE.length;i++) {
            if(typeof aE[i]=='function'){
                aE[i].call(this,e);
            }else{
                aE.splice(i,1);
                i--;
            }
        }
    }
};
//解绑
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        var aE =obj[type+'onEvent'];
        if(aE&&aE.length){
            for(var i=0;i<aE.length;i++) {
                if(aE[i]==fn){
                    aE[i]=null;
                    return;
                }
            }
        }
    }
};

// fire 发布
function fire(type,e){
    var onE =this[type];
    if(onE&&onE.length){
        for(var i=0;i<onE.length;i++) {
            onE[i].call(this,e);
        }
    }
}