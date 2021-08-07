<template>
  <!-- 侧边栏 -->

  <div class="mymenu">
    <!-- $route.path 当前路径  ，index 里面写 对应页面的路径 -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="rgb(64, 158, 255)"
      :collapse="sidebar.opened"
    >
      <el-menu-item style="background-color: #303133">
        <span slot="title" style="color: #fff">云米商城后台管理系统</span>
      </el-menu-item>

      <template v-for="(item, index) in routes">
        <!-- 没有子路由 -->
        <router-link
          exact
          active-class="side-active"
          :to="item.path"
          :key="index"
          v-if="!item.children"
        >
          <el-menu-item :index="String(index + 1)">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span class="ml-5 title" slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </router-link>

        <!-- 只有一个路由 -->
        <router-link
          exact
          active-class="side-active"
          :to="`${item.path === '/' ? '' : item.path}/${item.children[0].path}`"
          :key="index"
          v-if="item.children && item.children.length === 1"
        >
          <el-menu-item :index="String(index + 1)">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span class="ml-5 title" slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
        </router-link>

        <!-- 有多个子路由 -->
        <el-submenu
          :index="String(index + 1)"
          :key="index"
          v-if="item.children && item.children.length > 1"
        >
          <template slot="title">
            <div>
              <i class="iconfont" :class="item.meta.icon"></i>
              <span class="ml-5">{{ item.meta.title }}</span>
            </div>
          </template>
          <el-menu-item-group>
            <template v-for="(sub, subIndex) in item.children">
              <router-link
                exact
                active-class="side-active"
                :to="item.path + '/' + sub.path"
                :key="sub.name"
                v-if="!sub.meta.hidden"
              >
                <el-menu-item :index="index + '-' + subIndex">
                  <span class="iconfont" :class="sub.meta.icon"></span>
                  <span class="ml-5">{{ sub.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </template>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
//左侧菜单可以写成 循环的形式；this.$router
import { mapState, mapGetters } from "vuex";
import { adminRoutes, superRoutes } from "@/router/index";
export default {
  name: "sidebar",

  computed: {
    ...mapState(["user"]),
    routes() {
      if (this.user.role == 1) {
        return superRoutes;
      } else if (this.user.role == 2) {
        return adminRoutes;
      }
    },
    ...mapGetters(["sidebar"]),
  },
};
</script>

<style scoped lang="less">
.mymenu {
  height: 100%;
  overflow-y: auto;
  .iconfont {
    vertical-align: middle;
  }
  .el-menu {
    border-right: none;
  }
}
.el-menu-item {
  .iconfont {
    color: #fff;
  }
}
.el-submenu__title {
  display: flex;
  align-items: center;
  .iconfont {
    color: #fff;
  }
}
</style>
