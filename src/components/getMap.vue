<template>
  <div class="amap-page-container" style="width: 80%; height:500px;margin:30px 10%;">
    <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
        ref="map"
        vid="amapDemo"
        :amap-manager="amapManager"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        :events="events"
        class="amap-demo"
    >
    </el-amap>
    <div style="text-align: center">
      <p>{{ address }}</p>
      <p>经纬度:{{ center }}</p>
      <p>{{newCenter}}</p>
      <el-button type="primary" @click="callParent">确定</el-button>
      <span></span>
    </div>

  </div>
</template>


<script>
// import {} from '../assets/js/Geocoder'
import {AMapManager} from "vue-amap";

let amapManager = new AMapManager();

export default {
  name: "getMap",
  props: {
    parentFunc: {
      type: Function,
      require: true,
      default: null,
    },
    newCenter: {
      type: Array,
      default: null,
    },

  },


  data() {
    const self = this;
    return {
      searchOption: {
        city: "",//搜索范围
        citylimit: false, //限制搜索范围
        //city: "", citylimit: false, // 不限制搜索范围搜索，比如想全国搜索
      },
      lng: "",
      lat: "",
      address: "",
      marker: "",
      amapManager,
      zoom: 12,
      // fakeCenter:[],
      center: [116.397451, 39.909187],
      events: {
        init: (o) => {
          o.getCity((result) => {
            console.log(result);
            // this.searchOption.city=result.city
          });
        },
        moveend: () => {
        },
        zoomchange: () => {
        },
        click: (e) => {
          //   console.log(e.lnglat);
          self.lng = e.lnglat.lng;
          self.lat = e.lnglat.lat;
          self.center = [self.lng, self.lat];
          //   console.log(e.lnglat, 1999);

          let o = amapManager.getMap();
          if (!self.marker) {
            self.marker = new window.AMap.Marker({
              position: e.lnglat,
            });
            self.marker.setMap(o);
          }
          self.marker.setPosition(e.lnglat);
          let geocoder = new window.AMap.Geocoder({});

          geocoder.getAddress(e.lnglat, function (status, result) {
            if (status === "complete" && result.regeocode) {
              self.address = result.regeocode.formattedAddress;

              //   console.log(self.address, "999地址");
            } else {
              console.log("根据经纬度查询地址失败");
            }
          });
        },
      },
      plugin: ["ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            },
          },
        },
        {
          pName: "Geolocation",
          events: {
            init(o) {

              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                // console.log(JSON.stringify(result));
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.address = result.formattedAddress;
                  self.center = [self.lng, self.lat];
                  //   console.log(self.center, 99666);
                  let o = amapManager.getMap();
                  if (!self.marker) {
                    self.marker = new window.AMap.Marker({
                      position: self.center,
                    });
                    self.marker.setMap(o);
                  }
                  self.marker.setPosition(self.center);
                }
              });
            },
          },
        },
      ],
    };
  },

  methods: {
    callParent() {
      // this.$emit("backMapData", [this.center,this.address])
      // this.$parent.getMapData([this.center, this.address])
      this.parentFunc([this.center, this.address])
    },
    onSearchResult(pois) {
      if (pois.length > 0) {
        let {lng, lat, location} = pois[0];
        let center = [lng, lat];
        this.lng = lng;
        this.lat = lat;
        this.center = [lng, lat];
        let o = amapManager.getMap();
        if (!this.marker) {
          this.marker = new window.AMap.Marker({
            position: center,
          });
          this.marker.setMap(o);
        }
        this.marker.setPosition(center);
        // 近来补充  根据经纬度查询地址
        let geocoder = new window.AMap.Geocoder({});
        let that = this
        geocoder.getAddress(location, function (status, result) {
          console.log(status, result)
          if (status === "complete" && result.regeocode) {
            that.address = result.regeocode.formattedAddress;
          } else {
            console.log("根据经纬度查询地址失败");
          }
        });
      }
    },
  },
};
</script>


<style scoped>
.search-box {
  position: absolute;
  top: 25px;
  left: 10%;

}

.amap-page-container {
  position: relative;

}

</style>