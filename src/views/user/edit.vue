<template>
  <el-card class="user-edit box-card">
    <div slot="header">
      <span>编辑用户</span>
    </div>

    <UserForm :formData="formData" @updataFormList="submitEditUser" />
  </el-card>
</template>
<script>
import { userRequest } from "@/api";
import UserForm from "./children/UserForm.vue";
import { toast } from "@/mixin";
export default {
  name: "UserEdit",
  data() {
    return {
      formData: {},
    };
  },

  components: {
    UserForm,
  },

  created() {
    this.getUserDetailInfo();
  },
  mixins: [toast],
  methods: {
    // 获取用户详情,以供修改
    getUserDetailInfo() {
      userRequest
        .userRowInfoDetail({ id: this.$route.query.id })
        .then((res) => (this.formData = { ...res.result, password: 123 }));
    },

    // 提交编辑后的用户信息
    submitEditUser() {
      // 检测提交的字段不为空
      if (Object.values(this.formData).every((val) => val != "")) {
        userRequest
          .editUserRowInfo(this.formData)
          .then((res) => {
            if (res.code == 666) {
              this.$router.push("/user/list");
              this.showMsg(res.msg, "修改成功");
            }
          })
          .catch((err) => this.showMsg("error", "修改数据请求失败"));
      } else {
        this.showMsg("warning", "所有字段都必须提交");
      }
    },
  },
};
</script>