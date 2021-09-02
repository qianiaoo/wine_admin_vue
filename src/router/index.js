import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Manage from "../views/Manage";
import Home from "../views/Home";
// const home = r => require.ensure([], () => r(require('../page/Home')), 'home');
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    redirect: '/login'
  }, {
    path: '/manage',
    // name: 'manage',
    component: Manage,
    children: [{
      path: '',
      component: Home,
      meta: [],
    }
    // ,{
    //   path: '/addShop',
    //   component: addShop,
    //   meta: ['添加数据', '添加商铺'],
    // },{
    //   path: '/addGoods',
    //   component: addGoods,
    //   meta: ['添加数据', '添加商品'],
    // }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
