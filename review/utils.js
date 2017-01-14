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
    return{
        //getByClass ����class��ȡԪ��
        getByClass:getByClass,
        //8 hasClass �ж�Ԫ���Ƿ����class

            //9 addClass ��Ԫ�ؼ���class

        //10 removeClass ��Ԫ���Ƴ�class

            //11 getCss ��ȡcss ��ʽ

            //12 setCss ����һ��css��ʽ

        //13 setGroupCss ��������css

            //14 css �� ��ȡ ����һ��
    }
}();