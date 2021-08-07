<template>
  <div class="app-wrapper">
    <Sidebar
      class="sidebar"
      :class="sidebar.opened ? 'sidebar-w1' : 'sidebar-w'"
    ></Sidebar>
    <div
      class="main-container"
      :class="sidebar.opened ? 'main-c-left1' : 'main-c-left'"
    >
      <Navbar class="navbar"></Navbar>
      <div class="main-con">
        <!-- 路由出口 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
//引入 头部和左侧
//..相对路径
import Navbar from "./Navbar.vue";
//@ 绝对路径  ，@ 代表 src目录
import Sidebar from "./Sidebar.vue";

//获取store的状态值
import { mapGetters } from "vuex";

export default {
  name: "layout",
  components: {
    Sidebar,
    Navbar,
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
};
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  max-height: 100%;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
  .sidebar {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background: #545c64;
    color: #fff;
  }
  .sidebar-w {
    width: 200px;
  }
  .sidebar-w1 {
    width: 64px;
  }
  .main-container {
    clear: both;
    min-height: 100%;
    .navbar {
      height: 50px;
      line-height: 50px;
      background: #fff;
      border-bottom: 1px solid #eee;
    }
    .main-con {
      width: 100%;
    }
  }
  .main-c-left {
    margin-left: 200px;
  }
  .main-c-left1 {
    margin-left: 64px;
  }
}
</style>