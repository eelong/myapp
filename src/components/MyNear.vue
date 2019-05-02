<template>
    <div>
        <div>
            <el-row style="background-color: #ffffff;position: fixed;width: 100%;z-index: 100">
                <el-col :span="3" style="height: 3rem;line-height: 3rem;vertical-align: middle;text-align: center">
                    <span class="icon iconfont " style="font-size: 2rem;">&#xe7c9;</span>
                </el-col>
                <el-col :span="18"  style="font-size: 3rem">
                    <mt-navbar v-model="selected" >
                        <mt-tab-item :id="1"><router-link tag="span" to="/my-near/two">交友</router-link></mt-tab-item>
                        <mt-tab-item :id="2">动态</mt-tab-item>
                        <mt-tab-item :id="3">群组</mt-tab-item>
                    </mt-navbar>
                </el-col>
                <el-col :span="3" style="height: 3rem;line-height: 3rem;vertical-align: middle;text-align: center">
                    <span class="icon iconfont" style="font-size: 2rem;">&#xe62b;</span>
                </el-col>
            </el-row>
        </div>

        <div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        name: "MyNear",
        data:function () {
            return {
                page:'near my',
                selected:1
            }

        },


    }
</script>

<style scoped>
    .red-point{

    }

    .red-point::after{
        content: "";
        border: 3px solid red;/*设置红色*/
        border-radius:100%;/*设置圆角*/
        position: absolute;
        z-index: 1000;
        margin-top: 19px;
        margin-left: -18px;
    }

</style>