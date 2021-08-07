<template>
  <el-card class="type-edit box-card">
    <div slot="header">
      <span>编辑一级列表</span>
    </div>

    <TypeForm :formData="formData" @updataFormList="submitEditType" />
  </el-card>
</template>

<script>
import TypeForm from "./children/TypeForm.vue";
import { typeRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "TypeEdit",

  data() {
    return {
      formData: {},
    };
  },

  components: {
    TypeForm,
  },

  created() {
    this.getTypeDetailInfo();
  },
  mixins: [toast],
  methods: {
    // 获取分类详情
    getTypeDetailInfo() {
      typeRequest
        .typeRowInfoDetail({ id: this.$route.query.id })
        .then((res) => {
          this.formData = res.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 提交分类修改
    submitEditType() {
      // 检测提交的字段不为空
      if (Object.values(this.formData).every((val) => val != "")) {
        typeRequest
          .editTypeRowInfo(this.formData)
          .then((res) => {
            if (res.code == 666) {
              this.$router.push("/type/list");
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

<style>
</style>