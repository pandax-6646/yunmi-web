<template>
  <el-card class="brand-add box-card">
    <div slot="header">
      <span>添加品牌</span>
    </div>

    <BrandForm
      :submit_text="'添加商品'"
      :formData="formData"
      @updataFormList="submitEditBrand"
    />
  </el-card>
</template>

<script>
import BrandForm from "./children/BrandForm.vue";
import { brandRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "BrandAdd",
  data() {
    return {
      formData: {},
    };
  },

  components: {
    BrandForm,
  },

  mixins: [toast],
  methods: {
    submitEditBrand() {
      if (Object.values(this.formData).every((val) => val != "")) {
        brandRequest
          .addBrandRowInfo(this.formData)
          .then((res) => {
            if (res.code == 666) {
              this.$router.push("/brand/list");
              this.showMsg("success", "添加成功！");
            }
          })
          .catch((err) => this.showMsg("error", "添加数据请求失败"));
      } else {
        this.showMsg("warning", "提交的字段不能为空");
      }
    },
  },
};
</script>

<style>
</style>