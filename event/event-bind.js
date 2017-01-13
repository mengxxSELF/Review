/* �¼���  bind unbind */
/* ����IE��
1 thisָ������ -�� call
2 �󶨶�� �ظ�ִ������ -> �¼���
* */

// ϵͳ�¼���
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
        aE.push(tmp); // ����Զ����������������˵�
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
                    aE.splice(i,1);//���Զ���������ɾ�����¼�
                    return;
                };
            }
        }
    }
}