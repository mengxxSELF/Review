/* es6  拖拽 */

class EventEmmit{
    constructor(){};
    on(type,fn){
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
    }
    fire(type,e){
        var aE = this[type];
        if(aE&&aE.length){
            for(var i=0;i<aE.length;i++){
                aE[i].call(this,e);
            }
        }
    }
}

class Drag extends EventEmmit{
    constructor(opt){
        super(); // 继承 必须写super

        if(!opt.ele) return;
        this.ele=opt.ele;
        this.Down =processThis(this.down,this);
        this.Move =processThis(this.move,this);
        this.Up =processThis(this.up,this);
        on(this.ele,'mousedown',this.Down);
    }

    down(e){
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
        // 暴露外部接口
        this.fire('selfdown',e)
    }
    move(e){
        this.ele.style.left= e.clientX-this.x+this.l+'px';
        this.ele.style.top= e.clientY-this.y+this.t+'px';

        // 暴露外部接口
        this.fire('selfmove',e)
    }
    up(){
        if(this.ele.releaseCapture){
            this.ele.releaseCapture();
            off(this.ele,'mousemove',this.Move)
            off(this.ele,'mouseup',this.Up)
        }else{
            off(document,'mousemove',this.Move)
            off(document,'mouseup',this.Up)
        }
        // 暴露外部接口
        this.fire('selfup',e)
    }
}