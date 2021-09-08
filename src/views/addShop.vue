<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="14" :offset="4">
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
            <el-input-number v-model="form.max_range" :precision="1"></el-input-number>
          </el-form-item>
          <el-form-item label="起送费">
            <el-input-number v-model="form.min_fee" :precision="0" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="配送费规则" prop="freight">
            <el-button type="primary" icon="el-icon-plus" circle @click="addFreight"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteAllFreight"></el-button>

            <el-table :data="form.tableData" width="100%" :default-sort = "{prop: 'km', order: 'ascending'}">
              <el-table-column
                  type="index">
              </el-table-column>
              <el-table-column
                  prop="km"
                  sortable
                  label="公里数">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.km" min="0" size="mini" :precision="1" :step="0.5" :max="form.max_range"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column
                  prop="cny"
                  sortable
                  label="金额">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.cny" min="0" size="mini" :precision="1" :step="0.5" ></el-input-number>
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

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-dialog style="height: 120%" title="选择地点" :visible.sync="dialogFormVisible">
      <get-map :parentFunc="this.getMapData"></get-map>
<!--      <get-map @backMapData="getMapData"></get-map>-->
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import getMap from "../components/getMap";
import {updateShop} from "../utils/api";
export default {
  name: "addShop",
  created() {
    this.form.mapData= []
  },
  data() {
    return {
      inputValue:'',
      inputVisible: false,
      dialogFormVisible: false,
      form: {
        category: [],
        mapData: [],
        name:'',
        freight: [],
        max_range:15,
        min_fee:0,
        tableData: [{
          km: 1,
          cny:3
        }],
      }
    }
  },
  components: {
    headTop,
    getMap,
  },
  methods: {
    getMapData(mapData) {
      // console.log("getMapdatas!!!!")
      this.form.mapData = mapData
      this.dialogFormVisible = false
    },
    openMap() {
      this.dialogFormVisible = true;
    },
    addFreight() {

      function compare(p){ //这是比较函数
        return function(m,n){
          const a = m[p];
          const b = n[p];
          return a - b; //升序
        }
      }
      this.form.tableData.sort(compare("km"))
      if (this.form.tableData[[this.form.tableData.length - 1]].km === this.form.max_range) {
        this.$message({
          message:  "添加失败，请修改最大配送范围后再次尝试！",
          type: "error"
        }
       )
        return
      }
      this.form.tableData.push({
        km: this.form.tableData[this.form.tableData.length -1].km + 1,
        cny: this.form.tableData[this.form.tableData.length -1].cny + 2
      });
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    deleteAllFreight() {
      this.form.tableData = [{
        km: 1,
        cny:3
      }]
    },
<<<<<<< HEAD
    async onSubmit(){
      console.log({data:this.form})
      try {
        this.form.freight=this.form.tableData
        this.form.category='1,2,3,4'
        const res = await updateShop(JSON.stringify(this.form));
        console.log(res)
        if (res.data.errcode === 0) {
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
=======
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
>>>>>>> af5c1a566966111523f7bcb13e123e46534af3a7
    }
  }
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