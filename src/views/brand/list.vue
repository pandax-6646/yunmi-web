<template>
  <el-card class="brand-list box-card">
    <div slot="header" class="clearfix">
      <span>品牌列表</span>
    </div>
    <el-table v-if="brandList.length != 0" :data="brandList" border stripe>
      <el-table-column align="center" prop="name" label="品牌名称" />

      <el-table-column
        align="center"
        :formatter="formatCreateTime"
        prop="createTime"
        label="创建时间"
      />

      <el-table-column
        align="center"
        :formatter="formatUpdateTime"
        prop="updateTime"
        label="更新时间"
      />

      <!-- 操作 -->
      <el-table-column align="center" label="操作" width="112">
        <template slot-scope="scope"
          ><el-button
            @click="edit(scope)"
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
import { brandRequest } from "@/api";
import { toast } from "@/mixin";
import { initTime } from "@/mixin";
export default {
  name: "BrandList",

  data() {
    return {
      brandList: [],
    };
  },

  created() {
    this.getBrandList();
  },
  mixins: [toast, initTime],
  methods: {
    // 获取用户列表数据
    getBrandList() {
      brandRequest
        .getBrandListInfo({ pageNum: 1 })
        .then((res) => (this.brandList = res.result));
    },

    // 编辑按钮
    edit(scope) {
      this.$router.push({
        path: "/brand/edit",
        query: {
          id: scope.row.id,
        },
      });
    },

    // 删除按钮
    del(scope) {
      // 确认弹窗
      this.showConfirmBox(() => {
        // 删除数据的请求
        brandRequest.delBrandRowInfo({ id: scope.row.id }).then((res) => {
          if (res.code == 666) {
            // 页面剪切掉点击到的数据
            this.brandList.splice(scope.$index, 1);
            this.showMsg("success", "删除成功");
          }
        });
      });
    },
  },
};
</script>
