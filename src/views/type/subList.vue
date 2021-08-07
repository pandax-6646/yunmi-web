<template>
  <el-card class="sub-type-list box-card">
    <div slot="header" class="clearfix">
      <span>二级分类列表列表</span>
      <el-button
        @click="$router.push('/type/list')"
        style="float: right; padding: 3px 0"
        type="text"
        >返回上一级</el-button
      >

      <el-button
        icon="el-icon-circle-plus"
        @click="add"
        style="float: right; padding: 3px 0; margin-right: 20px"
        type="text"
        >添加</el-button
      >
    </div>
    <el-table v-if="subTypeList.length == 0" :data="subTypeList" border stripe>
      <el-table-column align="center" prop="parentName" label="一级分类名称" />
      <el-table-column align="center" prop="name" label="二级分类名称" />
      <el-table-column
        :formatter="formatCreateTime"
        align="center"
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        :formatter="formatUpdateTime"
        align="center"
        prop="updateTime"
        label="更新时间"
      />

      <!-- 操作 -->
      <el-table-column align="center" label="操作" width="112">
        <template slot-scope="scope"
          ><el-button
            @click="edit(scope.row.id)"
            type="primary"
            icon="el-icon-edit"
            circle
          /><el-button
            @click="del(scope)"
            type="danger"
            icon="el-icon-delete"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-else :image-size="200" description="没有数据了" />
  </el-card>
</template>

<script>
import { subTypeRequest } from "@/api";
import { toast, initTime } from "@/mixin";
export default {
  name: "SubTypeList",
  data() {
    return {
      subTypeList: [],
    };
  },

  created() {
    this.getSubTypeList();
  },

  mixins: [toast, initTime],

  methods: {
    // 获取二级分类列表
    getSubTypeList() {
      subTypeRequest
        .getSubTypeListInfo()
        .then((res) => (this.subTypeList = res.result));
    },

    // 删除二级分类列表
    del(scope) {
      // 确认弹窗
      this.showConfirmBox(() => {
        // 发送删除数据的请求
        subTypeRequest.delSubTypeRowInfo({ id: scope.row.id }).then((res) => {
          if (res.code == 666) {
            // 页面剪切掉点击到的数据
            this.subTypeList.splice(scope.$index, 1);
            this.showMsg("success", "删除成功");
          }
        });
      });
    },

    // 跳转到编辑二级分类列表
    edit(id) {
      this.$router.push({
        path: "/type/subEdit",
        query: {
          ...this.$route.query,
          id,
        },
      });
    },

    // 添加二级分类列表
    add() {
      this.$router.push({
        path: "/type/subAdd",
        query: this.$route.query,
      });
    },
  },
};
</script>

<style>
</style>