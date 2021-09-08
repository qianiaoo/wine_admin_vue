<template>
  <div>
    <head-top></head-top>
    <order-table ></order-table>
  </div>
</template>

<script>
import orderTable from "../components/orderTable";
import headTop from "../components/headTop";

export default {
  name: "orderList",
  components:{
    headTop,
    orderTable,
  }
}
</script>

<style scoped>

</style>