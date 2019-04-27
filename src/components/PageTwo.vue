<template>
    <div>
        <el-row v-for="n in 20" >
            <el-col :span="6" :row="n">
                <div  @click="dispatchRoute(`/detail/${n}`)" >
                    <div class="face-img" :style="{height:faceHeight}">
                        <img  src="../assets/header_img/icon-test.png">
                        <div class="circle"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <div class="face-img" :style="{height:faceHeight}">
                        <img src="../assets/header_img/icon-test_1.png">
                        <div class="circle"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <div class="face-img" :style="{height:faceHeight}">
                        <img src="../assets/header_img/icon-test_2.png">
                        <div class="circle"></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div>
                    <div class="face-img" :style="{height:faceHeight}">
                        <img src="../assets/header_img/icon-test_3.png">
                        <div class="circle"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "PageTwo",
        data:function () {
            return {
                page:'Page Two',
            }

        },
        methods:{
            dispatchRoute(route){
                this.$router.push(route)
            }
        },
        watch:{

        },
        computed:{
            faceHeight(){
                let w =  document.body.clientWidth
             //  w = w > 480 ? 480 : w
                return ((w/4)-4) + "px"
            }
        }
    }
</script>

<style scoped>
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
</style>