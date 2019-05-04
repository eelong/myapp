import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";
import PageThree from "./components/PageThree";
import PageFour from "./components/PageFour";
import Detail from "./components/Detail";
import MyNear from "./components/MyNear";
import Canvas from "./components/Canvas";
import ElementUI from 'element-ui';
import { Tabbar, TabItem } from 'mint-ui';
import BootstrapVue from 'bootstrap-vue'


import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.use(BootstrapVue)
Vue.config.productionTip = false
const routes = [
  { path: '/one', component: PageOne },
  { path: '/my-near', component:MyNear,
    children:[
       {
         path:"two",
         component:PageTwo
       }
    ]

  },
  { path: '/two', component: PageTwo },
  { path: '/three', component: PageThree },
  { path: '/four', component: PageFour },
  { path: '/detail/:id', component: Detail },
  { path: '/canvas', component: Canvas },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
