import Vue from 'vue'
import App from './App.vue'
import ElementUI, {
  Notification
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import axios from 'axios'
import store from './store'
import io from 'socket.io-client';

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

Vue.$io = io;

router.beforeEach((to, from, next) => {
  if (JSON.parse(localStorage.getItem('user'))) {
    next()
  } else if (to.path === "/Login" || to.path === "/Register") {
    next()
  } else {
    Notification({
      title: '警告',
      message: '请登录',
      type: 'warning'
    });
    next({
      path: "/Login"
    })
  }
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');