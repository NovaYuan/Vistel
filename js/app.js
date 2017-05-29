/**
 * Created by yuan on 2017/5/28.
 */
$(function(){
    var App, //App对象
        app, //app实例化
        $sliderWrapperWidth = $(".slider-wrapper").width();

    App = function(){};

    App.prototype = {
        handler: {
            sliderCtrl: function(isPrev){
                var $active = $(".slider .active"),
                    $sliderli = $(".slider li"),
                    curIndex = $active.index(),
                    indexing,
                    gapVal = 0;

                if(!isPrev){
                    gapVal = $sliderli.length - 1
                }


            },
            productMouseover: function(e){
                $(this).addClass("active");
            },
            productMouseout: function(e){
                $(this).removeClass("active");
            },
            prevSlideClick: function(e){
                var $active = $(".slider .active"),
                    $sliderli = $(".slider li"),
                    curIndex = $active.index(),
                    indexing;

                $active.find(".slider-content-wrapper").css({
                    top: "90%",
                    opacity: 0
                });

                if(curIndex <= 0){
                    $active.css({
                        left: $sliderWrapperWidth + "px"
                    });

                    $active.removeClass("active");
                    $sliderli.eq($sliderli.length - 1).addClass("active").css({
                        left: 0
                    });
                    indexing = $sliderli.length - 1;
                }else{
                    $active.css({
                        left: $sliderWrapperWidth + "px"
                    });

                    $active.removeClass("active");
                    $sliderli.eq(curIndex - 1).addClass("active").css({
                        left: 0
                    });
                    indexing = curIndex - 1;
                }

                $(".slider-point .active").removeClass("active");
                $(".slider-point li").eq(indexing).addClass("active");
                $sliderli.eq(indexing).find(".slider-content-wrapper").css({
                    top: "50%",
                    opacity: 1
                })
            },
            nextSlideClick: function(){
                var $active = $(".slider .active"),
                    $sliderli = $(".slider li"),
                    curIndex = $active.index(),
                    indexing;

                if(curIndex < $sliderli.length - 1){
                    $active.css({
                        left: - $sliderWrapperWidth + "px"
                    });

                    $active.removeClass("active");
                    $sliderli.eq(curIndex + 1).addClass("active").css({
                        left: 0
                    });
                    indexing = curIndex + 1;

                }else{
                    $active.css({
                        left: -$sliderWrapperWidth + "px"
                    });

                    $active.removeClass("active");
                    $sliderli.eq(0).addClass("active").css({
                        left: 0
                    });
                    indexing = 0;
                }

                $(".slider-point .active").removeClass("active");
                $(".slider-point li").eq(indexing).addClass("active");
            }
        },
        events: function(){
            var eventsTarget = [{
                trigger: "mouseover",
                dom: ".product ul li p",
                fn: this.handler.productMouseover
            },{
                trigger: "mouseout",
                dom: ".product ul li p",
                fn: this.handler.productMouseout
            },{
                trigger: "click",
                dom: ".slider-arrow.prev",
                fn: this.handler.prevSlideClick
            },{
                trigger: "click",
                dom: ".slider-arrow.next",
                fn: this.handler.nextSlideClick
            }];

            $.each(eventsTarget, function(index, target){
                $("body").on(target.trigger, target.dom, target.fn)
            });

            $(window).scroll(function(event){
                var $header = $(".header"),
                    scrollTop = $(window).scrollTop();

                if(scrollTop !== 0){
                    $header.addClass("active")
                }else if(scrollTop <= 150){
                    $header.removeClass("active")
                }
            });

            $(".slider-wrapper .slider .active .slider-content-wrapper").css({
                top: "50%",
                opacity: 1
            });
            $(".slider-wrapper .slider li:not('.active')").css({
                left: $sliderWrapperWidth + "px"
            })
        }
    };

    app = new App();
    app.events();
});
