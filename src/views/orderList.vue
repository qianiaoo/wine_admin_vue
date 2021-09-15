<template>
  <div>
    <head-top></head-top>
    <div class="top-div" style="padding-left: 20px; padding-top: 10px">
      <template>
        <el-checkbox v-model="needBill" @change="needBillChanged">显示需要开发票的订单</el-checkbox>
      </template>
    </div>
    <order-table ref="orderTable"></order-table>
  </div>
</template>

<script>
import orderTable from "../components/orderTable";
import headTop from "../components/headTop";

export default {
  name: "orderList",
  data() {
    return {
      needBill: false
      // tableData: []
    }
  },
  components:{
    headTop,
    orderTable,
  },
  created() {

  },
  methods: {
    needBillChanged() {
      if (this.needBill) {
        this.$ref.orderTable.getNeedBillOrders();
      } else {
        this.$ref.orderTable.initData();
      }
    }
    // async initData() {
    //
    // }
  }
}
</script>

<style scoped>

</style>