<template>
    <div>
        <h1>{{page}}</h1>
    </div>
</template>

<script>
    export default {
        name: "PageTwo",
        data:function () {
            return {
                page:'Page Four'
            }

        },
        watch:{
            $route (to,from){
                console.log(to)
                console.log(from)
            }
        },
    }
</script>

<style scoped>

</style>