<template>
  <div>
    <el-input v-model="lnglat">
      <el-button slot="append" icon="el-icon-search" type="primary" @click="toMap">添加</el-button>
    </el-input>
    <el-drawer title="我是地图" :visible.sync="mapVisible" :with-header="false" size="60%">
      <div id="map" style="width: 100%;height: 100%;"></div>
    </el-drawer>
  </div>
</template>

<script>

let map = null; //高德地图
export default {
  data() {
    return {
      lnglat: "",
      mapVisible:false
    };
  },
  methods: {
    getMap() {
      let _this = this;
      //创建地图
      map = new window.AMap.Map("map", {
        //mapStyle: 'amap://styles/grey',
        zoom: 13,
        center: [120.220876, 33.423722]
      });
      //地图点击事件
      map.on("click", showInfoClick);
      function showInfoClick(e) {
        map.clearMap();//清理地图
        let lng = e.lnglat.getLng(); //获取经度
        let lat = e.lnglat.getLat(); //获取纬度
        //marker点
        let marker = new window.AMap.Marker({
          position: [lng, lat],
          offset: new window.AMap.Pixel(-13, -30)
        });
        _this.lnglat = lng + "," + lat;//将经纬度绑定至input输入框
        map.add(marker); //加载点
        map.setFitView(); //缩放至地图
      }
    },
    //展示抽屉，执行获取坐标经纬度的方法
    toMap() {
      this.mapVisible = true;
      setTimeout(() => {
        //调用方法创建地图
        this.getMap();
      }, 0);
    }
  }
};
</script>

<style scoped>
</style>
08974