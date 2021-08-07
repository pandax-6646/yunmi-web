<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item v-for="(item, index) in breadData" :key="index">
      <template v-if="index != breadData.length - 1">
        <router-link :to="{ path: item.path }">{{
          item.meta.title
        }}</router-link>
      </template>
      <template v-else>{{ item.meta.title }}</template>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "mybreadcrumb",
  data: function () {
    return {
      breadData: [], //保存面包屑导航
    };
  },
  mounted() {
    this.getBreadData();
  },

  methods: {
    //获取并重组 面包屑导航
    getBreadData() {
      let breadData = this.$route.matched;
      //非首页，需要在 面包屑导航的前面加一级首页导航
      if (breadData[1].path == "/home") {
        //首页
        breadData = [{ path: "/home", meta: { title: "首页" } }];
      } else {
        breadData = [{ path: "/home", meta: { title: "首页" } }].concat(
          breadData
        );
      }
      this.breadData = breadData;
    },
  },
  watch: {
    $route() {
      this.getBreadData();
    },
  },
};
</script>

<style scoped>
.bread {
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}
</style>