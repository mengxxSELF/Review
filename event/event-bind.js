/* 事件库  bind unbind */
/* 处理IE下
1 this指向问题 -》 call
2 绑定多次 重复执行问题 -> 事件池
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