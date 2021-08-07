<template>
  <!-- 顶部导航栏 -->
  <div class="navbar-con">
    <div class="navbar-box">
      <span
        class="el-icon-s-unfold navbar-icon"
        @click="TOGGLE_SIDEBAR_AC"
        :class="{ 'is-active': this.sidebar.opened }"
      ></span>
      <myBreadcrumb></myBreadcrumb>
    </div>
    <div class="navbar-xiala flex">
      <el-dropdown>
        <span class="el-dropdown-link flex ai-c">
          <img src="@/assets/images/mz_small_icon.gif" class="navbar_img" />
          <span class="f999 f12 pr-10 ml-10">{{
            $store.state.user.realname
          }}</span>
          <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>首页</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import myBreadcrumb from "./Breadcrumb.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "navbar",
  components: {
    myBreadcrumb,
  },
  methods: {
    ...mapActions(["TOGGLE_SIDEBAR_AC"]),
    logout() {
      this.$store.dispatch("LogoutAC");
      this.$router.go(0);
    },
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
};
</script>

<style lang="less" scoped>
.navbar-con {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  .navbar-box {
    display: flex;
    // height: 50px;
    // line-height: 50px;
    .navbar-icon {
      margin-top: 17px;
      margin-left: 17px;
      width: 16px;
      height: 16px;
      transform: rotate(0deg);
      transition: 1s;
      transform-origin: 50% 50%;
      display: inline-block;
    }
    .is-active {
      transform: rotate(90deg);
    }
  }
  .navbar-xiala {
    margin-right: 20px;
    .navbar_img {
      width: 40px;
      height: 40px;
      margin-top: 5px;
      border-radius: 5px;
    }
  }
}
</style> 