// jquery drag

// down move up
$('div').on('mousedown',down);
function down(e) {
    this.posL = e.clientX-$(this).position().left;
    this.posT = e.clientY-$(this).position().top;
}

$('div').on('mousemove',move)
function move(e) {
    $(this).css('left',e.clientX-this.posL);
    $(this).css('top',e.clientY-this.posT);
}
$('div').on('mouseup', up)
function up(e) {
    $('div').off('mousemove',move).off('mouseup',up);
}