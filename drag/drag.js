/* 拖拽基本版*/

var oDiv =document.getElementsByTagName('div')[0];
on(oDiv,'mousedown',down);

function down(e){
    oDiv.x=e.clientX;
    oDiv.y=e.clientY;
    oDiv.l=oDiv.offsetLeft;
    oDiv.t=oDiv.offsetTop;

    if(oDiv.setCapture){
        oDiv.setCapture();
        on(oDiv,'mousemove',move);
        on(oDiv,'mouseup',up);
    }else{
        // 标准
        on(document,'mousemove',move);
        on(document,'mouseup',up);
        e.preventDefault();
    }
};
function move(e){
    oDiv.style.left = e.clientX-oDiv.x+oDiv.l+'px';
    oDiv.style.top = e.clientY-oDiv.y+oDiv.t+'px';
};
function up(){
    if(oDiv.releaseCapture){
        oDiv.releaseCapture();
        off(oDiv,'mousemove',move);
        off(oDiv,'mouseup',up);
    }else{
        off(document,'mousemove',move);
        off(document,'mouseup',up);
    }
};
