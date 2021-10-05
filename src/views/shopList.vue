<template>
  <div>
    <head-top></head-top>
    <el-table
        v-loading="loading"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="店铺名"
          prop="name">
      </el-table-column>
      <el-table-column
          label="最大配送范围"
          prop="max_range">
      </el-table-column>
      <el-table-column
          label="配送规则">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="left">
            <el-table :data="scope.row.freight">
              <!--              <span></span>-->
              <el-table-column label="公里数" prop="km"></el-table-column>
              <el-table-column label="配送费" prop="cny"></el-table-column>
            </el-table>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.freight.length }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template v-slot="scope">
          <el-popover trigger="hover" placement="left">
            <p>{{ "坐标：" + scope.row.mapData[0] }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.mapData[1] }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-input size="small" placeholder="搜索店铺名称" v-model="search"></el-input>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="addGood(scope.$index, scope.row)">添加商品
          </el-button>
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          :page-sizes="[20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <edit-shop-form @updateSuccess="updateSuccess" :form="selectedRow"></edit-shop-form>
    </el-dialog>
  </div>
</template>

<script>

import headTop from "../components/headTop";
import editShopForm from "../components/editShopForm";
import {getShopList} from "../utils/api";

export default {
  name: "shopList",
  data() {
    return {
      total: 0,
      loading: false,
      offset: 0,
      limit: 20,
      dialogFormVisible: false,
      search: '',
      selectedRow: {},
      currentPage: 1,
      tableData: []
    }
  },
  components: {
    editShopForm,
    headTop,
  },
  created() {
    this.initData();
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  updated() {
    console.log("updated");
  },

  mounted() {
    console.log("mounted!!");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  watch: {
    '$route'(to, from) {
      console.log("$route")
      console.log(from);
      if (to.path === '/shopList') {
        this.initData();
      }
    }
  },

  methods: {
    async initData() {
      this.loading = true;
      try {
        const shopData = await getShopList({offset: this.offset, limit: this.limit});
        console.log(shopData.data.data)
        if (shopData.status === 200) {
          this.tableData = []
          this.total = shopData.data.pager.Total;
          shopData.data.data.forEach(item => {
            item = JSON.parse(item);
            const td = {};
            td.id = item._id;
            td.category = item.category
            td.name = item.name;
            td.mapData = [item.location.coordinates, item.address];
            td.freight = item.freight;
            td.max_range = item.postRange;
            this.tableData.push(td);
            this.loading = false;
            console.log(td.mapData)
          })
        } else {
          throw new Error('获取数据失败');
        }

      } catch (e) {
        console.log('获取数据失败', e);
      }
    },
    handleSizeChange(val) {
      this.limit = val;
      this.initData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getInitialData();
    },

    addGood(index, row) {
      console.log("即将进行路由跳转，参数为" + row.id)
      this.$router.push({path: '/addGoods', query: {shop_id: row.id, shop_name: row.name, category: row.category}})
    },
    handleEdit(index, row) {
      this.selectedRow = row
      this.dialogFormVisible = true
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    updateSuccess() {
      this.dialogFormVisible = false;
      this.initData();
    },
  }
}
</script>

<style scoped>

</style>
