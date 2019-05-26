<template>
    <div>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="list-users">
                <ul>
                    <li :style="{height: liHeight}"   @click="dispatchRoute(`/detail/${item.id}`)" :key="item.id" v-for="item in list" >
                        <MieBa :isDestory="item.destory" :id-name="`image-${item.id}`">
                            <div  :style="{height: liDivHeight}" class="warp-div">
                                <img src="../assets/header_img/icon-test_2.png">
                                <div style="position: relative;bottom: 20px;right: 0px">{{item.id}}</div>
                            </div>
                        </MieBa>
                    </li>
                </ul>
                <div :style="{position: 'fixed',bottom: this.$store.getters.fixMiddleHeight,right:'1rem','box-shadow': '1px 1px 5px #888888','border-radius':'50%'}">
                    <div :class="{thanosDestory:destory,thanosBack:back, thanosBackhover:isBack,thanosDestoryhover:isDestory}"  ref="anthos" @click="thanos"></div>
                    <audio  ref="music-destory" style="width: 200px;height: 50px">
                        <source  src="../assets/thanos_snap_sound.b746c7d7.mp3" type="audio/mp3">
                    </audio>
                    <audio  ref="music-back" style="width: 200px;height: 50px">
                        <source  src="../assets/thanos_dust_1.ad4820bd.mp3" type="audio/mp3">
                    </audio>
                </div>
        </div>
        </mescroll-vue>

    </div>

</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import 'mescroll.js/mescroll.min.css'
    import {mapGetters} from 'vuex'
    import MieBa from './MieBa'
    import top from "../assets/logo.png"
    import chancerand from 'chance'
    const chance = new chancerand()
    export default {
        name: "PageTwo",
        data:function () {
            return {
                destoryNum:4,
                destory:false,
                back:true,
                isDestory:false,
                isBack:false,
                page:'Page Two',
                mescroll: null, // mescroll实例对象
                pageNum:4,
                startId:5,
                list:[
                    {
                        id:1,
                        img:'',
                        destory:true,
                    },
                    {  id:2,
                        img:'',
                        destory:true
                    },
                    {  id:3,
                        img:'',
                        destory:true
                    },
                    {  id:4,
                        img:'',
                        destory:true
                    }
                ],
                mescrollDown:{
                    callback: this.upCallback,
                    //htmlContent:"<p class=\"downwarp-progress\"></p><p class=\"downwarp-tip\">abcdfe</p>",
                    use:true,
                    auto:true,
                    autoShowLoading:true,
                    onMoving:function(a,b,c){
                       // console.log(c)
                    },
                    beforeLoading:function(a){
                        console.log("准备触发下拉刷新的回调")

                    },
                    showLoading:function(a){
                        console.log("显示下拉刷新进度的回调")
                    },
                    afterLoading:function(a){

                        console.log("结束加载中,准备隐藏下拉的回调")

                    }
                }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)

                mescrollUp:{
                    callback: this.downCallback,
                    noMoreSize:5,
                    offset:200,
                    onScroll:function(a,b,v){
                       // console.log(b,v)
                    },
                    toTop:{
                       /* src:top,
                        offset:-200*/
                    }
                },
                dataList:[],
                chance:chance
            }

        },
        methods:{
            thanos(){
                this.destory = !this.destory
                this.back = !this.back
                this.isDestory = this.destory
                this.isBack = this.back
                if(this.destory){
                    console.log("....")
                    this.$refs['music-destory'].play()
                    for(let i=0;i<this.destoryNum;i++){
                        let rand = this.chance.integer({min:0,max:this.list.length-1})
                        setTimeout( () => {
                            this.list[rand].destory = false
                        },1500*i)

                    }
                }
                if(this.back){
                    this.$refs['music-back'].play()
                    for(let item of this.list){
                        item.destory = true
                    }
                }
            },
            dispatchRoute(route){
                this.$router.push(route)
            },
            mescrollInit (mescroll) {

                this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
            },
            upCallback(mescroll){
                console.log(mescroll)
                console.log("下拉执行回调")
                setTimeout(function(){
                    mescroll.endSuccess(10)
                    console.log("下拉结束执行回调")
                },0)

            },
            downCallback(page,mescroll){
                console.log("上拉执行回调")
                setTimeout(() => {
                    for(let i=0;i<8;i++){
                        let data = {
                            id:this.startId,
                            img:'',
                            destory:true
                        }
                        this.list.push(data)
                        this.startId++
                    }
                    console.log(this.startId)
                    if(this.startId >= 28){
                        mescroll.endSuccess(5)
                    }else{
                        mescroll.endSuccess(10)
                    }
                },500)

            }
        },
        watch:{

        },
        computed:{
            ...mapGetters(['liHeight','liDivHeight'])
        },
        components:{
            MescrollVue,
            MieBa
        },
        mounted() {

        }
    }
</script>

<style >

    .thanosDestory{
        background-position: 0 0;
        height: 80px;
        width: 77px;
        background-image: url("../assets/thanos_snap.3a36d79c.png");
        animation-direction: normal;
        animation-iteration-count: inherit;
        animation-duration: 2.8s;
        animation-fill-mode: none;
        animation-timing-function: steps(47);
    }

    .thanosBack{
        background-position: 0 0;
        height: 80px;
        width: 77px;
        background-image: url("../assets/thanos_reverse.41a10553.png");
        animation-direction: normal;
        animation-iteration-count: 1;
        animation-duration: 2.8s;
        animation-fill-mode: backwards;
        animation-timing-function: steps(47);
    }

    .thanosBackhover{
        animation-name: thanosback;
    }

    .thanosDestoryhover {
       animation-name: thanos;
    }

    @keyframes thanosback {
        0% {
            background-position: 0 0
        }

        to {
            background-position: -3760px 0
        }
    }
    @keyframes thanos {
        0% {
            background-position: 0 0
        }

        to {
            background-position: -3760px 0
        }
    }
    .mescroll-totop{
        bottom: 20rem !important;
    }
    .list-users ul{
        list-style-type: none;
        width: 100%;
        margin: 0;
        padding: 0;
    }
    .list-users li{
     /*   float: left;*/
        display: inline-block;
        width: 25%;
        text-align: center;
        vertical-align: middle;
    }
    .list-users li .warp-div {
        margin:  2px;
    }
    .list-users li .warp-div img {
        height: 100%;
        width: 100%;
    }
    .face-img{
        border: #ffffff 1px solid;
        padding: 1px 1px;
        position: relative;
    }
    .face-img img{
        width: 100%;
    }
    .circle{
        width: 0.8rem;
        height: 0.8rem;
        background-color: chartreuse;
        position: absolute;
        bottom: 5px;
        right: 5px;
        border-radius: 50%;
    }

    .mescroll {
        position: fixed;
        top: 3rem;
        bottom: 4rem;
        height: auto;
    }
</style>