// DOM库


var utils = function () {
    var flg = 'getComputedStyle' in window;

    function getByClass(strClass,context){
        context = context||document;
        if(flg){
            return Array.prototype.slice.call( context.getElementsByClassName(strClass)    )
        }
        // ie
        /* 分割为数组  遍历所有元素  */
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
        //getByClass 根据class获取元素
        getByClass:getByClass,
        //8 hasClass 判断元素是否包含class

            //9 addClass 给元素加上class

        //10 removeClass 给元素移除class

            //11 getCss 获取css 样式

            //12 setCss 设置一个css样式

        //13 setGroupCss 批量设置css

            //14 css 集 获取 设置一体
    }
}();