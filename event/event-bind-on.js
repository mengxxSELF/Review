/* �¼���  bind unbind  on run off */
/* ����IE��
 1 thisָ������ -�� call
 2 �󶨶�� �ظ�ִ������ -> �¼���
 3 ִ��˳������ -�� on run off
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
// ϵͳ�¼����
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

// on run off ���˳��ִ������
function on(obj,type,fn){
    if(obj.addEventListener){
        obj.addEventListener(type,fn,false);
    }else{
        //ie ������fn �����Զ������� ���¼�����ֻ����һ��run����
        if(!obj['on'+type]){
            obj['on'+type]=[];
        };
        var aE = obj['on'+type];
        for(var i=0;i<aE.length;i++){
            if(aE[i]==fn) return;
        }
        aE.push(fn); // ����Զ����������������˵�
        bind(obj,type,run);
    }
}

// �õ����� ˳��ִ�к������� ע��this
function run(){
    // ie �д����¼�����
    var e =window.event;
    var aE = this['on'+e.type];
    if(aE && aE.length){
        for(var i=0;i<aE.length;i++){
           if(typeof aE[i]=='function'){
               aE[i].call(this,e);
           }else{
               aE.splice(i,1);
               i--; // ��ֹ��������
           }
        }
    }
}

// ��� ɾ���Զ�������
function off(obj,type,fn){
    if(obj.removeEventListener){
        obj.removeEventListener(type,fn,false);
    }else{
        var aE = obj['on'+type];
        if(aE && aE.length) {
            for (var i = 0; i < aE.length; i++) {
                if(aE[i]==fn){
                    aE[i]=null; //������ɾ��
                    return;
                }
            }
        }
    }
}