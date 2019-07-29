// 引入vue-router(路由)
import Vue from 'vue'
import Router from 'vue-router'
import define from './define'

Vue.use(Router);

const {
  Start,
  Login,
  Register,
  Home,
  HomePage,
  MyOrders,
  ManageFood,
  Me
} = define;

Start.redirect = 'Login';
Start.children = [Login, Register];

Home.redirect = 'HomePage';
Home.children = [HomePage, MyOrders, ManageFood,Me];

const router = new Router({
  routes: [
    Start,
    Home,
  ]
});

export default router;