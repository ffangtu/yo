export default {
  Start: {
    path: '/Start',
    name: 'Start',
    component: resolve => require(['../components/modules/Start'], resolve)
  },
  Login: {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['../components/modules/Start/Login'], resolve)
  },
  Register: {
    path: '/Register',
    name: 'Register',
    component: resolve => require(['../components/modules/Start/Register'], resolve)
  },
  Home: {
    path: '/',
    name: 'Home',
    component: resolve => require(['../components/modules/Home'], resolve)
  },
  HomePage: {
    path: '/HomePage',
    name: 'HomePage',
    component: resolve => require(['../components/modules/HomePage'], resolve)
  },
  MyOrders: {
    path: '/MyOrders',
    name: 'MyOrders',
    component: resolve => require(['../components/modules/MyOrders'], resolve)
  },
  ManageFood: {
    path: '/ManageFood',
    name: 'ManageFood',
    component: resolve => require(['../components/modules/ManageFood'], resolve)
  },
  Me: {
    path: '/Me',
    name: 'Me',
    component: resolve => require(['../components/modules/Me'], resolve)
  }
}