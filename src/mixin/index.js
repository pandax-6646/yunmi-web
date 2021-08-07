export const toast = {
  methods: {
    /**     消息提示
     * 
     * @type    必须  弹窗类型  success  warning  info  error
     * @message 非必须    弹窗显示的文本
     */
    showMsg(type, message) {
      this.$message({
        type,
        message,
      });
    },


    /**     确认弹出窗
     * 
     * @resolve             必须     选择确认要执行的函数
     * @reject              非必须   选择取消要执行函数
     * @title               非必须   弹出窗的标题
     * @text                非必须   弹出窗提示的信息
     * @confirmButtonText   非必须   确认按钮的文本
     * @cancelButtonText    非必须   取消按钮的文本
     * @type                非必须   弹出窗的类型
     * 
     * */
    showConfirmBox(resolve, reject = () => this.showMsg('info', '已取消删除操作'), text = "此操作将永久删除该文件, 是否继续?", confirmButtonText = "确定", title = "提示", cancelButtonText = "取消", type = "warning") {
      this.$confirm(text, title, {
        confirmButtonText,
        cancelButtonText,
        type,
      }).then(resolve).catch(reject);
    },
  }
}



// 初始化时间
export const initTime = {
  methods: {
    // 格式化创建时间
    formatCreateTime(item) {
      let time = new Date(+item.createTime);
      let timeObj = {
        Y: time.getFullYear(),
        M: time.getMonth() + 1,
        D: time.getDate(),
        h: time.getHours(),
        m: time.getMinutes(),
        s: time.getSeconds(),
      };
      for (let prop in timeObj) {
        let num = timeObj[prop];
        timeObj[prop] = num < 10 ? "0" + num : num;
      }

      return `${timeObj.Y}-${timeObj.M}-${timeObj.D} ${timeObj.h}:${timeObj.m}:${timeObj.s}`;
    },

    // 格式化更新时间
    formatUpdateTime(item) {
      let time = new Date(+item.updateTime);
      let timeObj = {
        Y: time.getFullYear(),
        M: time.getMonth() + 1,
        D: time.getDate(),
        h: time.getHours(),
        m: time.getMinutes(),
        s: time.getSeconds(),
      };
      for (let prop in timeObj) {
        let num = timeObj[prop];
        timeObj[prop] = num < 10 ? "0" + num : num;
      }

      return `${timeObj.Y}-${timeObj.M}-${timeObj.D} ${timeObj.h}:${timeObj.m}:${timeObj.s}`;
    },
  },


}

export const initPrice = {
  methods: {
    // 初始化价格
    formatPrice(item) {
      return (item.price / 10).toFixed(1);
    },
  }
}