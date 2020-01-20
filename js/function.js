$(function(){

    $(window).load(function(){
        $("h1").stop().animate({"opacity":1,"padding-top":"200px"},700);
        $(".line>ul>li").css({"opacity":0});
        
    });
    
    
     $(".totop>a").click(function(evt){
        evt.preventDefault();
        $("body,html").stop().animate({
            "scrollTop":0
        },900);
    });
    
    var arr = [];
    var $indicator = $("header>nav>ul>li>a");
    var idx = 0;
    
 /*   $("article").each(function(index){
        arr[index] = $(this).offset().top;
    });
    */
    
    var setArrArtiTop = function(){
        arr[0] = $(".atc01").offset().top;
        arr[1] = $(".atc02").offset().top;
        arr[2] = $(".atc03").offset().top;
        arr[3] = $(".atc04").offset().top; 
    };
    
    $(window).on("load resize", function(){
        
        setArrArtiTop();
    })

    
    $indicator.click(function(evt){
        evt.preventDefault();
        idx = $indicator.index(this);
        
        $("body,html").stop().animate({
            "scrollTop":arr[idx]-100
        },700);
    });
    
    $(".click_btn").click(function(evt){
        evt.preventDefault();
        
        $("body,html").stop().animate({
            "scrollTop":arr[0]
        },600);
    });
    
    $(window).on("scroll",function(){
        var scrollTop = $(window).scrollTop();
        if(scrollTop<$(".main_bg").height()){
            $(".totop").fadeOut();
        }
        if(scrollTop>=arr[0]-100){
            $(".totop").fadeIn();
            $("header").addClass("n_fixed");
            $(".atc01").css({"margin-top":"100px"});
            $(".h2_01").stop().animate({"left":0},600);
        }else{
            $("header").removeClass("n_fixed");
            $(".atc01").css({"margin-top":"0"});
            
        }
        
        for(i=0;i<$indicator.size();i++){
            if(scrollTop>=arr[i]-100){ $indicator.eq(i).parent().addClass("on").siblings().removeClass("on");
            }else{
                $indicator.eq(i).parent().removeClass("on");
            }
        }
        
        if(scrollTop>=arr[1]-100){
            $(".h2_02").stop().animate({"left":0});
            $(".line>ul>li:nth-child(1)").stop().animate({
                "opacity":"1"
            },400,function(){
                $(".line>ul>li:nth-child(2)").stop().animate({
                    "opacity":"1"
                },400,function(){
                    $(".line>ul>li:nth-child(3)").stop().animate({
                        "opacity":"1"
                    },400,function(){
                        $(".line>ul>li:nth-child(4)").stop().animate({"opacity":"1"},400,function(){
                            $(".line>ul>li:nth-child(5)").stop().animate({"opacity":"1"},400,function(){
                                $(".line>ul>li:nth-child(6)").stop().animate({"opacity":"1"});
                            });
                        });
                    });
                });
            });
            $('.chart').easyPieChart({
            barColor:'#fbe9c9'
            });
        }
        if(scrollTop>=arr[2]-100){
            $(".h2_03").stop().animate({"left":0});
        }
        if(scrollTop>=arr[3]-100){
            $(".h2_04").stop().animate({"left":0});
            new WOW().init();
        }

        
        
        
    
    });
    
    
    
    /* 슬라이드 배너 */
    
    var $paging = $(".paging>ul>li>a");
    var pagingIdx = 0;
    
    $paging.click(function(evt){
        evt.preventDefault();
        
        pagingIdx = $paging.index(this);
        
        $(".slides>.slides-container>li").eq(pagingIdx).fadeIn().siblings().fadeOut();
        
        $(this).parent().addClass("on").siblings().removeClass("on");
    });
    
    $(".prev").click(function(evt){
        evt.preventDefault();
        if(pagingIdx>=1){
            pagingIdx--;
            $(".slides>.slides-container>li").eq(pagingIdx).fadeIn().siblings().fadeOut();
            
        }else{
            pagingIdx=9;
            $(".slides>.slides-container>li").eq(pagingIdx).fadeIn().siblings().fadeOut();
        }
        $paging.eq(pagingIdx).parent().addClass("on").siblings().removeClass("on");
    });
    
    $(".next").click(function(evt){
        evt.preventDefault();
        if(pagingIdx<=8){
            pagingIdx++;
            $(".slides>.slides-container>li").eq(pagingIdx).fadeIn().siblings().fadeOut();
        }else{
            pagingIdx = 0;
            $(".slides>.slides-container>li").eq(pagingIdx).fadeIn().siblings().fadeOut();
        }
        $paging.eq(pagingIdx).parent().addClass("on").siblings().removeClass("on");
    });
    
    $(".slides-container>li:nth-child(1)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage01").fadeIn();
    });
    $(".slides-container>li:nth-child(2)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage02").fadeIn();
    });
    $(".slides-container>li:nth-child(3)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage03").fadeIn();
    });
    $(".slides-container>li:nth-child(5)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage04").fadeIn();
    });
    $(".slides-container>li:nth-child(6)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage05").fadeIn();
    });
    $(".slides-container>li:nth-child(7)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage06").fadeIn();
    });
    $(".slides-container>li:nth-child(8)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage07").fadeIn();
    });
    $(".slides-container>li:nth-child(9)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage08").fadeIn();
    });
    $(".slides-container>li:nth-child(10)>h3>a").click(function(evt){
        evt.preventDefault();
        $(".morepage09").fadeIn();
    });
   $(".close,.morepage").click(function(){
       $(".morepage").fadeOut();
   });
    
    $(document).keyup(function(evt){
       if(evt.which==27){$(".morepage").hide();};
      });
    
    $(".morepage>.more_cont").on({
        "click":function(evt){
            evt.stopPropagation();
        }
    });
    
});



