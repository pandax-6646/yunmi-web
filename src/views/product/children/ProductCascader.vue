<template>
  <el-cascader
    clearable
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"
  />
</template>

<script>
import { typeRequest, subTypeRequest } from "@/api";
import { initTime } from "@/mixin";
export default {
  data() {
    return {
      value: [],
      options: [],
    };
  },

  created() {
    this.getTypeAllInfo();
  },

  mixins: [initTime],

  methods: {
    async getTypeAllInfo() {
      // 获取一二级分类的数据
      let p1 = typeRequest.getTypeListInfo();
      let p2 = subTypeRequest.getSubTypeListInfo();
      let resList = await Promise.all([p1, p2]);

      this.reformTypeData(resList);
    },

    // 改造分类里的数据
    async reformTypeData(data) {
      let [list1, list2] = data;

      // 改造一级分类的数据列表
      let typeList = list1.result.map((item) => {
        return {
          label: item.name,
          id: item.id,
          value: item.name,
          children: null,
        };
      });

      // 改造二级分类的数据列表
      let subTypeList = list2.result.map((item) => {
        return {
          label: item.name,
          id: item.id,
          parentId: item.parentId,
          value: item.name,
          children: null,
          subTypeDetailFunc: subTypeRequest.subTypeRowInfoDetail({
            id: item.id,
          }),
        };
      });

      // 根据二级列表里的 ID 获取到产品信息，并改造二级分类的数据列表里的详情
      let funcList = subTypeList.map((item) => item.subTypeDetailFunc);
      let resSubDetailList = await Promise.all(funcList);

      let subDetailList = resSubDetailList
        .map((item) => item.result)
        .map((item, index) => {
          return {
            label: `更新时间:${this.formatUpdateTime(item)}`,
            value: this.formatUpdateTime(item),
            id: item.id,
          };
        });
      this.pushFatherType(typeList, subDetailList, subTypeList);
    },

    // 将下一级的数据添加到父级的 children 里
    pushFatherType(typeList, subDetailList, subTypeList) {
      // 将二级分类里的数据按照 id 添加到一级分类里的 children 里
      typeList.forEach((item) => {
        let childrenList = subTypeList.filter(
          (subItem) => item.id == subItem.parentId
        );
        item.children = childrenList.length != 0 ? childrenList : "";
      });

      // // 将二级分类的详情的数据 按照 ID 添加到二级分类的 children 里
      // subTypeList.forEach((item) => {
      //   let childrenList = subDetailList.filter((subItemDetail) => {
      //     return item.id == subItemDetail.id;
      //   });

      //   item.children = childrenList.length != 0 ? childrenList : "";
      // });

      this.options = typeList;
    },

    // 获取选择结果
    handleChange(value) {
      this.$emit("selectCard", value.join("/"));
    },
  },
};
</script>

<style>
</style>