$(function () {
    var widthFnc = function () {
        var $liList = $('#numList').children('li');
        var $liList2 = $('#numList2').children('li');
        var sum = 0, sum2 = 0;
        if ($liList.hasClass('classundefined')) {
            $('.classundefined').css({
                width: 0
            })
        }
        for (var i = 0; i < $liList.length; i++) {
            sum += $('#numList>li').eq(i).width()
        }
        for (var i = 0; i < $liList2.length; i++) {
            sum2 += $('#numList2>li').eq(i).width()
        }
        $('#numList').css({
            width: sum + 80
        })
        $('#numList2').css({
            width: sum2 + 80
        })
    }
    var fn = function (amount) {
        var numComma = numberFormat(amount),
            num = [], count = 0,
            $numList = $('#numList'),
            $numList2 = $('#numList2'),
            $li = $numList.children('li'),
            $li2 = $numList2.children('li'),
            max = $li.length,
            max2 = $li2.length;

        for (var i = numComma.length - 1; i >= 0; i--) {
            num.push(numComma[i]);
        }

        for (var i = max2 - 1; i >= 0; i-- , count++) {
            $li[i].className = 'class' + num[count]
            $li2[i].className = 'class' + num[count]
        }
    }(amount);

    function numberFormat(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $(window).resize(function () {
        widthFnc()
    })
    $(window).load(function () {
        widthFnc()
    })

});

$(function () {
    var $maincont = $(".slides-container>li");
    var mainidx = 0, maxIdx = 7, time = 3000;
    var video = document.getElementById('video')
    var timer = null;

    function move() {
        $maincont.eq(mainidx).fadeIn().siblings().fadeOut();
    }
    function clear(sec) {
        clearInterval(timer)
        timer = null
        if (!timer) {
            timer = setInterval(nextFn, sec)
        }
    }
    function nextFn() {
        if (mainidx == maxIdx) {
            mainidx = 0;
            move();
        } else {
            mainidx++;
            move();
        }
        if (mainidx == 0) {
            video.load();
            video.play();
        } else {
            video.pause();
        }
        if (mainidx == 1 || mainidx == 7) {
            clear(30000)
        } else if (mainidx == 0) {
            clear(30000)
        } else if (mainidx == 2 || mainidx == 3 || mainidx == 4 || mainidx == 5 || mainidx == 6) {
            clear(10000)
        }
    };
    $(window).resize(function () {
        $('.slides-container').css({
            height: $(window).height()
        })
    })
    $(window).load(function () {
        $('.slides-container').css({
            height: $(window).height()
        })
        clear(30000)

    })
})