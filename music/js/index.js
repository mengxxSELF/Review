/* 需求分析 音乐APP
 *  步骤分析*/
// 1 ajax获取数据
//2 正则 修改所需的数据格式
//3 创建数组放入歌词
//4 订阅发布模式 进行歌曲操作
//5 播放歌曲 按钮设置
//6 时间轴准备 当前时间 总时间 时间轴变化
//7 歌词滚动 -》定时器
//8 歌曲播放完毕操作 停止定时器 重置歌词与时间轴以及按钮


/* 设置rem 求出根字节
* 设计稿640px 字体 100px 相当于1rem
 * 屏幕 clientWidth  ?
* */
~function(){
    var designW = 640,
        screenW= $(window).width(),
        htmlFont= 100;
    $('html,body').css('font-size',htmlFont*screenW/designW+'px');

    /*设置 main部分 长度*/
    $('.main').css('height',$(window).height()-$('header').height()-$('footer').height())
}();


/* 核心JS代码 */

~function () {
    var data =null,
        oAudio=$('audio')[0];

    // 任务订阅  需要在拿到数据之后进行如下操作
    var musicBack = $.Callbacks();
    // 渲染页面
    musicBack.add(function (data) {
        var str='';
        for(var i=0;i<data.length;i++){
            var cur = data[i];
            str+='<p data-time="'+cur.minute+':'+cur.second+'">'+cur.content+'</p>';
        };
        $('.lyric').html(str);
    });
    // 关于歌曲播放的设置
    musicBack.add(function () {
        $('audio').on('canplay', function () {
            oAudio.play();
        });
    });




    // ajax获取数据
    $.get('lyric.json', function (res) {
        data=res.lyric;
        // 利用正则变化格式
        data = data.replace(/&#(\d{2});/g, function ($0,$1) {
            switch (Number($1)){
                case 32:
                    $0=' ';
                    break;
                case 40:
                    $0=')';
                    break;
                case 41:
                    $0='(';
                    break;
                case 45:
                    $0='-';
                    break;
            }
            return $0;
        });
        // 处理时间
        var reg = /\[(\d+)&#58;(\d+)&#46;(?:\d+)\]([^&#]+)(?:&#\d+)/g;
        var dataAry=[];
        data.replace(reg, function ($0,$1,$2,$3) {
            dataAry.push({
                minute:$1,
                second:$2,
                content:$3
            })
        });
        // 发布任务
        musicBack.fire(dataAry); // 传递参数
    },'json')
}();










~function(){

}();