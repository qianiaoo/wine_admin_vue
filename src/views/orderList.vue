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
  watch: {
    '$route'(to, from) {
      console.log("$route")
      console.log(from);
      console.log(to);
      if (to.path === '/orderList') {
        console.log("totototot")
        this.$refs.orderTable.initData();
      }
    }
  },
  methods: {
    needBillChanged() {
      if (this.needBill) {
        this.$refs.orderTable.getNeedBillOrders();
      } else {
        this.$refs.orderTable.initData();
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
