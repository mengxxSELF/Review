/* 拖拽基本版*/

var oDiv =document.getElementsByTagName('div')[0];
on(oDiv,'mousedown',down);

function down(e){
    this.x=e.clientX;
    this.y=e.clientY;
    this.l=this.offsetLeft;
    this.t=this.offsetTop;

    if(this.setCapture){
        this.setCapture();
        on(this,'mousemove',move);
        on(this,'mouseup',up);
    }else{
        // 标准
        this.Move= processThis(move,this);
        this.Up= processThis(up,this);
        on(document,'mousemove',this.Move);
        on(document,'mouseup',this.Up);
        e.preventDefault();
    }

    // 弹跳
    clearTimeout(this.timerX)

};
function move(e){
    this.style.left = e.clientX-this.x+this.l+'px';
    this.style.top = e.clientY-this.y+this.t+'px';

    // 弹跳
    if(!this.prevSpeedX){
        this.prevSpeedX=e.clientX;
    }else{
        this.speedX= e.clientX-this.prevSpeedX;
        this.prevSpeedX=e.clientX;
    }

    this.speedY=9.8;
};
function up(){
    if(this.releaseCapture){
        this.releaseCapture();
        off(this,'mousemove',move);
        off(this,'mouseup',up);
    }else{
        off(document,'mousemove',this.Move);
        off(document,'mouseup',this.Up);
    }
    // 弹跳
    fly.call(this);
    drop.call(this);
};

function fly(){
    clearTimeout(this.timerX);
    this.speedX*=0.92;
    var le = this.offsetLeft+this.speedX;
    var maxL = (document.documentElement.clientWidth||document.body.clientWidth)-this.clientWidth;

    if(le>=maxL){
        le=maxL;
        this.speendX*=-1;
    }else if(le<=0){
        le=0;
        this.speendX*=-1;
    }

    if(Math.abs(this.speedX)>=0.5){
        this.timerX = setTimeout(processThis(fly,this),10);
        this.style.left=le+'px';
    }

}

function drop(){
    clearTimeout(this.timerY)
//    自由落体
    this.speedY+=9.8;
    this.speedY*=0.92;
    var t=(this.offsetTop+this.speedY);
    var from=1;
    var maxT = (document.documentElement.clientHeight||document.body.clientHeight)-this.clientHeight;
    if(t>=maxT){
        t=maxT;
        this.speedY*=-1;
        this.flag++;
    }else{
        this.flag=0;
    }

    if(this.flag<=2){
        this.timerY = setTimeout(processThis(drop,this),10)
        this.style.top = t +'px';
    }


}