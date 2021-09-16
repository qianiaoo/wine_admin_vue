<template>
  <div>
    <headTop></headTop>
    <div class="top-div" style="padding-left: 30px;padding-top: 10px">
      <span>选择店铺：</span>
      <template>
        <el-select v-model="selectShop" @change="selectShopChanged" filterable placeholder="请选择">
          <el-option
              v-for="(item, index) in shopNames"
              :key="shopIds[index]"
              :label="item"
              :value="shopIds[index]">
          </el-option>
        </el-select>
      </template>
    </div>

    <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="品牌名">
              <span>{{ props.row.brand }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.category_name }}</span>
            </el-form-item>
            <el-form-item label="酒名">
              <span>{{ props.row.item }}</span>
            </el-form-item>
            <el-form-item label="市场价">
              <span>{{ props.row.marketPrice }}</span>
            </el-form-item>
            <el-form-item label="产地">
              <span>{{ props.row.origin }}</span>
            </el-form-item>
            <el-form-item label="打包费">
              <span>{{ props.row.packingsPrice }}</span>
            </el-form-item>
            <el-form-item label="图片列表">
              <span>{{ props.row.pic_array }}</span>
            </el-form-item>
            <el-form-item label="售价">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.sale_count }}</span>
            </el-form-item>
            <el-form-item label="店铺名">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="库存">
              <span>{{ props.row.stock }}</span>
            </el-form-item>
            <el-form-item label="封面图片">
              <span>{{ props.row.thumb_url }}</span>
            </el-form-item>
            <el-form-item label="标题">
              <span>{{ props.row.title }}</span>
            </el-form-item>
            <el-form-item label="度数">
              <span>{{ props.row.degrees }}</span>
            </el-form-item>
            <el-form-item label="容量">
              <span>{{ props.row.capacity }}</span>
            </el-form-item>


          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="品牌名"
          prop="brand">
      </el-table-column>
      <el-table-column
          label="售价"
          prop="price">
      </el-table-column>
      <el-table-column
          sortable
          prop="stock"
          label="库存">
        <template slot-scope="scope">
          <el-input @blur="updateStock(scope.row.stock, scope.row._id)" oninput="value=value.replace(/[^\d]/g,'')"
                    size="mini" style="width: 160px" v-model="scope.row.stock"></el-input>
        </template>
      </el-table-column>
      <el-table-column
          sortable
          prop="isShowHP"
          label="首页推荐">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isShowHP"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="店铺名">
        <template v-slot="scope">
          <span>{{ getShopNameById(scope.row.shop) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
              size="small"
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
      <editGoodForm @updateSuccess="this.updateSuccess" :formModel="selectedRow"></editGoodForm>
    </el-dialog>

  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}


</style>

<script>
import editGoodForm from "../components/editGoodForm";
import headTop from "../components/headTop";
import {getGoodList, getShopList, updateStock} from "../utils/api"

export default {
  data() {
    return {
      loading: false,
      selectShop: '',
      selectedRow: {},
      shopNames: [],
      shopIds: [],
      dialogFormVisible: false,
      total: 0,
      limit: 20,
      currentPage: 1,
      tableData: [],

    }
  },
  computed: {},
  components: {
    headTop,
    editGoodForm
  },
  created() {
    this.initData();
  },
  methods: {
    handleEdit(row) {
      console.log(row)
      this.selectedRow = row
      this.dialogFormVisible = true;
    },
    handleDelete(index, row) {
      console.log(index, row)
    },

    getShopNameById(id) {
      for (let i = 0; i < this.shopIds.length; i++) {
        if (this.shopIds[i] === id) {
          return this.shopNames[i];
        }
      }
    },
    handleSizeChange(val) {
      this.limit = val;
      this.initData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.initData();
    },
    selectShopChanged(val) {
      this.selectShop = val;
      console.log("val:::", val);
      console.log("selsectShop:", this.selectShop);
      console.log("t")
      this.initData();
    },
    async updateStock(stock, id) {
      const res = await updateStock({_id: id, stock: stock})
      if (res.status === 200) {
        this.$message({
          type: "success",
          message: '修改库存成功！'
        });
      }
    },
    updateSuccess() {
      this.dialogFormVisible = false;
      this.initData();
    },
    async initData() {
      this.loading = true;
      try {
        const goodData = await getGoodList({offset: this.offset, limit: this.limit, shop_id: this.selectShop});
        const shopData = await getShopList({offset: 0, limit: 100})
        if (shopData.status === 200) {
          this.shopNames = [];
          this.shopIds = [];
          shopData.data.data.forEach(item => {
            item = JSON.parse(item);
            this.shopNames.push(item.name);
            this.shopIds.push(item._id)
          });
          console.log("shopData::200", this.shopNames)
        }
        console.log(goodData.data.data);
        if (goodData.status === 200) {
          this.total = goodData.data.pager.Total;

          //this.count = shopData.data.data.length;
          this.tableData = []
          goodData.data.data.forEach(item => {
            item = JSON.parse(item);
            console.log(item)
            const td = {};
            td.isShowHP = item.recommend;
            td._id = item._id;
            td.brand = item.brand,
                td.category_name = item.category_name,
                td.item = item.item,
                td.marketPrice = item.marketPrice,
                td.origin = item.origin,
                td.packingsPrice = item.packingsPrice,
                td.pic_array1 = item.pic_array,
                td.pic_array2 = item.product_desc_url,
                td.price = item.price,
                td.sale_count = item.sale_count,
                td.shop = item.shop,
                td.stock = item.stock;
            td.thumb_url = item.thumb_url;
            td.title = item.title;
            td.degrees = item.specification.split(',')[0];
            td.capacity = item.specification.split(',')[1];
            this.tableData.push(td);
          })
          this.loading = false;
          console.log("GooodLIst:tableData::", this.tableData)
        } else {
          throw new Error('获取数据失败');
        }

      } catch (e) {
        console.log('获取数据失败', e);
      }
    },
  }
}
</script>


<style lang="less">
@import '../style/mixin';

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 30%;
}

.table_container {
  padding: 20px;
}

.Pagination {
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.top-div {
  border-width: 60px;
}
</style>
