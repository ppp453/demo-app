import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Cookie from 'js-cookie'

Vue.config.productionTip = false;

Vue.use(iView);
Vue.prototype.$Cookies = Cookie;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
