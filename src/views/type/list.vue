<template>
  <el-card class="type-list box-card">
    <div slot="header" class="clearfix">
      <span>分类列表</span>
    </div>

    <el-table v-if="typeList.length != 0" :data="typeList" border stripe>
      <el-table-column align="center" prop="name" label="分类名称" />
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
      <el-table-column align="center" label="操作" width="175">
        <template slot-scope="scope">
          <el-button @click="toSubType(scope.row)" type="text" size="small"
            >查看下级</el-button
          >
          <el-button
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
import { typeRequest } from "@/api";
import { toast, initTime } from "@/mixin";
export default {
  name: "TypeList",
  data() {
    return {
      typeList: [],
    };
  },

  created() {
    this.getTypeList();
  },

  mixins: [initTime, toast],

  methods: {
    // 获取分类列表
    getTypeList() {
      typeRequest.getTypeListInfo().then((res) => (this.typeList = res.result));
    },

    // 跳转到二级分类列表
    toSubType(info) {
      this.$router.push({
        path: "/type/subList",
        query: {
          parentId: info.id,
          parentName: info.name,
        },
      });
    },

    // 跳转到编辑分类列表
    edit(id) {
      this.$router.push({
        path: "/type/edit",
        query: {
          id,
        },
      });
    },

    // 删除分类列表
    del(scope) {
      // 确认弹窗
      this.showConfirmBox(() => {
        // 发送删除数据的请求
        typeRequest.delTypeRowInfo({ id: scope.row.id }).then((res) => {
          if (res.code == 666) {
            // 页面剪切掉点击到的数据
            this.typeList.splice(scope.$index, 1);
            this.showMsg("success", "删除成功");
          }
        });
      });
    },
  },
};
</script>

<style>
</style>