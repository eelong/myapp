<template>

    <div :style="{height:ClientHeight}" class="backgroup">
        <div class="close" @click="goback" style="color: #d4d0d0">x</div>
        <div style="height: 100%;">

            <img class="fit" :src="imgSrc">
        </div>
        <div style="position: absolute;padding:  0 0.8rem;bottom: 3rem;color: #d4d0d0">
            <div>  就算克拉克犯了错，但是这群人也都犯了错，怎么，还要双标一下，自己犯错可以，克拉克犯错就不行？</div>
            <div class="icon-warp">
                <div> 2019-05-05 22:50:49</div>
                <div>赞(900)</div>
                <div>评论(800)</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "ViewImage",
        data:function(){

            return {

            }
        },
        methods:{
            goback(){
                this.$store.commit("bottomBar",true)
                this.$router.go(-1)
            }
        },
        computed:{
            ...mapGetters(['ClientHeight']),
            imgSrc(){
               return this.$route.query.src
            }
        }
    }
</script>

<style scoped>
    .backgroup{
        background-color: #666666;
        position: relative;
    }
    .fit{
        object-fit: scale-down;
        height: 100%;
        width: 100%;
    }
    .icon-warp{
        margin-top: 0.8rem;
    }
    .icon-warp div:first-child{
        display: inline-block;
        width: 50%;
    }
    .icon-warp div{
        display: inline-block;
        width: 25%;
    }
    .close{
        position: absolute;
        right: 0.8rem;
        top: 0.8rem;
        font-size: 1.5rem;
    }
</style>