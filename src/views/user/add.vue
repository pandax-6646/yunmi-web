<template>
  <el-card class="user-add box-card">
    <div slot="header">
      <span>添加用户</span>
    </div>

    <UserForm
      :submit_text="'添加用户'"
      :formData="formData"
      @updataFormList="submitAddUser"
    />
  </el-card>
</template>

<script>
import UserForm from "./children/UserForm";
import { userRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "userAdd",
  data() {
    return {
      formData: {},
    };
  },

  components: {
    UserForm,
  },

  mixins: [toast],
  methods: {
    submitAddUser() {
      if (Object.values(this.formData).every((val) => val != "")) {
        userRequest
          .addUserRowInfo(this.formData)
          .then((res) => {
            this.$router.push("/user/list");
            this.showMsg("success", "添加成功！");
          })
          .catch((err) => this.showMsg("error", "添加数据请求失败"));
      } else {
        this.showMsg("warning", "提交的字段不能为空");
      }
    },
  },
};
</script>
