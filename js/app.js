/**
 * Created by yuan on 2017/5/28.
 */
$(function(){
    var App, //App对象
        app, //app实例化
        $sliderWrapperWidth = $(".slider-wrapper").width(),
        $sliderImgContainer = $(".slider-wrapper .slider"),
        $sliderli = $(".slider li"),
        slideInterval;

    App = function(){};

    App.prototype = {
        handler: {
            slideGapFlag: false,
            sliderCtrl: function(isPrev, isClick){
                var $active = $sliderli.filter(".active"),
                    curIndex = $active.data("index"),
                    indexing,
                    gapVal = 0,
                    moveLeft;

                if(isClick){
                    clearInterval(slideInterval);
                    setTimeout(function(){
                    	clearInterval(slideInterval);
	                    slideInterval = setInterval(function(){
	                        this.sliderCtrl(null, false);
	                    }.bind(this), 3000)
                    }.bind(this), 1000);
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
                    indexing = nextIndex;
                    
                    $active.css({
                        left: ( isPrev ? - moveLeft : moveLeft ) + "px"
                    });

                    setTimeout(function(){
                        $active.css({
                            zIndex: -99,
                            left: $sliderWrapperWidth + "px"
                        });
                        $active.addClass("inactive");
                        $active.removeClass("active");
                        $sliderli.eq(nextIndex).addClass("active");
                        
                    }, 1000);
                    
                    this.slideGapFlag = true;
                    $sliderli.eq(nextIndex).css({
                        left: 0
                    });
                }else{
                    var nextIndex = isPrev ? curIndex - 1 : 0;
                    indexing = nextIndex;
                    
                    $active.css({
                        left: (isPrev ? - moveLeft : moveLeft) + "px"
                    });

                    setTimeout(function(){
                        $active.css({
                            zIndex: -99,
                            left: $sliderWrapperWidth + "px"
                        });
                        $active.addClass("inactive");
                        $active.removeClass("active");
                        $active.removeClass("inactive");
                        $sliderli.eq(nextIndex).addClass("active");
                        
                    }, 1000);

                 
                    $sliderli.eq(nextIndex).css({
                        left: 0,
                        zIndex: 8
                    });
                }

                $(".slider-point .active").removeClass("active");
                $(".slider-point li").eq(indexing).addClass("active");
                $sliderli.eq(indexing).find(".slider-content-wrapper").css({
                    top: "50%",
                    opacity: 1
                });
            },
            productMouseover: function(e){
                $(this).css(
                    'background-image',
                    'url(' + $(this).data('url1') + ')'
                );
            },
            productMouseout: function(e){
                $(this).css(
                    'background-image',
                    'url(' + $(this).data('url0') + ')'
                );
            },
            prevSlideClick: function(e){
            	app.handler.sliderCtrl(true, true);
            },
            nextSlideClick: function(){
            	app.handler.sliderCtrl(null, true);
            },
            initProductMove: function(){
                var $els = $(".product ul li p");
                $els.each(function() {
                    $(this).css(
                        'background-image',
                        'url(' + $(this).data('url0') + ')'
                    );
                })
            },
            productChangeClick: function(e){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");

                $(".pro-content .active").fadeOut();
                $($(this).data("target")).fadeIn();
                $(".pro-content .active").removeClass("active");
                $($(this).data("target")).addClass("active");
            },
            businessFormSubmit: function(e){
            	var $submit = $(this).find(":submit");
            	var $errorMessage = $(this).find(".errorMessage");
            	var errorMessage = '';
            	if (!this.companyName.value && !this.contact.value) {
            		errorMessage = '公司/机构名称、联系人必须填一个'
            	} 
            	if (!this.phoneNumber.value && !this.email.value) {
            		errorMessage = '手机、Email必须填一个'
            	}
            	if (errorMessage) {
            		$errorMessage.html(errorMessage).show();
            		return false;
            	} else {
            		$errorMessage.hide();
            	}
            	$submit.prop('disabled', true)
            	$.ajax({
            		method: 'POST',
            		url: this.action,
            		data:$(this).serialize(),
            		success: function(data) {
            			$errorMessage.html("提交成功，请您等待客户与您联系！！").css('color','green').show();
	            	},
	            	error: function(data) {
	            		$errorMessage.html("请求错误，请稍后再试！！").show();
	            	},
	            	complete: function(){
	            		
	            	}
            	})
            	return false;
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
                trigger: "submit",
                dom: "#businessForm",
                fn: this.handler.businessFormSubmit
            }, {
                trigger: "click",
                dom: ".back-top-top",
                fn: this.handler.backToTopClick
            }];

            $.each(eventsTarget, function(index, target){
                $("body").on(target.trigger, target.dom, target.fn)
            });

            var $header = $(".header"), $backToTopClick = $(".back-top-top");
            $(window).scroll(function(event){
                var scrollTop = $(window).scrollTop();

                if(scrollTop !== 0){
                    $header.addClass("active")
                    $backToTopClick.show('slow');
                }else{
                    $header.removeClass("active")
                    $backToTopClick.hide('slow');
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
            this.handler.initProductMove();


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
