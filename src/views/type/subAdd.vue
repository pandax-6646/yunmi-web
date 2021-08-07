<template>
  <el-card class="type-add box-card">
    <div slot="header">
      <span>添加二级列表</span>
    </div>

    <TypeForm
      :submit_text="'添加二级分类'"
      :formData="formData"
      @updataFormList="submitAddSubType"
    />
  </el-card>
</template>

<script>
import TypeForm from "./children/TypeForm.vue";
import { subTypeRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "SubTypeAdd",

  data() {
    return {
      formData: {},
    };
  },

  components: {
    TypeForm,
  },

  mixins: [toast],
  methods: {
    // 提交分类修改
    submitAddSubType() {
      // 检测提交的字段不为空
      if (Object.values(this.formData).every((val) => val != "")) {
        let data = {
          ...this.formData,
          ...this.$route.query,
        };
        subTypeRequest
          .addSubTypeRowInfo(data)
          .then((res) => {
            if (res.code == 666) {
              this.$router.go(-1);
              this.showMsg(res.msg, "添加成功");
            }
          })
          .catch((err) => this.showMsg("error", "添加数据请求失败"));
      } else {
        this.showMsg("warning", "所有字段都必须提交");
      }
    },
  },
};
</script>

<style>
</style>