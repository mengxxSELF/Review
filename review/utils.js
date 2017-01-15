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

    function getCss(obj,attr){
        // 获取元素某一个样式 opacity
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
        //处理单位 12 px  rem pt
        reg= /^([-+])?(\d+(\.\d+)?)(px|pt|rem|em)?$/i;

        return reg.test(val)?parseFloat(val):val;
    }

    function setCss(obj,attr,val){
        // 设置一个样式
        // 处理 float opacity 单位

        if(attr=='float'){
            obj.style.cssFloat=val;
            obj.style.styleFloat=val;
        }
         if(attr=='opacity'){
            obj.style.opacity=val;
            obj.style.filter= 'alpha(opacity='+ val*100 +')' ; // 注意乘以100
        }
        // 处理单位 width height left top right bottom  margin|padding|
        var reg= /^(width|height|left|top|right|bottom|((margin|padding)(left|top|right|bottom)?))$/i;
        // 如果是 %  auto
        if(reg.test(attr)){
            if(!(/(%|auto)/i).test(val)){
                //val+='px'; // 加上单位
                val= parseInt(val)+'px'; // 原来可以 有单位 也可以没有
            }
       }
        obj.style[attr]=val;
    }
    return{
        //getByClass 根据class获取元素
        getByClass:getByClass,
        //8 hasClass 判断元素是否包含class

            //9 addClass 给元素加上class

        //10 removeClass 给元素移除class

            //11 getCss 获取css 样式
        getCss:getCss,
            //12 setCss 设置一个css样式
        setCss:setCss,
        //13 setGroupCss 批量设置css

            //14 css 集 获取 设置一体
    }
}();