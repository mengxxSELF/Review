/* ���캯������ק*/

function EventEmmit(){};
EventEmmit.prototype.on= function (type,fn) {
    if(!this[type]){
        this[type]=[]
    }
    var a = this[type];
    for(var i=0;i<a.length;i++){
        if(a[i]==fn) return;
    }
    a.push(fn);
};
EventEmmit.prototype.fire= function (type,e) {
    var a = this[type];
    if(a&&a.length){
        for(var i=0;i<a.length;i++){
            a[i].call(this,e)
        }
    }
};


function Drag(opt){
    if(!opt.ele) return;
    this.ele =opt.ele;
    this.Down = processThis(this.down,this);
    on(this.ele,'mousedown',this.Down);
};
Drag.prototype= new EventEmmit(); // ԭ�����̳�
Drag.prototype.constructor=Drag; // �ָ�constructor
Drag.prototype.down = function (e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.l=this.ele.offsetLeft;
    this.t=this.ele.offsetTop;

    this.Move = processThis(this.move,this);
    this.Up = processThis(this.up,this);
    
    if(this.ele.setCapture){
        this.ele.setCapture();
        on(this.ele,'mousemove',this.Move);
        on(this.ele,'mouseup',this.Up);
    }else{
        // ��׼
        on(document,'mousemove',this.Move);
        on(document,'mouseup',this.Up);
        e.preventDefault();
    }

    // ��¶�ӿ�
    this.fire('mousedown');
};

Drag.prototype.move= function (e) {
    this.ele.style.left = e.clientX-this.x+this.l+'px';  
    this.ele.style.top = e.clientY-this.y+this.t+'px';
    // ��¶�ӿ�
    this.fire('mousemove',e);

};

Drag.prototype.up= function () {
    if(this.ele.releaseCapture){
        this.ele.releaseCapture();
        off(this.ele,'mousemove',this.Move);
        off(this.ele,'mouseup',this.Up);
    }else{
        // ��׼
        off(document,'mousemove',this.Move);
        off(document,'mouseup',this.Up);
    }

    // ��¶�ӿ�
    this.fire('mouseup');
}











