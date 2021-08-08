<template>
  <el-card class="product-list box-card">
    <div slot="header" class="clearfix flex jc-sb ai-c">
      <span>产品列表</span>
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="keyword"
          clearable
          style="width: 400px; transition: all 0.5s"
          class="mr-10"
          prefix-icon="el-icon-search"
          @change="searchKeyword"
          @focus="inputFocus"
          @blur="inputBlur"
        />
        <el-button type="primary" @click="searchKeyword">搜索</el-button>
      </div>

      <span></span>
    </div>

    <el-table
      :data="currPageProductData"
      v-if="currPageProductData.length != 0"
      border
      stripe
      v-loading="isLoading"
      element-loading-text="玩命加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 0.9)"
    >
      <el-table-column align="center" label="产品状态" width="120">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            @change="changeState(scope)"
            placeholder="请选择"
          >
            <el-option label="上架" value="01" />
            <el-option label="下架" value="02" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="imgUrl"
        label="产品图片"
        width="100"
      >
        <template slot-scope="scope">
          <img
            :src="scope.row.imgUrl"
            style="width: 100%; border-radius: 5px"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="name"
        label="品牌名称"
      /><el-table-column align="center" prop="brandMsg" label="产品名称" />
      /><el-table-column align="center" prop="description" label="产品描述" />
      <el-table-column
        align="center"
        prop="typeMsg"
        label="产品分类"
        width="90"
      />
      <el-table-column align="center" prop="stock" label="库存" width="50" />
      <el-table-column
        :formatter="formatPrice"
        align="center"
        prop="price"
        label="价格"
        width="70"
      />
      <el-table-column
        :formatter="formatCreateTime"
        align="center"
        prop="createTime"
        label="创建时间"
        width="95"
      />
      <el-table-column
        :formatter="formatUpdateTime"
        align="center"
        prop="updateTime"
        label="更新时间"
        width="95"
      />
      <el-table-column align="center" label="操作" width="115">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="edit(scope.row.id)"
            circle
          />
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="del(scope)"
            circle
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 空状态 -->
    <el-empty v-else :image-size="200" description="没有数据了" />

    <!-- 分页 -->
    <el-pagination
      @current-change="changeCurrPage"
      :current-page="currPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalPage"
      hide-on-single-page
      class="flex jc-c mt-30"
    />
  </el-card>
</template>

<script>
import { toast, initTime, initPrice } from "@/mixin";
import { productRequest } from "@/api";
export default {
  name: "ProductList",
  data() {
    return {
      // 当前页的产品数据
      currPageProductData: [],

      // 当前页码
      currPage: 1,

      // 一页展示的数据条数
      pageSize: 4,

      // 总数据条数
      totalPage: null,

      // 是否显示加载中
      isLoading: true,

      // 搜索关键字
      keyword: "",
    };
  },

  created() {
    this.getProductList();
  },

  mixins: [initTime, toast, initPrice],

  methods: {
    // 发送请求修改产品的上架状态
    changeState(scope) {
      let { id, status } = scope.row;
      productRequest
        .changeStateInfo({ id, status })
        .then((res) => {
          console.log(res.result);
          if (res.code == 666) {
            this.showMsg("success", "产品状态修改成功");
          }
        })
        .catch((err) => {
          this.showMsg("error", "产品状态修改失败，请稍后再试");
          scope.row.status =
            scope.row.status == "01" ? (scope.row.status = "02") : "01";
        });
    },

    // 获取分页的产品列表
    getProductList() {
      let data = {
        currPage: this.currPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
      };

      productRequest.getProductListInfo(data).then((res) => {
        this.currPageProductData = res.result;
        this.totalPage = res.totalPage;

        // 关闭加载中图标
        this.isLoading = false;
      });
    },

    // 修改当前的页码
    changeCurrPage(pag) {
      this.isLoading = true;
      this.currPage = pag;
      this.getProductList();
    },

    // 搜索
    searchKeyword() {
      this.currPage = 1;
      this.getProductList();
    },

    // 编辑
    edit(id) {
      this.$router.push({
        path: "/product/edit",
        query: {
          id,
        },
      });
    },

    // 删除
    del(scope) {
      this.showConfirmBox(() => {
        productRequest.delProductRowInfo({ id: scope.row.id }).then((res) => {
          if (res.code == 666) {
            this.showMsg("success", "删除成功");

            // 删除成功需要重新请求数据，
            this.getProductList();
          }
        });
      });
    },

    // input 框聚焦
    inputFocus(event) {
      event.target.parentNode.style.width = "600px";
      event.target.parentNode.style.boxShadow = "0 0 0 3px rgba(64,158,255,.3)";
      event.target.style.borderRadius = "0";
    },

    // input 框聚焦
    inputBlur(event) {
      event.target.parentNode.style.width = "400px";
      event.target.parentNode.style.boxShadow = "";
      event.target.style.borderRadius = "4px";
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>