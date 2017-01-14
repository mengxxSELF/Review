// 使用simple 解决多个Prototype 问题
var EventEmmit = Class.extend({
    init: function () {},
    on: function (type,fn) {
        if(!this[type]){
            this[type]=[];
        }
        var aE = this[type];
        if(aE){
            for(var i=0;i<aE.length;i++){
                if(aE[i]==fn) return;
            }
            aE.push(fn);
        }
    },
    fire: function (type,e) {
        var aE = this[type];
        if(aE&&aE.length){
            for(var i=0;i<aE.length;i++){
                aE[i].call(this,e);
            }
        }
    }


})

var Drag = EventEmmit.extend({
    init: function (opt){
        this._super();

        if(!opt.ele) return;
        this.ele=opt.ele;
        this.Down =processThis(this.down,this);
        this.Move =processThis(this.move,this);
        this.Up =processThis(this.up,this);
        on(this.ele,'mousedown',this.Down);

    },
    down: function (e) {
        this.x=e.clientX;
        this.y=e.clientY;
        this.l=this.ele.offsetLeft;
        this.t=this.ele.offsetTop;

        if(this.ele.setCapture){
            this.ele.setCapture();
            on(this.ele,'mousemove',this.Move)
            on(this.ele,'mouseup',this.Up)
        }else{
            on(document,'mousemove',this.Move)
            on(document,'mouseup',this.Up)
            e.preventDefault();
        }

        this.fire('selfdown',e)
    },
    move: function (e) {
        this.ele.style.left= e.clientX-this.x+this.l+'px';
        this.ele.style.top= e.clientY-this.y+this.t+'px';

        this.fire('selfmove',e)

    },
    up: function () {
        if(this.ele.releaseCapture){
            this.ele.releaseCapture();
            off(this.ele,'mousemove',this.Move)
            off(this.ele,'mouseup',this.Up)
        }else{
            off(document,'mousemove',this.Move)
            off(document,'mouseup',this.Up)
        }
        this.fire('selfup')

    },
    changeIndex: function () {
        this.on('selfdown', function () {
            this.ele.style.zIndex = ++Drag.boxIndex;
        })

    }
});
Drag.boxIndex=1;
