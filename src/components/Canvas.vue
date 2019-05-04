<template>
    <div >
        <!--<div v-if="show"><img src="../assets/sample.jpg"></div>-->


        <div style="height: 400px;">
            <canvas id="canvas" width="600" height="600" style="border:solid black 1px;">
                你的浏览器不支持 canvas 元素。
            </canvas>
            <br>
            日志：<pre id="log" style="border: 1px solid #ccc;"></pre>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Canvas",
        data:function(){
            return {
                selected:1,
                show:false,
                defaultHeaderHeight:"250px",
                ongoingTouches:[]
            }
        },
        methods:{
            sendHeight(height){
                this.$refs['header'].classList.remove('heightback');
                this.$refs['fix-content'].classList.remove('heightback');
                this.defaultHeaderHeight = height
            },
            touchEnd(){
               this.$refs['header'].classList.add('heightback');
               this.$refs['fix-content'].classList.add('heightback');
               this.defaultHeaderHeight = "250px"
            },
            startup() {
                var el = document.getElementsByTagName("canvas")[0];
                el.addEventListener("touchstart", this.handleStart, false);
                el.addEventListener("touchend", this.handleEnd, false);
                el.addEventListener("touchmove", this.handleMove, false);
                this.log("初始化成功。")
            },
            handleStart(evt) {
                evt.preventDefault();
                console.log("触摸开始。");
                var el = document.getElementsByTagName("canvas")[0];
                var ctx = el.getContext("2d");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    console.log("开始第 " + i + " 个触摸 ...");
                    this.ongoingTouches.push(this.copyTouch(touches[i]));
                    var color = this.colorForTouch(touches[i]);
                    ctx.beginPath();
                    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);
                    // 在起点画一个圆。
                    ctx.fillStyle = color;
                    ctx.fill();
                    console.log("第 " + i + " 个触摸已开始。");
                }
            },
            handleMove(evt) {
                evt.preventDefault();
                var el = document.getElementsByTagName("canvas")[0];
                var ctx = el.getContext("2d");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    var color = this.colorForTouch(touches[i]);
                    var idx = this.ongoingTouchIndexById(touches[i].identifier);

                    if (idx >= 0) {
                        this.log("继续第 " + idx + "个触摸。");
                        ctx.beginPath();
                        this.log("ctx.moveTo(" + this.ongoingTouches[idx].pageX + ", " + this.ongoingTouches[idx].pageY + ");");
                        ctx.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
                        this.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
                        ctx.lineTo(touches[i].pageX, touches[i].pageY);
                        ctx.lineWidth = 4;
                        ctx.strokeStyle = color;
                        ctx.stroke();

                        this.ongoingTouches.splice(idx, 1, this.copyTouch(touches[i])); // 切换触摸信息
                        console.log(".");
                    } else {
                        this.log("无法确定下一个触摸点。");
                    }
                }
            },
            handleEnd(evt) {
                evt.preventDefault();
                this.log("触摸结束。");
                var el = document.getElementsByTagName("canvas")[0];
                var ctx = el.getContext("2d");
                var touches = evt.changedTouches;

                for (var i = 0; i < touches.length; i++) {
                    var color = this.colorForTouch(touches[i]);
                    var idx = this.ongoingTouchIndexById(touches[i].identifier);

                    if (idx >= 0) {
                        ctx.lineWidth = 1;
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.moveTo(this.ongoingTouches[idx].pageX, this.ongoingTouches[idx].pageY);
                        ctx.lineTo(touches[i].pageX, touches[i].pageY);
                        ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);
                        // 在终点画一个正方形
                        this.ongoingTouches.splice(idx, 1); // 用完后移除
                    } else {
                        this.log("无法确定要结束哪个触摸点。");
                    }
                }
            },
            ongoingTouchIndexById(idToFind) {
                for (var i=0; i<this.ongoingTouches.length; i++) {
                    var id = this.ongoingTouches[i].identifier;

                    if (id == idToFind) {
                        return i;
                    }
                }
                return -1;    // 未找到
            },
            log(msg) {
                var p = document.getElementById('log');
                p.innerHTML = msg + "\n" + p.innerHTML;
            },
            colorForTouch(touch) {
                var r = touch.identifier % 16;
                var g = Math.floor(touch.identifier / 3) % 16;
                var b = Math.floor(touch.identifier / 7) % 16;
                r = r.toString(16); // 转换为十六进制字符串
                g = g.toString(16); // 转换为十六进制字符串
                b = b.toString(16); // 转换为十六进制字符串
                var color = "#" + r + g + b;
                this.log("identifier " + touch.identifier + " 触摸的颜色为：" + color);
                return color;
            },
            copyTouch(touch) {
                return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
            }
        },
        computed:{
            faceHeight(){
                let w =  document.body.clientWidth
                return (w/3) + "px"
            }
        },

        mounted() {
            this.startup()
        }
    }
</script>

<style scoped>
    .back-group {
        overflow: hidden;
        height: 16rem;
    }
    .fix-content{
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        background-color:#fffdfd;
        text-align: center;
        opacity: 0.9;
    }
    .fix-content-child{
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
    /*    background-color:#fffdfd;*/
        text-align: center;
        opacity: 0.9;
    }
    .panel{
        background-color: #ffffff;
        box-shadow: 0 0 5px 2px #d4d0d0;
    }

    .header-section{
        height: 16rem;
        text-align: center;
    }
    .header-img{
        padding-left: 0.8rem;
        padding-top: 0.8rem;


    }
    .header-img img{
        box-shadow: 0 0 5px 2px #d4d0d0;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;

    }
    .attr span{
        display: inline-block;
        font-size: 1rem ;
        color: #3c3c3c;
        line-height: 2rem;
    }
    .attr .value{
        text-align: left;
        color: #939393;
    }
    .heightback{ transition: height 0.5s;}
    .panel >ul{
        padding: 0 !important;
        margin: 0;
        border: 0;
        list-style-type: none;
    }
    .panel li {
        display: inline-block;
        width: 33.3%;
        float: left;
        margin-bottom: 3px;
        overflow: hidden;
    }
    .panel li div{
        margin-left: 2px;
        margin-right: 2px;
    }
    .panel li div img{


    }
    .attention{
        width: 80px;
        background-color: #0777e6;
        text-align: center;
        line-height: 40px;
        vertical-align: middle;
        color: #ffffff;
        position: fixed;
        bottom: 70px;
        left: 0;
        right: 0;
        box-shadow: 2px 2px 5px 2px #d4d0d0;

    }

    .filter {
        height: 100%;
        width: 100%;
        filter: grayscale(0.5) blur(2px);
    }
    .badge-space{
        background-color: #b0b4bd;
        margin-right: 3px;
        line-height: 1.2rem;
        border-radius: 5%;

    }

    .badge-space div{
        display: inline-block;

    }
    .badge-space .first{
        width: 30%;
        text-align: center;
    }
    .badge-space .second{
        width: 70%;
        text-align: left;
    }
    .my-name{
        font-size: 1.5rem !important;
        color: #222222 !important;
        vertical-align: middle;
        margin-right: 1rem;
    }
</style>