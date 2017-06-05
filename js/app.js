/**
 * Created by yuan on 2017/5/28.
 */
$(function(){
    var App, //App对象
        app, //app实例化
        $sliderWrapperWidth = $(".slider-wrapper").width(),
        $sliderImgContainer = $(".slider-wrapper .slider"),
        slideInterval;

    App = function(){};

    App.prototype = {
        handler: {
            slideGapFlag: false,
            sliderCtrl: function(isPrev, isClick){
                var $active = $(".slider .active"),
                    $sliderli = $(".slider li"),
                    curIndex = $active.data("index"),
                    indexing,
                    gapVal = 0,
                    moveLeft;

                if(isClick){
                    clearInterval(slideInterval)
                }

                if(!isPrev){
                    gapVal = $sliderli.length - 1;
                    moveLeft = - $sliderWrapperWidth;
                }else{
                    gapVal = 0;
                    moveLeft = $sliderWrapperWidth;
                }

                $active.find(".slider-content-wrapper").css({
                    top: "90%",
                    opacity: 0
                });

                if(isPrev ? curIndex <= gapVal : curIndex < gapVal){
                    var nextIndex = isPrev ? $sliderli.length - 1 : curIndex + 1;

                    $active.css({
                        left: ( isPrev ? - moveLeft : moveLeft ) + "px"
                    });

                    setTimeout(function(){
                        $active.css({
                            zIndex: -99,
                            left: $sliderWrapperWidth + "px"
                        });
                    }, 1000);

                    $active.removeClass("active");
                    $sliderli.eq(nextIndex).addClass("active").css({
                        left: 0
                    });
                    indexing = nextIndex;
                    this.slideGapFlag = true;
                }else{
                    var nextIndex = isPrev ? curIndex - 1 : 0;

                    $active.css({
                        left: (isPrev ? - moveLeft : moveLeft) + "px"
                    });

                    setTimeout(function(){
                        $active.css({
                            zIndex: -99,
                            left: $sliderWrapperWidth + "px"
                        });
                    }, 1000);

                    $active.removeClass("active");
                    $sliderli.eq(nextIndex).addClass("active").css({
                        left: 0,
                        zIndex: 8
                    });
                    indexing = nextIndex;
                }

                $(".slider-point .active").removeClass("active");
                $(".slider-point li").eq(indexing).addClass("active");
                $sliderli.eq(indexing).find(".slider-content-wrapper").css({
                    top: "50%",
                    opacity: 1
                });
            },
            productMouseover: function(e){
                $(this).addClass("active");
            },
            productMouseout: function(e){
                $(this).removeClass("active");
            },
            prevSlideClick: function(e){
                app.handler.sliderCtrl(true, true);
            },
            nextSlideClick: function(){
                app.handler.sliderCtrl(null, true);
            },
            initCharts: function(){
                var $el = $("#tlbsm-rate");

                if($el.length <= 0){
                    return false;
                }else{
                    var myChart = echarts.init(document.getElementById('tlbsm-rate'));

                    var option = {
                        title : {
                            text: '糖尿病患者失明患病率',
                            x:'center',
                            y: 'bottom',
                            textStyle: {
                                color: '#09a2de',
                                fontWeight: 'normal'
                            }
                        },
                        series : [
                            {
                                name:'糖尿病患者失明患病率',
                                type:'pie',
                                radius: ['50%', '70%'],
                                data:[
                                    {
                                        value: 0.07,
                                        name:'10年者 7%',
                                        itemStyle: {
                                            normal: {
                                                show: true,
                                                color: '#2ec7c9'
                                            },
                                            emphasis: {
                                                show: true
                                            }
                                        }
                                    },
                                    {
                                        value: 0.25,
                                        name:'10~14年者 25%',
                                        itemStyle: {
                                            normal: {
                                                show: true,
                                                    color: '#b6a2de'
                                            },
                                            emphasis: {
                                                show: true
                                            }
                                        }
                                    },
                                    {
                                        value: 0.7,
                                        name:'15年者 70%',
                                        itemStyle: {
                                            normal: {
                                                show: true,
                                                color: '#09a2de'
                                            },
                                            emphasis: {
                                                show: true
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    };

                    myChart.setOption(option)
                }
            },
            productChangeClick: function(e){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");

                $(".pro-content .active").fadeOut();
                $($(this).data("target")).fadeIn();
                $(".pro-content .active").removeClass("active");
                $($(this).data("target")).addClass("active");
            },
            backToTopClick: function(){
                $("body").animate({
                    scrollTop: $("body").offset().top
                }, 500)
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
            }, {
                trigger: "click",
                dom: ".pro-type li",
                fn: this.handler.productChangeClick
            }, {
                trigger: "click",
                dom: ".back-top-top",
                fn: this.handler.backToTopClick
            }];

            $.each(eventsTarget, function(index, target){
                $("body").on(target.trigger, target.dom, target.fn)
            });

            $(window).scroll(function(event){
                var $header = $(".header"),
                    scrollTop = $(window).scrollTop();

                if(scrollTop !== 0){
                    $header.addClass("active")
                }else{
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
        },
        render: function(){
            this.events();
            this.handler.initCharts();

            if($(".slider li").length > 1){
                slideInterval = setInterval(function(){
                    this.handler.sliderCtrl(null, false);
                }.bind(this), 3000)
            }
        }
    };

    app = new App();
    app.render();
});
