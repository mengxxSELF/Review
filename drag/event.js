function on(ele,type,fn){
    if(/^self/.test(type)){//自定义事件绑定:必须以self开头
        //1.创建数组 2.给数组添加方法；
        if(!ele[type]){
            ele[type]=[];
        }
        var a=ele[type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }else{//系统事件绑定
        if(ele.addEventListener){//标准浏览器，不需要处理
            ele.addEventListener(type,fn,false);
        }else{//IE浏览器-需要做兼容处理；
            //没有数组时，创建一个数组；--代码只执行一次
            if(!ele[type+'onEvent']){
                ele[type+'onEvent']=[];
                ele.attachEvent('on'+type,function(){
                    run.call(ele);
                })
            }
            var a=ele[type+'onEvent'];
            for(var i=0; i<a.length; i++){
                if(a[i]===fn) return;
            }
            a.push(fn);
        }
    }
}
function off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{//1:拿到数组 2:遍历查询来赋值为null
        var a=ele[type+'onEvent'];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(a[i]===fn){
                    a[i]=null;
                    break;
                }
            }
        }

    }
}
//1)拿到数组 2）顺序调用：1：this指向；2：event  3：做关于事件对象详细信息的兼容处理；
function run(){
    var e=e||window.event;
    e.target=e.srcElement;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
    e.preventDefault=function(){
        e.returnValue=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };
    var a=this[e.type+'onEvent'];
    if(a && a.length){
        for(var i=0; i<a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//逐个调用自定义事件绑定好的方法；
function fire(type,e){
    var a=this[type];
    if(a && a.length){
        for(var i=0; i<a.length; i++){
            a[i].call(this,e);
        }
    }
}
function processThis(fn,context){
    return function (e){
        fn.call(context,e)
    }
}