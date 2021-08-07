<template>
  <div class="login-index">
    <el-card class="box-card">
      <div slot="header" class="clearfix box-header">
        <span>云米商城后台管理系统</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { toast } from "@/mixin";
export default {
  name: "login",
  data() {
    /**
     * rule 验证规则
     * value 将要进行验证的字符串
     * callback 验证成功或失败的回调函数
     */
    const validateUsername = (rule, value, callback) => {

      //将value 去掉 左右空格
      const myvalue = value.trim();
      const reg = /^[a-zA-Z0-9]{4,16}$/;
      if (!reg.test(myvalue)) {
        //验证不通过
        callback(new Error("请输入4-16位的数字或大小写字母"));
      } else {
        //验证通过
        callback();
      }
    };
    return {
      ruleForm: {
        username: "super",
        password: "1234",
      },

      rules: {
        //正则验证
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },

          //validator:validateUsername 自定义验证
          { validator: validateUsername, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入密码" },
          // { min: 4, max: 8, message: "密码请输入4-8位" },
        ],
      },
    };
  },

  mixins: [toast],

  methods: {
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //验证通过
          //希望调用 vuex的actions 来完成登录效果
          this.$store.dispatch("LoginAC", this.ruleForm).then((res) => {
            if (res.code == 666) {
              this.showMsg("success", "登陆成功");
              this.$router.push("/");
            }
          });
        } else {
          this.showMsg("error", "验证失败");
        }
      });
    },

    // 重置表单
    resetForm() {
      Object.Value(this.resetForm).forEach((val) => val == "");
    },
  },
};
</script>

<style lang="less" scoped>
.login-index {
  padding-top: 1px;
  height: 100%;
  background-image: url("~@/assets/images/bg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.box-card {
  overflow: hidden;
  width: 500px;
  margin: 200px auto;
  .box-header {
    background: skyblue;
    font-size: 30px;
    font-weight: bold;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
  }
}
</style>