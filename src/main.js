import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueCookies from 'vue-cookies'
// 引入vue-amap
import VueAMap from 'vue-amap'
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f07e24eacb9f7469412cc14de883d683',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType',
    'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geocoder','AMap.Geolocation','AMap.MarkerClusterer'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});


Vue.use(VueCookies)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
