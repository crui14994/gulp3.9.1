;(function($,window,document,undefined){
    //定义插件myplugin，在插件中使用MyPlugin对象
    $.fn.scrollImg = function(options){
        return this.each(function() { //保持插件的链式调用，确保插件返回this关键字
            //创建MyPlugin的实体
            var sImg = new scrollImg(this,options);
            //调用其方法
            return sImg.init();
        })

    }
    //定义MyPlugin对象
    var scrollImg = function(ele,opt){
        this.$element = ele,           //获取到的jQuery对象console.log(this);
            // 设置默认参数
            this.defaults = {
                t:3000, //自动轮播的时间
                isBtn:true, //是否显示按钮
                isDot:true, //是否显示圆点导航
                auto:true, //是否自动轮播
                n:0,  //移动次数
                offsetW:10, //li间的间隙
                num:3,  //在视图显示出来li的个数
                scrollBox:"scroll-box" //ul盒子
            },
            this.options = $.extend({}, this.defaults, opt);
        //////定义全局变量
        var _this = this,
            t=_this.options.t,
            timer=null,
            animate=true,
            isBtn=_this.options.isBtn,
            isDot=_this.options.isDot,
            num=_this.options.num,  //在视图显示出来li的个数
            n=_this.options.n,    //移动次数
            offsetW=_this.options.offsetW, //li间的间隙
            $scrollBox=$(this.$element).find("."+_this.options.scrollBox), //ul盒子
            $liArr=$scrollBox.children("li"), //ul盒子中所有的li
            liNum=$liArr.length,    //li的数量
            w=$(this.$element).width(),  //最外层盒子的宽度
            liW=(w/num)-offsetW+(offsetW/num),      //li的宽度
            dotUl=null, // 小圆点ul
            dotLis=[], //小圆点数组
            i=liNum,  //记录小圆点的中间变量
            leftA=null, //左边按钮
            rightA=null, //右边按钮
            auto = _this.options.auto;  //是否自动轮播
        //将第一个和最后一个元素复制多次次
        _this.addElemetn=function(){
            var first=$scrollBox.children("li:lt("+num+")").clone();
            var last=$scrollBox.children("li:gt("+(liNum-num-1)+")").clone();
            $scrollBox.append(first);
            $scrollBox.prepend(last);
            $liArr=$scrollBox.children("li"); //ul盒子中所有的li
            liNum=$liArr.length;   //li的数量
        };
        //添加小圆点
        _this.addDot=function(){
            if(isDot){
                var dotDiv = document.createDocumentFragment();
                dotUl=document.createElement("ul");
                $(dotUl).addClass("scrollImg-ul");
                for(var i=0;i<(liNum-num*2);i++){
                    var li=document.createElement("li");
                    $(dotUl).append(li);
                }
                $(dotDiv).append(dotUl);
                $(_this.$element).append(dotDiv);
                dotLis=$(dotUl).find("li");
                $(dotLis[0]).addClass("scrollImg-li-active");

                $(dotUl).css({"width":dotLis.length*20+"px"});
            }
        };
        //添加按钮
        _this.addBtn=function(){
            if(isBtn){
                var btnDiv = document.createDocumentFragment();
                leftA=document.createElement("a");
                $(leftA).addClass("scrollImg-btn sb-left");
                rightA=document.createElement("a");
                $(rightA).addClass("scrollImg-btn sb-right");
                $(btnDiv).append(leftA);
                $(btnDiv).append(rightA);
                $(_this.$element).append(btnDiv);
            }
        }
        //更新页面
        _this.updataPage=function(){
            _this.addElemetn();
            $scrollBox.css({"width":(liNum+3)*liW+"px","margin-left":-offsetW*(num+1)-(liW*num)+"px"});
            $liArr.each(function(){
                $(this).css({"width":liW+"px","margin-left":offsetW+"px"});
            });
            _this.addBtn();
            _this.addDot();
        };
        //移动
        _this.move=function(callback){
            var moveW= liW+offsetW;
            $scrollBox.stop(false,true).animate({"left":-moveW*n+"px"},callback);
            //$scrollBox.stop(false,true).animate({"left":-moveW*n+"px"},callback);
        }
        //向左移动
        _this.moveLeft=function(){
            n++;
            i=n;
            $(dotLis[i]).addClass("scrollImg-li-active").siblings().removeClass("scrollImg-li-active");
            _this.move(function(){
                if(n>=(liNum-(num*2))){
                    $scrollBox.css({"left":"0px"});
                    n=0;
                    $(dotLis[n]).addClass("scrollImg-li-active").siblings().removeClass("scrollImg-li-active");
                }
            });
        };
        //向右移动
        _this.moveRight=function(){
            if(animate){
                animate=false,
                    n--;
                i--;
                (i<0)&&(i=dotLis.length-1);
                $(dotLis[i]).addClass("scrollImg-li-active").siblings().removeClass("scrollImg-li-active");
                _this.move(function(){
                    if(n<=-num){
                        n=liNum-(num*2)-num;
                        $scrollBox.css({"left":(liW+offsetW)*(-n)+"px"});
                    };
                    animate=true;
                });
            }
        }
        //自动轮播
        _this.auto=function(){
            if(auto){
                timer=setInterval(_this.moveLeft,t);
            }
        };
        //绑定事件
        _this.bindEnevt=function(){
            //当鼠标进入时停止轮播，移开时开始轮播
            $(_this.$element).hover(function(){
                clearInterval(timer);
                timer=null;
            },function(){
                _this.auto();
            });
            $(rightA).on("click",function(){
                _this.moveLeft();
            });
            $(leftA).on("click",function(){
                _this.moveRight();
            });
            $(dotUl).on("click","li",function(){
                i=$(this).index();
                n=i;
                $(dotLis[i]).addClass("scrollImg-li-active").siblings().removeClass("scrollImg-li-active");
                _this.move();
            });
        };
    };
    //定义MyPlugin对象的方法
    scrollImg.prototype = {
        init:function(){
            var _this=this;
            //处理DOM
            _this.updataPage();
            _this.auto();
            _this.bindEnevt();
        }
    }

})(jQuery,window,document);