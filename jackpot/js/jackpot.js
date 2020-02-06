$(function () {
    function widthFnc(e) {
        var $liList = $(e).children('li');
        var sum = 0;
        if ($liList.hasClass('classhidden')) {
            $('.classhidden').css({
                width: 0
            })
        }
        for (var i = 0; i < $liList.length; i++) {
            sum += $liList.eq(i).width()
        }
        $(e).css({
            width: sum + 80
        })
    };

    function fn(amount, e, name) {
        var numComma = numberFormat(amount),
            num = [], count = 0,
            $numList = $(e),
            $li = $numList.children('li'),
            max = $li.length;

        for (var i = numComma.length - 1; i >= 0; i--) {
            num.push(numComma[i]);
        }
        for (var i = max - 1; i >= 0; i-- , count++) {
            if (typeof num[count] !== 'undefined') {
                if (num[count] == ',') {
                    $li[i].className = 'comma';
                } else if (num[count] == '.') {
                    $li[i].className = 'point';
                } else {
                    $li[i].className = name + num[count];
                }
            } else {
                $li[i].className = name + 'hidden';
            }
        }
    } (amount);

    fn(amount, '#numList', 'class');
    fn(total_prize, '#list1', 'p_class');
    fn(first_prize, '#list2', 'p_class');

    function numberFormat(e) {
        return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    $(window).on('resize load', function () {
        widthFnc('#numList');
    });

    function listw(e) {
        var len = $(e).find('.p_classhidden');
        $(e).css({
            'margin-left': len.length * 4 + '%'
        })
    };

    for (var i = 1; i <= 2; i++) {
        listw('#list' + i);
    }
});

$(function () {
    var $maincont = $(".slides-container>li");
    var mainidx = 0, maxIdx = 9, unit_clear_time = 10000, basic_clear_time = 3 * unit_clear_time;
    var video = document.getElementById('video')
    var timer = null;

    function move() {
        var idx = mainidx,
            key = 7;

        if (mainidx > key) {
            idx -= key;
        }

        $maincont.eq(idx).fadeIn().siblings().fadeOut();
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
        if (mainidx == 1 || mainidx == 2 || mainidx == 8 || mainidx == 9) {
            clear(basic_clear_time);
        } else if (mainidx == 0) {
            clear(basic_clear_time);
        } else if (mainidx == 3 || mainidx == 4 || mainidx == 5 || mainidx == 6 || mainidx == 7) {
            clear(unit_clear_time);
        }
    };
    $(window).on('resize load', function () {
        $('.slides-container').css({
            height: $(window).height()
        })
    })
    $(window).load(function () {
        clear(basic_clear_time);
    })
    move();
})
