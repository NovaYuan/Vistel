/**
 * Created by yuan on 2017/5/28.
 */
var App, //App对象
    app; //app实例化

App = function(){};

App.prototype = {
    handler: {
        productMouseover: function(e){
            $(this).css({
                "background-image": 'url(./images/'+ $(this).attr("class") +'-a.png)'
            })
        },
        productMouseout: function(e){
            $(this).css({
                "background-image": 'url(./images/'+ $(this).attr("class") +'.png)'
            })
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
        }];

        $.each(eventsTarget, function(index, target){
            $("body").on(target.trigger, target.dom, target.fn)
        });
    }
};

app = new App();
app.events();