<template>
    <div>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="list-users">
                <ul>
                    <li :style="{height: liHeight}"   @click="dispatchRoute(`/detail/${n}`)" :key="n" v-for="n in pageNum" >
                        <div  :style="{height: liDivHeight}" class="warp-div">
                            <img src="../assets/header_img/icon-test_2.png">
                            <div style="position: relative;bottom: 20px;right: 0px">{{n}}</div>

                        </div>
                    </li>
                </ul>
        </div>
        </mescroll-vue>

    </div>

</template>

<script>
    import MescrollVue from 'mescroll.js/mescroll.vue'
    import 'mescroll.js/mescroll.min.css'
    import top from "../assets/logo.png"
    export default {
        name: "PageTwo",
        data:function () {
            return {
                page:'Page Two',
                mescroll: null, // mescroll实例对象
                pageNum:35,
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
                        console.log(b,v)
                    }

                },
                dataList:[]
            }

        },
        methods:{
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
                let vm = this
                setTimeout(function(){
                    mescroll.endSuccess(10)
                    vm.pageNum += 8
                    console.log(vm.round)
                   console.log( mescroll.getScrollHeight())
                    console.log("上拉结束执行回调")
                },0)
            }
        },
        watch:{

        },
        computed:{
            liHeight(){
                let w =  this.$store.state.client_width
                console.log(w)
                return ((w/4)) + "px"
            },
            liDivHeight(){
                let w =  document.body.clientWidth
                return (((w/4))-4) + "px"
            },
        },
        components:{
            MescrollVue
        }
    }
</script>

<style scoped>

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