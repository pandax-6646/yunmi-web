<template>
  <div class="flex jc-sb wp-100">
    <div id="weekAmount" style="height: 400px; width: 43%"></div>
    <div style="border-right: 1px solid #d5d5d5"></div>
    <div id="yearAmount" style="height: 400px; width: 53%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  methods: {
    // 渲染表格
    randerChart(dataAmount) {
      // 有数据才去渲染表格
      if (Object.values(dataAmount).length == 0) return;

      // 周销量图表参数
      let optionWeek = {
        title: { text: "本周销量" },
        dataset: {
          source: [
            ["score", "amount", "product"],
            [dataAmount.weekData[0], dataAmount.weekData[0], "周一"],
            [dataAmount.weekData[1], dataAmount.weekData[1], "周二"],
            [dataAmount.weekData[2], dataAmount.weekData[2], "周三"],
            [dataAmount.weekData[3], dataAmount.weekData[3], "周四"],
            [dataAmount.weekData[4], dataAmount.weekData[4], "周五"],
            [dataAmount.weekData[5], dataAmount.weekData[5], "周六"],
            [dataAmount.weekData[6], dataAmount.weekData[6], "周日"],
          ],
        },
        grid: { containLabel: true },
        xAxis: { name: "销量" },
        yAxis: { name: "周期", type: "category" },
        visualMap: {
          orient: "horizontal",
          left: "center",

          // 销量的最大值与最小值
          min: 50,
          max: 210,
          text: ["高", "低"],
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
        },
        series: [
          {
            type: "bar",
            encode: {
              x: "amount",
              y: "product",
            },
          },
        ],
      };

      // 渲染图表
      echarts.init(document.getElementById("weekAmount")).setOption(optionWeek);

      // 年销量图表参数
      let myChart = echarts.init(document.getElementById("yearAmount"));
      let dataAxis = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ];
      let data = dataAmount.yearData;
      let option = {
        title: {
          text: "年度销量",
        },
        xAxis: {
          name: "月份",
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#fff",
            },
          },
          axisTick: {
            show: true,
          },
          axisLine: {
            show: true,
          },
          z: 10,
        },
        yAxis: {
          name: "销量",
          axisLine: {
            show: true,
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            textStyle: {
              color: "#999",
            },
          },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: data,
          },
        ],
      };

      let zoomSize = 6;
      myChart.on("click", function (params) {
        myChart.dispatchAction({
          type: "dataZoom",
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[
              Math.min(params.dataIndex + zoomSize / 2, data.length - 1)
            ],
        });
      });

      myChart.setOption(option);
    },
  },
};
</script>

