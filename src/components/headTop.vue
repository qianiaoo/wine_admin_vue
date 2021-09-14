<template>
  <div class="header_container">

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">待接单列表</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button round :click="logout">登出</el-button>

  </div>
</template>

<script>
import {logout} from '../utils/api'
// import {mapActions, mapState} from 'vuex'

export default {
  data(){
    return {
    }
  },
  created(){
    // if (!this.adminInfo.id) {
    //   this.getAdminData()
    // }
  },
  computed: {
    // ...mapState(['adminInfo']),
  },
  methods: {
    async logout() {
      const res = await logout()
      if (res.status == 1) {
        this.$message({
          type: 'success',
          message: '退出成功'
        });
        this.$router.push('/');
      } else {
        this.$message({
          type: 'error',
          message: res.message
        });
      }
    },

      // ...mapActions(['getAdminData']),
      // async
      // handleCommand(command)
      // {
      //   if (command == 'home') {
      //     this.$router.push('/manage');
      //   } else if (command == 'signout') {
      //     const res = await signout()
      //     if (res.status == 1) {
      //       this.$message({
      //         type: 'success',
      //         message: '退出成功'
      //       });
      //       this.$router.push('/');
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.message
      //       });
      //     }
      //   }
      // }
    // ,
    }
}
</script>

<style lang="less">
@import '../style/mixin';
.header_container{
  background-color: #EFF2F7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator{
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item{
  text-align: center;
}
</style>
