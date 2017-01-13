/* 序列化地址栏参数
 * http://baidu.com?name=zhufeng&age=8&sex=boy;
 解出{name:zhufeng,age:8,sex:boy}
 */

var str = 'http://baidu.com?name=zhufeng&age=8&sex=boy&sethinshiuhb22x=boy3444444';
url(str);
console.log(url(str))
function url(str){
    var getObj = str.split('?')[1]; // 拿到？ 后面的字符串 name=zhufeng&age=8&sex=boy
    console.log(getObj);
    var reg = /([^&=]+)=([^&=]+)/g;
    var objAry=[];
    getObj.replace(reg, function ($0,$1,$2) {
        var obj={};
        obj[$1]=$2;
        objAry.push(obj);
    });
    return objAry;
}


