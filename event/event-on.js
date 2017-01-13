/* event on off run*/

// 绑定
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
    }else{
        if(obj[type+'onEvent']){
            obj[type+'onEvent']=[];
        }
        var aE =obj[type+'onEvent'];
        for(var i=0;i<aE.length;i++){
            if(aE[i]==fn) return;
        }
        aE.push(fn);
        obj.attachEvent('on'+type, function () {
            run.call(obj);
        })
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
