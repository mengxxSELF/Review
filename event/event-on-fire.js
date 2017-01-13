/* event�� on off run Fire �����¼����ķ���*/

// ��
function on(obj,type,fn){
    var reg = /^self/g; // ��self��ʼ�� Ϊ���ĵ��¼�
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
                // ϵͳ�¼���ֻ����һ��
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
//˳��ִ�к���
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
//���
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

// fire ����
function fire(type,e){
    var onE =this[type];
    if(onE&&onE.length){
        for(var i=0;i<onE.length;i++) {
            onE[i].call(this,e);
        }
    }
}