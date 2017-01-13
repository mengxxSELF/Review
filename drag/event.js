function on(ele,type,fn){
    if(/^self/.test(type)){//�Զ����¼���:������self��ͷ
        //1.�������� 2.��������ӷ�����
        if(!ele[type]){
            ele[type]=[];
        }
        var a=ele[type];
        for(var i=0; i<a.length; i++){
            if(a[i]===fn) return;
        }
        a.push(fn);
    }else{//ϵͳ�¼���
        if(ele.addEventListener){//��׼�����������Ҫ����
            ele.addEventListener(type,fn,false);
        }else{//IE�����-��Ҫ�����ݴ���
            //û������ʱ������һ�����飻--����ִֻ��һ��
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
    }else{//1:�õ����� 2:������ѯ����ֵΪnull
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
//1)�õ����� 2��˳����ã�1��thisָ��2��event  3���������¼�������ϸ��Ϣ�ļ��ݴ���
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
//��������Զ����¼��󶨺õķ�����
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