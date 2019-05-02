<template>
    <div>
        <div class="banner" >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:"ImgZoom",
        data () {

            return {
                startY:0,
                isTouchStart:false,
            }
        },
        methods: {
            //touchStart
            touchStart(e){
                this.$el.querySelector(".banner").classList.remove('heightback');
                //页面处于顶部才执行
                if(window.pageYOffset<=0){
                    this.isTouchStart=true;
                    this.startY = e.changedTouches[0].pageY;
                }else{
                    this.isTouchStart=false;
                }

            },
            //touchMove
            touchMove(e){
                if(this.isTouchStart){
                    var lastY=e.changedTouches[0].pageY;
                    if(lastY-this.startY>0){
                       // e.preventDefault();
                        var _height = 225  + (lastY - this.startY)/4 +'px';
                        this.$el.querySelector(".banner").style.height =_height;
                        this.$emit("updateHeight",_height)
                    }
                }
            },
            //touchEnd
            touchEnd(e){
                this.$el.querySelector(".banner").style.cssText = '';
                this.$el.querySelector(".banner").classList.add('heightback');
                this.isTouchStart=false;
                this.$emit("endHeight")

            },
        },
        mounted(){
            this.$nextTick(function(){
                document.body.addEventListener('touchstart',this.touchStart,false);
                document.body.addEventListener('touchmove',this.touchMove,false);
                document.body.addEventListener('touchend',this.touchEnd,false);
            });
        },
        destroyed () {
            document.body.removeEventListener('touchstart',this.touchStart,false);
            document.body.removeEventListener('touchmove',this.touchMove,false);
            document.body.removeEventListener('touchend',this.touchEnd,false);
        }
    }
</script>

<style scoped>

    .banner{ height:250px;background:#f5f5f5;}
    .heightback{ transition: height 0.5s;}
    .bgimg{width:100%;height:100%; display: block; object-fit:cover;}
</style>