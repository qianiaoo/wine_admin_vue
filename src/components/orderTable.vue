<template>
  <div>

    <el-table
            :data="tableData"
            @filter-change="filterChange"

        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="地址细节">
              <span>{{ props.row.address.detail }}</span>
            </el-form-item>
            <el-form-item label="地址标签">
              <span>{{ props.row.address.label }}</span>
            </el-form-item>
            <el-form-item label="地址定位">
              <span>{{ props.row.address.location.coordinates }}</span>
            </el-form-item>
            <el-form-item label="地区">
              <span>{{ props.row.address.region }}</span>
            </el-form-item>
            <el-form-item label="商品列表">

              <el-table :data="getArrGoods(props.row.goods)">
                <el-table-column label="品牌名" prop="brand"></el-table-column>
                <el-table-column label="数量" prop="num"></el-table-column>
                <el-table-column label="温度" prop="normal"></el-table-column>
              </el-table>
            </el-form-item>

          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="添加日期"
          sortable
          prop="addTime">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ getDateByTimestamp(scope.row.addTime.$date) }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="标题"
          prop="address.title">
      </el-table-column>
      <el-table-column
          sortable
          prop="address.phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          sortable
          prop="delivery_price"
          label="派送费">
      </el-table-column>
      <el-table-column
          label="订单状态"
          :filters="[{ text: '订单已完成', value: '1' },{ text: '正在配送', value: '2' },
           { text: '商家已接单', value: '3' },{ text: '商家拒绝接单', value: '4' },
           { text: '等待支付', value: '5' },{ text: '取消支付', value: '6' },{ text: '正在退款', value: '7' }
           ,{ text: '支付完成', value: '8' },{ text: '支付取消', value: '9' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
              :type="scope.row.status === 6 ? 'primary' : 'success'"
              disable-transitions>{{orderStatusDic[scope.row.status]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          sortable
          label="距离">
        <template v-slot="scope">
          <span>{{Math.round(scope.row.address.distance*100) / 100}}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="收货人"
          prop="address.receiver">
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button  v-if="scope.row.status===8" @click="orderChange(scope.row, 3)">接单</el-button>
          <el-button   v-if="scope.row.status===8" @click="orderChange(scope.row, 4)">拒单</el-button>
          <el-button  v-if="scope.row.status===3" @click="orderChange(scope.row, 2)">确认出库</el-button>
          <el-button  v-if="scope.row.status===2" @click="orderChange(scope.row, 1)">完成订单</el-button>
          <el-button  v-if="scope.row.status===7" @click="refunds">退款</el-button>
          <el-button  v-if="scope.row.status===3" @click="orderChange(scope.row, 9)">取消订单</el-button>
          <el-button  v-if="scope.row.status===2" @click="orderChange(scope.row, 9)">取消订单</el-button>
          <!--          <el-button-->
          <!--              size="small"-->
          <!--              @click="handleEdit(scope.row)"></el-button>-->
          <!--          <el-button-->
          <!--              size="small"-->
          <!--              type="danger"-->
          <!--              @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="Pagination">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import {getOrderList, updateOrder} from "../utils/api";

export default {
  name: "orderTable",
  data() {
    return {
      offset: 0,
      needStatus: [],
      limit : 20,
      selectedRow:{},
      currentPage: 1,
      orderStatusDic: {
        1: "订单已完成",
        2: "正在配送",
        3: "商家已接单",
        4: "商家拒绝接单",
        5: "等待支付",
        6: "取消支付",
        7: "正在退款",
        8: "支付完成",
        9: "订单取消",
      },
      tableData: [],
    }
  },
  methods: {
    getDateByTimestamp(timestamp) {
      const date = new Date(timestamp);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() + ' ';
      return (Y + M + D);
    },
    refunds() {
      console.log("将跳转至退款界面");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1)*this.limit;
      this.getInitialData();
    },
    async initData() {
      this.tableData = []
      console.log("init之前：：", this.needStatus)
      const needStatusStr = this.needStatus.toString()
      const data = {
        offset: this.offset,
        limit: this.limit,
        needStatus: needStatusStr,
      }
      const res_data = await getOrderList(data)
      // const res = res_data.parseJson();
      console.log(res_data)
      const res = res_data.data   //由JSON字符串转化为JSON对象
        try {
        if (res.errcode === 0) {
          // this.tableData = res.data
          res.data.forEach(item =>{
            // const td = {}
            item = JSON.parse(item);
            this.tableData.push(item)
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }catch (e) {
        console.log(e);
      }
    },
    filterTag(value, row) {
      // console.log("filterTag",value,row)
      return row.status == value;
    },
    filterChange(filters) {
      this.needStatus = filters['el-table_1_column_6'];
      this.initData();
      console.log('filters:::',filters['el-table_1_column_6'])

    },
    handleUpdateRes(res) {
      try {
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '更新订单状态成功'
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }catch (e) {
        console.log(e)
      }
    },
    async orderChange(row,statusTo) {
      const data = {
        _id: row._id,
        status: statusTo
      }
      const res = await updateOrder(data)
      this.handleUpdateRes(res);
    },
    findGoodById(id) {
      console.log(id)
      return id;
    },
    getArrGoods(goods) {
      console.log("开始执行good转换")
      const newGoods = [];
      for (let k in goods) {
        const g = {
          id: k,
          brand: goods[k].brand,
          normal: goods[k].normal,
          num: goods[k].num,
        };
        newGoods.push(g)
      }
      console.log("newGoods"+newGoods)
      return newGoods;
    },


  },
  computed: {
    goodsKeys: function (index) {
      return Object.keys(this.tableData[index.goods]);
    },
    count: function () {
      return this.tableData.length;
    }
  },
  props: {

  },
  created() {
    this.initData();
  }
}
</script>

<style scoped>

</style>