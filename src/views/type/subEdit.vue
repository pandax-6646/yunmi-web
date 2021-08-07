<template>
  <el-card class="sub-type-edit box-card">
    <div slot="header">
      <span>编辑二级列表</span>
    </div>

    <TypeForm
      :submit_text="'更新二级分类'"
      :formData="formData"
      @updataFormList="submitEditSubType"
    />
  </el-card>
</template>

<script>
import TypeForm from "./children/TypeForm.vue";
import { subTypeRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "SubTypeEdit",

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
    // 获取二级分类详情
    getTypeDetailInfo() {
      subTypeRequest
        .subTypeRowInfoDetail({ id: this.$route.query.id })
        .then((res) => (this.formData = res.result));
    },

    // 提交分类修改
    submitEditSubType() {
      // 检测提交的字段不为空
      if (Object.values(this.formData).every((val) => val != "")) {
        subTypeRequest.editSubTypeRowInfo(this.formData).then((res) => {
          if (res.code == 666) {
            this.$router.push({
              path: "/type/subList",
              query: {
                parentId: this.$route.query.parentId,
                parentName: this.$route.query.parentName,
              },
            });
            this.showMsg(res.msg, "修改成功");
          }
        });
      } else {
        this.showMsg("warning", "所有字段都必须提交");
      }
    },
  },
};
</script>

<style>
</style>