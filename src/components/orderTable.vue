<template>
  <div>
<!--    <span>aaa: {{getArrGoods(tableData[0].goods)}}</span>-->
<!--    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
    <!--        :data="tableData.filter(data => !filters.status || data.status === filters.status)"-->

    <el-table
            :data="tableData.filter(data => !filters || data.status === filters)"

        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
<!--            <el-table-column-->
<!--                label="日期"-->
<!--                width="180">-->
<!--              <template slot-scope="scope">-->
<!--                <i class="el-icon-time"></i>-->
<!--                <span style="margin-left: 10px">{{ scope.row.addTime }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
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
<!--              <span>{{ getArrGoods(props.row.goods) }}</span>-->
<!--              <el-button>aa</el-button>-->
              <el-table :data="getArrGoods(props.row.goods)">
                <el-table-column label="品牌名" prop="brand"></el-table-column>
                <el-table-column label="数量" prop="num"></el-table-column>
                <el-table-column label="温度" prop="normal"></el-table-column>
              </el-table>
            </el-form-item>
<!--            <el-form-item label="商品">-->
<!--              <span>{{props.rows.}}}</span>-->
<!--&lt;!&ndash;              <template slot-scope="scope">&ndash;&gt;-->

<!--&lt;!&ndash;                <el-table :data="getArrGoods(scope.row.goods)">&ndash;&gt;-->
<!--&lt;!&ndash;                  &lt;!&ndash;              <span></span>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column label="商品名" prop="brand"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column label="商品数量" prop="normal"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-table-column label="运输温度" prop="num"></el-table-column>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-table>&ndash;&gt;-->

<!--&lt;!&ndash;              </template>&ndash;&gt;-->
<!--            </el-form-item>-->
<!--            <el-form-item label="图片列表">-->
<!--              <span>{{ props.row.pic_array }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="售价">-->
<!--              <span>{{ props.row.price }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="销售量">-->
<!--              <span>{{ props.row.sale_count }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="店铺名">-->
<!--              <span>{{ props.row.shop }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="库存">-->
<!--              <span>{{ props.row.stock }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="封面图片">-->
<!--              <span>{{ props.row.thumb_url }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="标题">-->
<!--              <span>{{ props.row.title }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="度数">-->
<!--              <span>{{ props.row.degrees }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="容量">-->
<!--              <span>{{ props.row.capacity }}</span>-->
<!--            </el-form-item>-->


          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="添加日期"
          sortable
          prop="addTime">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
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
          width="100"
          :filters="[{ text: '未接单', value: '1' }, { text: '已接单', value: '6' }]"
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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status===8" @click="orderChange(scope.row, 3)">接单</el-button> 8->3
          <el-button v-if="scope.row.status===8" @click="orderChange(scope.row, 4)">拒单</el-button> 8->4
          <el-button v-if="scope.row.status===3" @click="orderChange(scope.row, 2)">确认出库</el-button> 3->2
          <el-button v-if="scope.row.status===2" @click="orderChange(scope.row, 1)">完成订单</el-button> 2->1
          <el-button v-if="scope.row.status===7" @click="refunds">退款</el-button> 7->9
          <el-button v-if="scope.row.status===3" @click="orderChange(scope.row, 9)">取消订单</el-button> 3->9
          <el-button v-if="scope.row.status===2" @click="orderChange(scope.row, 9)">取消订单</el-button> 2->9
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
        9: "订单已取消",
      },
      tableData: [{
        "_id": "cd045e756135a3620b1fdb575e85c5fa",
        "addTime": "2021-09-06T05:13:04.907Z",
        "address": {
          "_id": "cd045e756133553e0abda99e007a395b",
          "default": true,
          "detail": "132",
          "distance": 0.23719653940882962,
          "label": "家",
          "location": {
            "coordinates": [
              114.302165,
              30.590161
            ],
            "type": "Point"
          },
          "phone": "123",
          "receiver": "ding",
          "region": [
            "湖北省",
            "武汉市",
            "江岸区"
          ],
          "title": "桃源公寓",
          "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
        },
        "delivery_price": 5,
        "discount": 2,
        "goods": {
          "79550af260fb6de22905a79f046fe0c9": {
            "brand": "二锅头",
            "normal": 2,
            "num": 2
          },
          "cbddf0af60fb6e8119051b276dd45d4f": {
            "brand": "二锅头",

            "normal": 2,
            "num": 2
          }
        },
        "id": "20210906131304502638",
        "money": 43033,
        "packingsPrice": 30,
        "paymentChannels": 0,
        "status": 6,
        "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
      },
        {
          "_id": "cd045e756135a3620b1fdb575e85c5fa",
          "addTime": "2021-09-06T05:13:04.907Z",
          "address": {
            "_id": "cd045e756133553e0abda99e007a395b",
            "default": true,
            "detail": "132",
            "distance": 0.23719653940882962,
            "label": "家",
            "location": {
              "coordinates": [
                114.302165,
                30.590161
              ],
              "type": "Point"
            },
            "phone": "123",
            "receiver": "ding",
            "region": [
              "湖北省",
              "武汉市",
              "江岸区"
            ],
            "title": "桃源公寓",
            "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
          },
          "delivery_price": 5,
          "discount": 2,
          "goods": {
            "79550af260fb6de22905a79f046fe0c9": {
              "brand": "二锅头",

              "normal": 2,
              "num": 2
            },
            "cbddf0af60fb6e8119051b276dd45d4f": {
              "brand": "二锅头",

              "normal": 2,
              "num": 2
            }
          },
          "id": "20210906131304502638",
          "money": 43033,
          "packingsPrice": 30,
          "paymentChannels": 0,
          "status": 6,
          "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
        },
        {
          "_id": "cd045e756135a3620b1fdb575e85c5fa",
          "addTime": "2021-09-06T05:13:04.907Z",
          "address": {
            "_id": "cd045e756133553e0abda99e007a395b",
            "default": true,
            "detail": "132",
            "distance": 0.23719653940882962,
            "label": "家",
            "location": {
              "coordinates": [
                114.302165,
                30.590161
              ],
              "type": "Point"
            },
            "phone": "123",
            "receiver": "ding",
            "region": [
              "湖北省",
              "武汉市",
              "江岸区"
            ],
            "title": "桃源公寓",
            "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
          },
          "delivery_price": 5,
          "discount": 2,
          "goods": {
            "79550af260fb6de22905a79f046fe0c9": {
              "brand": "二锅头",

              "normal": 2,
              "num": 2
            },
            "cbddf0af60fb6e8119051b276dd45d4f": {
              "brand": "二锅头",

              "normal": 2,
              "num": 2
            }
          },
          "id": "20210906131304502638",
          "money": 43033,
          "packingsPrice": 30,
          "paymentChannels": 0,
          "status": 8,
          "userId": "ojVpU5XXun_ZlsmtOJKIJktiTNjc"
        },
      ],
    }
  },
  methods: {
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
      const data = {
        offset: this.offset,
        limit: this.limit,
        needStatus: this.needStatus,
      }
      const res = await getOrderList(data)
      try {
        if (res.status === 1) {
          this.tableData = res.data
          // res.data.forEach(item =>{
          //   const td = {}
          //   td.
          // })
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
      return row.status === value;
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
  props:['filters', 'needStatus'],
  created() {
    this.initData();
  }
}
</script>

<style scoped>

</style>