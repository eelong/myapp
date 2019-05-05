<template>
    <div id="app">
        <div>
        <router-view></router-view>
        </div>
        <div>
        <mt-tabbar v-if="this.$store.state.showBottomBar" :fixed="true" v-model="selected" >
            <mt-tab-item :key="item.name" :id="item.id" v-for="item in tags">
                <img slot="icon"   :src="item.icon" />
                {{item.name}}
            </mt-tab-item>
        </mt-tabbar>
        </div>
    </div>
</template>

<script>
    import waimai from './assets/icon-test.png'
    import dingdan from './assets/dingdan.png'
    import fanxian from './assets/faxian.png'
    import wode from './assets/wode.png'
    export default {
        name: 'app',
        data:function(){
            return {
                selected:'my-near',
                pickerValue:"2019-04-22",
                rangeValue:0,
                tags:[
                    {name:'身边',icon:waimai,id:'my-near',route:'/my-near/two'},
                    {name:'消息',icon:dingdan,id:'order',route:'/two'},
                    {name:'发现',icon:fanxian,id:'found',route:'/three'},
                    {name:'直播',icon:wode,id:'my',route:'/four'},
                    {name:'我的',icon:wode,id:'canvas',route:'/canvas'},
                ]
            }
        },
        watch:{
            selected(value,oldvalue){
                if(value !== oldvalue)  {
                    for (let item of this.tags){
                        if(item.id === value){
                            this.$router.push(item.route)
                        }
                    }
                }
            }
        },
        methods:{

        },
        created() {
            this.$router.push("/my-near/two")
        }
    }
</script>

<style>

    body{
        margin: 0 0;
        background-color: rgba(226, 226, 226, 0.32);

    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

</style>
