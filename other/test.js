/*
前六周知识点-真实面试题:
1.写一个通用事件侦听函数？*/
//2.填充注释部分的函数体，使得foo()函数调用弹出“成功”的对话框，代码应尽量简短（代码即少又清晰，可加分）

function foo(){
    var str=reverse('a,b,c,d,e,f,g');
    alert(str)
    if(str=='g,f,e,d,c,b,a'){
        alert('成功')
    }else {
        alert('失败')
    }
}
function reverse(str){
    //在此处加入代码，完成字符串翻转功能
    return str.split(',').reverse().join(',');
}


//3.以下代码输出结果
function printing(){
    console.log(1);
    setTimeout(function(){
        console.log(2)
    },1000)
    setTimeout(function(){
        console.log(3)
    },0)
    console.log(4)
}
printing();// 1 4 3 2

//4. 以下代码输出结果
var fullname='John Doe';
var obj={
    fullname:'Colin lhrig',
    prop:{
        fullname:'Aurelio De Rosa',
        getFullname:function(){
            return this.fullname;
        }
    }
}
console.log(obj.prop.getFullname())
var test=obj.prop.getFullname;
console.log(test());
//5.列举熟悉的浏览器兼容问题及解决方案（至少三种）



//6.请写出下面代码的运行结果
var obj={
    name:'obj',
    dose:function(){
        this.name='dose';
        return function(){
            return this.name;
        }
    }
}
console.log(obj.dose().call(this));
//7. 请写出下面代码的运行结果
function func1(){
    var n=99;
    nAdd=function(){
        this.n+=1;
        console.log(this.n);
    }
    function func2(){
        console.log(n);
    }
    return func2;
}
var result=func1();
result();
nAdd();
result();
//8. 考察：函数的三种角色：
function Foo(){
    getName=function(){alert(1)};
    return this;
}
Foo.getName=function (){alert(2)};
Foo.prototype.getName=function(){alert(3)};
var getName=function(){alert(4)};
function getName(){alert(5)}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
//9.以下函数输出什么？
var name='world';
(function(){
    if(typeof name==='undefined'){
        var name='Jack';
        console.log('Goodbye'+name)
    }else{
        console.log('Hello'+name)
    }
})();
//10.请计算下面程序运行结果
var msg='hello';
function great(name,attr){
    name='david';
    var greating=msg+name+'!';
    var msg='您好';
    for(var i=0; i<10; i++){
        var next=msg+'您的id是'+i*2+i;
    }
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(greating)
    console.log(next)
}
great('Tom')
//11.写一个JavaScript面向对象及继承例子；
//12.计算下面运行结果
(function(){
    var x=y=1;
})();
console.log(y);
console.log(x);
//13.请说明下面两段代码有什么不同？
代码段1：
setTimeout(function(){
    /*代码块*/
    setTimeout(arguments.callee,10);
},10);
代码段2：
setInterval(function(){
    /*代码块*/
},10)


14.Javascript如何实现继承？你有几种方法？
15.判断一个字符串中出现次数最多的字符，并统计这个次数；
16.什么是闭包？
17.请简要描述下你对prototype和this的理解；
18.请输出以下结果
var myObject={
    num:2,
    add:function(){
        this.num=3;
        (function(){
            alert(this.num);
            this.num=4;
        })();
        alert(this.num)
    }
}
myObject.add();
19. 请输出以下结果
var x= 1,y= 2,z=0;
function add(n){
    return n=n+1;
}
y=add(x);
function add(n){
    return n=n+3;
}
z=add(x);
20.写出一个函数序列化URL上问号后的参数：
如：http://baidu.com?name=zhufeng&age=8&sex=boy;
    解出{name:zhufeng,age:8,sex:boy}





