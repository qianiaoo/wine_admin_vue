<template>
  <div>
    <head-top></head-top>
    <order-table></order-table>
  </div>
</template>

<script>
import orderTable from "../components/orderTable";
import headTop from "../components/headTop";

export default {
  name: "orderList",
  data() {
    return {
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
    // async initData() {
    //
    // }
  }
}
</script>

<style scoped>

</style>