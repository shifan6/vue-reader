// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'

Vue.config.productionTip = false;

Vue.use(Loading);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});
