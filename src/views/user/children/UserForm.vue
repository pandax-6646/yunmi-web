<template>
  <div class="user-form">
    <el-form label-width="100px" :model="formData" style="width: 70%">
      <el-form-item label="用户名：">
        <el-input autofocus v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名：">
        <el-input v-model="formData.realname"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-input v-model="formData.role"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="$emit('updataFormList')">{{
          submit_text
        }}</el-button>
        <el-button  @click="clearFormData">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "userForm",
  props: {
    submit_text: {
      type: String,
      default: "更新用户",
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