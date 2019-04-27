<template>
    <div>
        <el-row>
            <mt-swipe :auto="4000"  v-bind:style="{ height: height}">
                <mt-swipe-item><img class="w-full"  src="../assets/A.png"></mt-swipe-item>
                <mt-swipe-item><img class="w-full" src="../assets/B.png"></mt-swipe-item>
                <mt-swipe-item><img class="w-full" src="../assets/C.png"></mt-swipe-item>
                <mt-swipe-item><img class="w-full" src="../assets/D.png"></mt-swipe-item>
            </mt-swipe>
        </el-row>
        <el-row>
            <el-col :span="6">
                <div class="div-s">
                    <div class="div-c">扫</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="div-s">
                    <div class="div-c">黑</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="div-s">
                    <div class="div-c">除</div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="div-s">
                    <div class="div-c">恶</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "PageOne",
        data:function () {
            return {
                page:'Page One'
            }
        },
        methods:{

        },
        watch:{

        },
        computed:{
            height(){
                let w =  document.body.clientWidth
                return w*0.75+'px'
            }
        },
        created() {

        }
    }
</script>

<style scoped>
    .w-full{
        width: 100%;
    }
    .div-s{
        height: 148px;
        background-color: chartreuse;
        margin: 3px 1px;
        text-align: center;
    }
    .div-c{
        position: relative;
        display: inline-block;
        top: 53px;
        font-size: 32px;
    }
</style>