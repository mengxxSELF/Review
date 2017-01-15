// DOM��


var utils = function () {
    var flg = 'getComputedStyle' in window;

    function getByClass(strClass,context){
        context = context||document;
        if(flg){
            return Array.prototype.slice.call( context.getElementsByClassName(strClass)    )
        }
        // ie
        /* �ָ�Ϊ����  ��������Ԫ��  */
        var domAry=[];
        var nodeList = context.getElementsByTagName('*');
        var aryClass = strClass.replace(/(^ +)|( +$)/g,'').split(/(\s+)/g);
        for(var i=0;i<nodeList.length;i++){
            var flag =true;
            var classN = nodeList[i].className;
            for(var j=0;j<aryClass.length;j++){
                var reg = new RegExp('(^| +)'+aryClass[i]+'( +|$)','g');
                if(!reg.test(classN)) {
                    flag=false;
                    break;
                }
            }
            if(flag){
                domAry.push(nodeList[i]);
            }
        }
        return domAry;
    }

    function getCss(obj,attr){
        // ��ȡԪ��ĳһ����ʽ opacity
        var val=null , reg=null;
        if(flag){
            return getComputedStyle(obj,false)[attr];
        }else{
            // ie
            // opacity
            if(attr=='opacity'){
                val = obj.currentStyle['filter']; // 60    filter:alpha(opacity=60)
                reg=/^alpha\(opacity[:=](\d+)\)$/i;
                val =  reg.test(val)? RegExp.$1/100:1;
            }else{
                val = obj.currentStyle[attr];
            }
        }
        //����λ 12 px  rem pt
        reg= /^([-+])?(\d+(\.\d+)?)(px|pt|rem|em)?$/i;

        return reg.test(val)?parseFloat(val):val;
    }

    function setCss(obj,attr,val){
        // ����һ����ʽ
        // ���� float opacity ��λ

        if(attr=='float'){
            obj.style.cssFloat=val;
            obj.style.styleFloat=val;
        }
         if(attr=='opacity'){
            obj.style.opacity=val;
            obj.style.filter= 'alpha(opacity='+ val*100 +')' ; // ע�����100
        }
        // ����λ width height left top right bottom  margin|padding|
        var reg= /^(width|height|left|top|right|bottom|((margin|padding)(left|top|right|bottom)?))$/i;
        // ����� %  auto
        if(reg.test(attr)){
            if(!(/(%|auto)/i).test(val)){
                //val+='px'; // ���ϵ�λ
                val= parseInt(val)+'px'; // ԭ������ �е�λ Ҳ����û��
            }
       }
        obj.style[attr]=val;
    }
    return{
        //getByClass ����class��ȡԪ��
        getByClass:getByClass,
        //8 hasClass �ж�Ԫ���Ƿ����class

            //9 addClass ��Ԫ�ؼ���class

        //10 removeClass ��Ԫ���Ƴ�class

            //11 getCss ��ȡcss ��ʽ
        getCss:getCss,
            //12 setCss ����һ��css��ʽ
        setCss:setCss,
        //13 setGroupCss ��������css

            //14 css �� ��ȡ ����һ��
    }
}();