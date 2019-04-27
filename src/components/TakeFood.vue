<template>
    <div>
    <el-row>
        <mt-swipe :auto="2000" style="height: 50px">
            <mt-swipe-item><div style="height: 50px">图片 1</div></mt-swipe-item>
            <mt-swipe-item><div style="height: 50px">图片 2</div></mt-swipe-item>
            <mt-swipe-item><div style="height: 50px">图片 3</div></mt-swipe-item>
        </mt-swipe>
    </el-row>

    <mt-range v-model="rangeValue">
        <div slot="start">0</div>
        <div slot="end">100</div>
    </mt-range>
    <mt-datetime-picker
            ref="picker"
            type="time"
            v-model="pickerValue">
    </mt-datetime-picker>
    </div>
</template>

<script>
    export default {
        name: "TakeFood"
    }
</script>

<style scoped>

</style>