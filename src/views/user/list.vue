<template>
  <el-card class="user-list box-card">
    <div slot="header" class="clearfix">
      <span>用户列表</span>
    </div>
    <el-table v-if="userList.length == 0" :data="userList" border stripe>
      <el-table-column
        :formatter="formatCreateTime"
        align="center"
        prop="createTime"
        label="日期"
      />
      <el-table-column align="center" prop="username" label="用户姓名" />
      <el-table-column align="center" prop="realname" label="真实姓名" />
      <el-table-column
        :formatter="formatRole"
        align="center"
        prop="role"
        label="角色"
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
import { userRequest } from "@/api";
import { toast } from "@/mixin";
import { initTime } from "@/mixin";
export default {
  name: "UserList",
  data() {
    return {
      userList: [],
    };
  },

  created() {
    this.getUserList();
  },
  mixins: [toast, initTime],
  methods: {
    // 获取用户列表数据
    getUserList() {
      userRequest
        .getUserListInfo()
        .then((res) => {
          this.userList = res.result;
        })
        .catch((err) => console.log(err));
    },

    // 格式化角色名称
    formatRole(item) {
      let roleName = "";
      if (item.role == 1) {
        roleName = "超级管理员";
      } else if (item.role == 2) {
        roleName = "管理员";
      } else {
        roleName = "员工";
      }
      return roleName;
    },

    // 编辑按钮
    edit(scope) {
      this.$router.push({
        path: "/user/edit",
        query: {
          id: scope.row.id,
        },
      });
    },

    // 删除按钮
    del(scope) {
      this.showConfirmBox(() => {
        // 删除数据的请求
        userRequest.delUserRowInfo({ id: scope.row.id }).then((res) => {
          if (res.code == 666) {
            // 页面剪切掉点击到的数据;
            this.userList.splice(scope.$index, 1);
            this.showMsg("success", "删除成功");
          }
        });
      });
    },
  },
};
</script>