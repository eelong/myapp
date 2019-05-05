<template>
    <div >
        <!--<div v-if="show"><img src="../assets/sample.jpg"></div>-->
        <div style="position: relative" class="header" ref="header" :style="{height:defaultHeaderHeight}">
            <img-zoom v-on:updateHeight="sendHeight"   v-on:endHeight="touchEnd">
                <img  class="bgimg" src="../assets/bg5.jpg">
            </img-zoom>
            <div  class="fix-content" ref="fix-content" :style="{height:defaultHeaderHeight}"  >
                <div class="fix-content-child">
                <el-row>
                    <div class="header-img">
                        <img  src="../assets/bg5.jpg">
                    </div>
                </el-row>
                <el-row>
                    <div class="attr">
                        <span class="value my-name">哎呦累</span>
                        <mt-badge color="#B0B4BD" size="normal" style="color: #ffffff;font-size: 0.8rem;font-weight: 300;height: 0.8rem;line-height: 0.8rem!important;">VIP</mt-badge>
                    </div>
                </el-row>
                <el-row>
                    <div class="attr">
                        <span  class="value">27 / 176 cm / 65 kg <mt-badge color="#B0B4BD" size="small" style="line-height: 0.8rem;color: #ffffff;padding-left: 0.5rem;padding-right: 0.5rem">~</mt-badge></span>
                    </div>
                </el-row>
                <el-row>
                    <div class="attr">
                        <span class="value"> "瞎聊呗"</span>
                    </div>
                </el-row>
                <el-row style="color: #ffffff;">

                    <div style="margin: 0 auto;width: 65%;font-size: 0.7rem">
                        <el-col :span="7">
                            <div class="badge-space">
                                <div class="first">
                                    <span class="iconfont icon-ico_home_committed"></span>
                                </div>
                                <div class="second">
                                    <span>51秒前</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="badge-space">
                                <div class="first">
                                    <span class="iconfont icon-position"></span>
                                </div>
                                <div class="second">
                                    <span>0.48km</span>
                                </div>
                            </div>

                        </el-col>
                        <el-col :span="10">
                            <div class="badge-space">
                                <div class="first">
                                    <span class="iconfont icon-faxian"></span>
                                </div>
                                <div class="second" >
                                    <span>广东 深圳</span>
                                </div>
                            </div>

                        </el-col>
                    </div>
                </el-row>
                <el-row >
                    <div class="attr" style="width: 50%;margin: 0.8rem auto;line-height: 2rem;height: 2rem">
                        <el-col :span="12"><span style="color: #C2C2C2;">关注&nbsp;&nbsp;</span>4</el-col>
                        <el-col :span="12"><span style="color: #C2C2C2;">粉丝&nbsp;&nbsp;</span>2</el-col>
                    </div>
                </el-row>
                </div>
            </div>
        </div>

        <div style="margin-top: 0.5rem">
            <mt-navbar v-model="selected">
                <mt-tab-item :id="1">
                    <span class="iconfont icon-pic-line-copy-copy"> </span>
                </mt-tab-item>
                <mt-tab-item :id="2">
                    <span class="iconfont icon-iconset0351-copy"></span>
                </mt-tab-item>
                <mt-tab-item :id="3">
                    <span class="iconfont icon-wode"> </span>
                </mt-tab-item>
            </mt-navbar>
            <div style="margin-bottom: 0.5rem"></div>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item :id="1">
                    <div class="panel">
                        <ul @click="dispathRoute">
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg_2.jpg"></div>
                            </li>
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg4.jpg"></div>
                            </li>
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg.jpg"></div>
                            </li>
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg_3.png"></div>
                            </li>
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg_2.jpg"></div>
                            </li>

                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg5.jpg"></div>
                            </li>
                            <li :style="{height:faceHeight}">
                                <div><img src="../assets/bg.jpg"></div>
                            </li>
                        </ul>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item :id="2">
                    <mt-cell  :key="n" v-for="n in 4" :title="'测试 ' + n" />
                </mt-tab-container-item>
                <mt-tab-container-item :id="3">
                    <mt-cell :key="n" v-for="n in 6" :title="'选项 ' + n" />
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <div class="attention">关注</div>
    </div>
</template>

<script>
    import ImgZoom from "../command/ImgZoom"
    export default {
        name: "Detail",
        data:function(){
            return {
                selected:1,
                show:false,
                defaultHeaderHeight:"250px"
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
            dispathRoute(e){
                let target = e.target
                this.$store.commit("bottomBar",false)
                this.$router.push({path:"/view-image",query : { src:target.src }} )
            }
        },
        computed:{
            faceHeight(){
                let w =  document.body.clientWidth
                return (w/3) + "px"
            }
        },
        components:{
            ImgZoom
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
        line-height: calc(100% + 9px);
        border-radius: 5%;
        vertical-align: middle;

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