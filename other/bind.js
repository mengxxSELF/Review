/*bind */

// call apply bind 都属于Function原型的方法
// bind 更改this指向 返回一个函数定义阶段  fn2.bind(newThis,arg1,...)

Function.prototype.myBind= function (context) {
    var args = Array.prototype.slice.call(arguments,1); // 获取参数 -》数组格式
    console.log(args)
    if('bind' in Function.prototype){
        return this.bind.apply(context,[context].concat(args));
    }
    var _this =this;
    // 在不支持bind方法时
    return function () {
        _this.apply(context,args);
    };
};