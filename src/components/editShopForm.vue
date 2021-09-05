<template>
  <div>
        <el-form ref="form" :model="form" :rules='rules' label-width="120px">
          <el-form-item label="店铺名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="最大配送范围">
            <el-input-number v-model="form.max_range"></el-input-number>
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

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
    <el-dialog style="height: 120%" title="选择地点" :visible.sync="dialogFormVisible" append-to-body>
      <get-map :get-map-data="this.getMapData"></get-map>
    </el-dialog>
  </div>
</template>

<script>
import getMap from "./getMap";


export default {
  name: "editShopForm",
  data() {
    return {
      dialogFormVisible:false,
    }
  },
  props: ['form'],
  components: {
    getMap,
  },
  methods: {
    openMap(){
      this.dialogFormVisible = true
    }
  },
  getMapData(mapData) {
    this.form.mapData = mapData
    this.dialogFormVisible = false
  }
}
</script>

<style scoped>

</style>