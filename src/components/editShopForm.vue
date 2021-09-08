<template>
  <div>
        <el-form ref="form" :model="form" :rules='rules' label-width="120px">
          <el-form-item label="店铺名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分类标签">
            <el-tag
                v-for="tag in form.category"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新分类</el-button>
          </el-form-item>
          <el-form-item label="最大配送范围">
            <el-input-number v-model="form.max_range"></el-input-number>
          </el-form-item>
          <el-form-item label="配送费规则" prop="freight">
            <el-button type="primary" icon="el-icon-plus" circle @click="addFreight"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteAllFreight"></el-button>

            <el-table :data="form.freight" width="100%" :default-sort = "{prop: 'km', order: 'ascending'}">
              <el-table-column
                  type="index">
              </el-table-column>
              <el-table-column
                  prop="km"
                  sortable
                  label="公里数">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.km" size="mini" :precision="1" :step="0.5" :max="form.max_range"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                  prop="cny"
                  sortable
                  label="金额">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.cny" size="mini" :precision="1" :step="0.5" ></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="店铺坐标">
            <el-button type="primary" @click="openMap" plain>打开地图</el-button>
            <div v-if="form.mapData[0]">
              <p>坐标: {{form.mapData[0]}}</p>
              <p>地址: {{form.mapData[1]}}</p>
            </div>
<!--            <get-map :parentFunc="this.getMapData" ></get-map>-->
<!--            <get-map @backMapData="getMapData"></get-map>-->

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateShop">提交</el-button>
          </el-form-item>
        </el-form>
    <el-dialog style="height: 120%" title="选择地点" :visible.sync="isShowMapDialog" append-to-body>
      <p>{{form.mapData[0]}}</p>
      <get-map :parentFunc="this.getMapData" :new-center="form.mapData[0]"></get-map>
    </el-dialog>
  </div>
</template>

<script>
import getMap from "./getMap";
import {updateShop} from "../utils/api";


export default {
  name: "editShopForm",
  data() {
    return {
      inputValue:'',
      inputVisible: false,
      isShowMapDialog:false,

    }
  },
  props: ['form'],
  components: {
    getMap,
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.category.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    openMap(){
      this.isShowMapDialog = true
    },
    getMapData(mapData) {
      this.form.mapData = mapData
      this.isShowMapDialog = false
    },
    addFreight() {
      function compare(p){ //这是比较函数
        return function(m,n){
          const a = m[p];
          const b = n[p];
          return a - b; //升序
        }
      }
      this.form.freight.sort(compare("km"))
      if (this.form.freight[[this.form.freight.length - 1]].km === this.form.max_range) {
        this.$message({
              message:  "添加失败，请修改最大配送范围后再次尝试！",
              type: "error"
            }
        )
        return
      }
      this.form.freight.push({
        km: this.form.freight[this.form.freight.length -1].km + 1,
        cny: this.form.freight[this.form.freight.length -1].cny + 2
      });
    },
    deleteAllFreight() {
      this.form.freight = [{
        km: 1,
        cny:3
      }]
    },
    handleClose(tag) {
      this.form.category.splice(this.form.category.indexOf(tag), 1);
    },
    async updateShop() {
      try {
        const res = await updateShop(this.form);
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '更新店铺信息成功'
          });
          this.$emit("updateSuccess");
        }else{
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }catch (e) {
        console.log(e);
      }
    }
  },

}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>