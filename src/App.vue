<template>
    <div id="app">
        <mt-header fixed title="[追踪码查询系统]"></mt-header>
        <router-view></router-view>
        <mt-tabbar  :fixed="true" v-model="selected"  v-if="show">
            <mt-tab-item :key="item.name" :id="item.id" v-for="item in tags">
                <img slot="icon"   :src="item.icon" />
                {{item.name}}
            </mt-tab-item>
        </mt-tabbar>
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
                selected:'order',
                pickerValue:"2019-04-22",
                rangeValue:0,
                tags:[
                    {name:'产品码',icon:waimai,id:'fast-food',route:'/one'},
                    {name:'包箱码',icon:dingdan,id:'order',route:'/two'},
                    {name:'订单号',icon:fanxian,id:'found',route:'/three'},
                    {name:'防伪码',icon:wode,id:'my',route:'/four'},
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
            this.$router.push("/two")
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
      /*  text-align: center;*/
        color: #2c3e50;
        margin-top: 45px;
      /*  max-width: 480px;*/
        margin-left: auto;
        margin-right: auto;


    }
    @font-face {
        font-family: 'iconfont';  /* project id 1157832 */
        src: url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.eot');
        src: url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.woff2') format('woff2'),
        url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.woff') format('woff'),
        url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_1157832_1kbl1pfnowk.svg#iconfont') format('svg');
    }


</style>
