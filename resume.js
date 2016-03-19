function getEle(ele) {
    return document.querySelector(ele);
}
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var desW = 640;
var desH = 960;
var bell = document.querySelector("#bell");
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
var num = 0;
function fnLoad() {
    var progress = getEle(".progress");
    var loading = getEle("#loading");
    var arr = ['1.jpg', '2.jpg', '3.jpg', '4.jpg','6.png','7.jpg','8.png'];
    for (var i = 0; i < arr.length; i++) {
        var oImg = new Image();
        oImg.src = "img/" + arr[i];
        oImg.onload = function () {
            num++;
            progress.style.width = num / arr.length * 100 + "%";
            if (num == arr.length && loading) {
                progress.addEventListener("webkitTransitionEnd", function () {
                    main.removeChild(loading);
                    loading = null;
                    fnMessage();

                }, false)
            }
        }
    }
}
fnLoad();
function fnMessage(){
    [].forEach.call(oLis, function () {
        var oLi = arguments[0];
        oLi.index = arguments[1];
        oLi.addEventListener("touchstart", start, false);
        oLi.addEventListener("touchmove", move, false);
        oLi.addEventListener("touchend", end, false);

    });

    function start(e) {
        this.startTouch = e.changedTouches[0].pageY;
    }
    function move(e) {
        e.preventDefault();
        this.flag = true;
        var moveTouch = e.changedTouches[0].pageY;
        var pos = moveTouch - this.startTouch;
        var index = this.index;
        [].forEach.call(oLis,function(){
            if(arguments[1]!=index){
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            arguments[0].firstElementChild.id="";
        });
        if (pos > 0) {
            this.prevSIndex = (index == 0 ? oLis.length - 1 : index - 1);
            //var duration = -480+pos;
            var duration = -winH+pos;

        } else if (pos) {
            this.prevSIndex = (index == oLis.length-1 ? 0 : index + 1);
            //var duration = 480+pos;
            var duration = winH+pos;
        }
        oLis[this.prevSIndex].style.display = "block";
        oLis[this.prevSIndex].style.webkitTransform = "translate(0,"+duration+"px)";
        oLis[this.prevSIndex].className="zIndex";
        oLis[index].style.webkitTransform = "scale("+(1-Math.abs(pos)/winH*1/2)+") translate(0,"+pos+"px)";
    }
    function end(e) {
        if(this.flag){
            oLis[this.prevSIndex].style.webkitTransform = "translate(0,0)";
            oLis[this.prevSIndex].style.webkitTransition = "0.7s";
            oLis[this.prevSIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                this.firstElementChild.id="a"+this.index;

            }, false)
        }
    }

    document.addEventListener("touchmove",function(){

    });
}

