/*bind  ->柯里化函数 */

// call apply bind 都属于Function原型的方法
// bind 更改this指向 返回一个函数定义阶段  fn2.bind(newThis,arg1,...)

Function.prototype.myBind= function (context) {
    var args = Array.prototype.slice.call(arguments,1); // 获取参数 -》数组格式
    if('bind' in Function.prototype){
        return this.bind.apply(this,[context].concat(args));
    }
    var _this =this;
    // 在不支持bind方法时
    return function () {
        var e=window.event;// ie 放入事件对象
        args.push(e);
        _this.apply(context,args);
    };
};

