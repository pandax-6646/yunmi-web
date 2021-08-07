<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
}

.box-card {
  margin: 10px;
}
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.side-active .el-menu-item {
  background-color: rgb(67, 74, 80) !important;
  i,
  span {
    color: rgb(64, 158, 255) !important;
  }
}
</style>
