<template>
  <div>
    <el-card class="user-edit box-card">
      <div slot="header">
        <span>编辑品牌</span>
      </div>

      <BrandFrom :formData="formData" @updataFormList="submitEditBrand" />
    </el-card>
  </div>
</template>
<script>
import { brandRequest } from "@/api";
import BrandFrom from "./children/BrandForm";
import { toast } from "@/mixin";
export default {
  name: "BrandEdit",
  data() {
    return {
      formData: {},
    };
  },

  components: {
    BrandFrom,
  },

  created() {
    this.getBrandDetailInfo();
  },

  mixins: [toast],

  methods: {
    // 获取用户详情,以供修改
    getBrandDetailInfo() {
      brandRequest
        .brandRowInfoDetail({ id: this.$route.query.id })
        .then((res) => (this.formData = res.result));
    },

    // 提交编辑后的用户信息
    submitEditBrand() {
      // 检测提交的字段不为空
      if (Object.values(this.formData).every((val) => val != "")) {
        brandRequest.editBrandRowInfo(this.formData).then((res) => {
          if (res.code == 666) {
            this.$router.push("/brand/list");
            this.showMsg(res.msg, "修改成功");
          }
        });
      } else {
        this.showMsg("warning", "提交的字段不能为空");
      }
    },
  },
};
</script>