<template>
  <p>{{ num }}</p>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      num: 0,
    };
  },

  props: {
    maxNum: {
      type: Number,
      require: true,
    },
  },

  created() {
    let stepNum = Math.ceil(this.maxNum / 30);
    this.timer = setInterval(() => {
      if (this.num <= this.maxNum) {
        this.num += stepNum;
      } else {
        this.num = this.maxNum;
        clearInterval(this.timer);
      }
    }, 20);
  },
};
</script>

