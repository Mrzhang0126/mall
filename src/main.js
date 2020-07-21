import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import moment from 'moment'

import toast from './components/common/toast'
import fastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//时间日期格式化插件
Vue.prototype.$moment = moment

//安装toast插件
Vue.use(toast)

//解决移动端300ms延迟问题
fastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//定义一个全局过滤器实现日期格式化
// Vue.filter('datrfmt',function (input,fmtstring) {
//   //当input为时间戳时，需转为Number类型
//   // 使用momentjs这个日期格式化类库实现日期的格式化功能
//   return moment(input).format(fmtstring);
// });

//设置语言 或 moment.lang('zh-cn');
//moment.locale('zh-cn');
//赋值使用
// Vue.prototype.$moment = moment
// console.log(moment);
