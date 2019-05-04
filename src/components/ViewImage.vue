<template>

    <div :style="{height:height}">

    </div>
</template>

<script>
    export default {
        name: "ViewImage",
        computed:{
            height(){
                return  this.$store.state.client_height
            }
        }
    }
</script>

<style scoped>

</style>