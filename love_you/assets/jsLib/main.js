$(function(){
    // 背景音乐自动播放
    $("#bgMusic").get(0).play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        $("#bgMusic").get(0).play();
    }, false);
    // 最后一个动画结束
    var count = 0;
    var store = [
    ["我问：亲爱的爱我么？"],
    ["你说：要脱光么？"],
    ["我说：我接不上了～"],
    ["你说：我是故意的～"],
    ["我咋不觉得你是故意的，你的思路就是如此啊，不尴尬的，是爱我呢～"],
    ["我爱你啊","我爱你啊～"],
    ["跟你在一起做了很多事儿"],
    ["一件一件的，有做的好的，也有做的不好的，但是一直在努力呀～"],
    ["今天情人节哈～"],
    ["亲爱的身体倍棒，天天开心，有我你就放心吧，总会有怼你的时候，不开心也就自然会有，难为亲爱的都习惯了"],
    ["赖上你了，就不打算让你跑掉的～"],
    ["爱你啊，武晋","武晋,我爱你哦～"],
    ["很爱很爱你的哦，武晋～超爱的我跟你讲"],
    ["宝宝，情人节快乐，有你真好，爱你，MU~A"]
    ]
    $("[data-count='16']").on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function(){
        // $("[data-count]").addClass();
        $(".fix").addClass("zoom animated");
        setTimeout(function(){
            $(".love-container").addClass("animated zoomIn");
            setTimeout(function(){
                initType();
                $("body").append("<div class='heartbeat i'><img src='./assets/images/heart_pink_3.png'></div>")
                .append("<a href='tel:18089210182'>修复bug</a><a href='tel:18089210182'>情感专线</a>")
            }, 500);
        }, 3000);
    });
    function initType(){
        if(count > store.length) return false;
        var $typeContent = $(".type-container");
        var prev = count - 1;
        $typeContent.find(".type-" + prev).next(".ityped-cursor").hide();
        if(!store[count]) return false;
        setTimeout(function(){
            $typeContent.find(".type-" + prev).parent().fadeOut(2000);
        }, 2000);
        $typeContent.append("<div class='types-content'><p class='type-"+count+"'></p></div>");
        var $needTypeContainer = "."+$typeContent.find(".type-"+count).attr("class");
        ityped.init($needTypeContainer, {
            showCursor: true,
            backSpeed: 150,
            disableBackTyping: true,
            strings: store[count],
            cursorChar: "|",
            startDelay: 1000,
            typeSpeed: 200,
            loop: false,
            disableBackTyping: true,
            onFinished: function(){
                initType();
            }
        });
        ++count;
    }
});