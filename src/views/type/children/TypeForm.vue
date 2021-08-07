<template>
  <el-form
    class="user-form"
    label-width="100px"
    :model="formData"
    style="width: 70%"
  >
    <el-form-item label="列表名称">
      <el-input autofocus v-model="formData.name" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="$emit('updataFormList')">{{
        submit_text
      }}</el-button>
      <el-button @click="clearFormData">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    submit_text: {
      type: String,
      default: "更新分类",
    },
    formData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    clearFormData() {
      Object.keys(this.formData).forEach((prop) => (this.formData[prop] = ""));
    },
  },
};
</script>