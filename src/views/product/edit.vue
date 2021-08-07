<template>
  <el-card class="box-card product-edit">
    <div slot="header" class="clearfix">
      <span>产品编辑</span>
    </div>
    <el-form label-width="95px" :model="goods" style="width: 60%">
      <el-form-item label="编号：">
        <el-input disabled clearable v-model="goods.id" />
      </el-form-item>
      <el-form-item label="分类：">
        <ProductCascader @selectCard="selectCard" />
      </el-form-item>
      <el-form-item label="typeMsg："
        ><el-input disabled v-model="goods.typeMsg" />
      </el-form-item>
      <el-form-item label="名称：">
        <el-input v-model="goods.name" />
      </el-form-item>
      <el-form-item label="描述：">
        <el-input v-model="goods.description" />
      </el-form-item>

      <el-form-item label="品牌：">
        <el-cascader
          clearable
          v-model="goods.brandMsg"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="brandMsg：">
        <el-input disabled v-model="goods.brandMsg" />
      </el-form-item>

      <el-form-item label="介绍：">
        <el-input v-model="goods.subTitle" />
      </el-form-item>
      <el-form-item label="图片地址：">
        <el-input v-model="goods.imgUrl" />
        <el-image style="width: 100px; height: 100px" :src="goods.imgUrl">
          <div slot="error" class="image-slot">
            <i
              class="el-icon-picture-outline"
              style="font-size: 100px; color: rgba(0, 0, 0, 0.2) border: 1px solid rgba(0, 0, 255, 0.4)"
            ></i>
          </div>
        </el-image>
      </el-form-item>
      <el-form-item label="货号：">
        <el-input disabled clearable v-model="goods.sn" />
      </el-form-item>

      <el-form-item label="现价：">
        <el-input v-model="goods.price" />
      </el-form-item>
      <el-form-item label="库存：">
        <el-input v-model="goods.stock" />
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="goods.unit" />
      </el-form-item>
      <el-form-item label="重量：">
        <el-input v-model="goods.weight" />
      </el-form-item>
      <el-form-item label="上下架：">
        <el-select v-model="goods.status" placeholder="请选择">
          <el-option label="上架" value="01" />
          <el-option label="下架" value="02" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="initGoodsInfo">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ProductCascader from "./children/ProductCascader";
import { productRequest, brandRequest } from "@/api";
import { toast } from "@/mixin";
export default {
  name: "ProductEdit",
  data() {
    return {
      goods: {},
      value: "02",
      typeMsg: "",
      brandName: "",
      brandMsg: this.brandMsg ? this.brandMsg.join(" ") : "",
      options: [
        { label: "小米", value: "小米", children: null },
        { label: "华为", value: "华为", children: null },
        { label: "vivo", value: "vivo", children: null },
        { label: "一加", value: "一加", children: null },
        { label: "OPPO", value: "OPPO", children: null },
        { label: "黑莓", value: "黑莓", children: null },
        { label: "锤子", value: "锤子", children: null },
        { label: "Apple", value: "Apple", children: null },
      ],
    };
  },

  components: {
    ProductCascader,
  },

  created() {
    this.randerProductDetailInfo();
  },

  mixins: [toast],

  methods: {
    randerProductDetailInfo() {
      // 获取产品详情信息
      productRequest.productRowDetailInfo(this.$route.query).then((res) => {
        this.goods = res.result;

        // 获取品牌名称
        brandRequest
          .brandRowInfoDetail({ id: this.goods.brand })
          .then((res) => (this.brandName = res.result));
      });
    },

    // 提交表单
    onSubmit() {
      // 所有字段必须有值才可以提交
      let count = 0;
      Object.values(this.goods).forEach((val) => (val == "" ? count++ : ""));
      console.log(count);
      if (count <= 1) {
        productRequest.editProductRowInfo(this.goods).then((res) => {
          if (res.code == 666) {
            this.$router.push("/product/list");
            this.showMsg("success", "修改成功");
          }
        });
      } else {
        this.showMsg("warning", "所有字段都必须提交");
      }
    },

    selectCard(val) {
      this.goods.typeMsg = val;
    },
    handleChange(val) {
      this.goods.brandMsg = val.join("");
    },

    // 清空表单
    initGoodsInfo() {
      this.goods.name = "";
      this.goods.description = "";
      this.goods.price = "";
      this.goods.weight = "";
      this.goods.status = "";
    },
  },
};
</script>

<style>
</style>