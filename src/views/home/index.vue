<template>
  <el-card class="home-index box-card">
    <div slot="header" class="clearfix">
      <span>数据统计</span>
    </div>
    <div class="home-title flex jc-sa ai-c mt-20 mb-30">
      <div
        class="item flex"
        v-for="orderItem in homeOrderData"
        :key="orderItem.id"
      >
        <i class="el-icon-s-data"></i>
        <div class="ml-15 flex jc-sa fd-c ta-c">
          <p>{{ orderItem.name }}</p>

          <AutoNum :maxNum="+orderItem.count" />
        </div>
      </div>
    </div>

    <Amount ref="amount" />
  </el-card>
</template>

<script>
import { homeRequest } from "@/api";
import Amount from "./children/Amount";
import AutoNum from "./children/AutoNum";
export default {
  name: "Home",
  data() {
    return {
      homeOrderData: null,
    };
  },

  created() {
    this.getHomeData();
  },

  components: {
    Amount,
    AutoNum,
  },

  methods: {
    // 获取数据
    getHomeData() {
      homeRequest
        .getHomeChartData()
        .then((res) => {
          this.homeOrderData = res.result.orderData;
          this.$refs.amount.randerChart(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.home-title {
  i {
    font-size: 60px;
    color: rgb(64, 158, 255);
  }
}
.item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
}
</style>