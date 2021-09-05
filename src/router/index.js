import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Manage from "../views/Manage";
import Home from "../views/Home";
import addGoods from "../views/addGoods";
import goodList from "../views/goodList";
import addShop from "../views/addShop";
import shopList from "../views/shopList";
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
            , {
                path: '/addGoods',
                component: addGoods,
                meta: ['商品管理', '上架商品'],
            }, {
                path: '/goodList',
                component: goodList,
                meta: ['商品管理', '商品列表']
            }, {
                path: '/addShop',
                component: addShop,
                meta: ['店铺管理', '添加店铺']
            }, {
                path: '/shopList',
                component: shopList,
                meta: ['店铺管理', '店铺列表']
            }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router
