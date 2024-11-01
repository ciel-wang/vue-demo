<template>
  <div class="progress">
    <el-progress
      :text-inside="true"
      :percentage="percentage"
      :class="progressClass"
      v-bind="$attrs"
      v-on="$listeners"
      :key="reRenderNum"
      style="width: 300px"
    ></el-progress>
    <span class="tip">
      搜索中
      <span class="dot-ani"></span>
    </span>
  </div>
</template>
<script>
export default {
  name: "progress-bar",
  props: {
    progressClass: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      status: 0,
      speed: 100,
      minimum: 0.08,
      reRenderNum: 1, // 避免 status由 1-> 0 时，导致进度条倒退。这里直接重新渲染
      resetStatus: true, // 避免 status 赋值为 0 时，直接改变进度条样式，需等待再次start进度条才会置空
    };
  },
  mounted() {
    this.start();
    setTimeout(() => {
      this.done();
    }, 60 * 1000);
  },
  watch: {
    percentage(n) {
      this.$refs.iconRef && (this.$refs.iconRef.style.left = `${n}%`);
    },
  },
  computed: {
    percentage() {
      return parseInt(this.status * 100);
    },
  },
  methods: {
    // 外部调用使用,当无需使用假的进度条，直接设置 百分比
    setStatus(n) {
      this.status = n;
    },
    // 外部调用使用
    start() {
      if (this.resetStatus) {
        this.status = 0;
        this.resetStatus = false;
        this.reRenderNum++;
        this.progress(0);
      }
      const that = this;
      const work = function () {
        setTimeout(function () {
          if (that.resetStatus) return;
          that.mockIncrease();
          work();
        }, that.speed);
      };

      work();
    },
    // 外部调用使用
    done(force) {
      if (force || this.status) {
        this.mockIncrease(0.8 + 0.4 * Math.random());
        this.progress(1);
      }
    },
    // 向外部发送假的进度
    progress(n) {
      this.status = this.clamp(n, this.minimum, 1);
      // 当 status 为 1 时，进度条停止
      if (this.status === 1) {
        this.resetStatus = true;
      }
      this.$emit("progress", n);
    },
    mockIncrease(amount) {
      let n = this.status;
      // 如果直接调用 mockIncrease，那么会初始化 start
      if (!n) {
        this.start();
      } else if (n > 1) {
        return;
      } else {
        if (typeof amount !== "number") {
          if (n >= 0 && n < 0.2) {
            amount = 0.1;
          } else if (n >= 0.2 && n < 0.5) {
            amount = 0.04;
          } else if (n >= 0.5 && n < 0.8) {
            amount = 0.02;
          } else if (n >= 0.8 && n < 0.99) {
            amount = 0.005;
          } else {
            amount = 0;
          }
        }
      }
      n = this.clamp(n + amount, 0, 0.994);
      this.progress(n);
    },
    // 保持进度 n 处于指定的状态（不会过小，也不会超出一定范围）
    clamp(n, min, max) {
      if (n < min) return min;
      if (n > max) return max;
      return n;
    },
  },
};
</script>
<style lang="scss" scoped>
.progress {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #202020bb;
  z-index: 10;
  .tip {
    margin-top: 4px;
    color: #fff;
    font-size: 14px;
  }
  .dot-ani {
    display: inline-block;
    height: 12px;
    line-height: 12px;
    overflow: hidden;
  }
  .dot-ani::after {
    display: inline-table;
    white-space: pre;
    content: "\A.\A..\A...";
    animation: spin 2s steps(4) infinite;
  }
  @keyframes spin {
    to {
      -webkit-transform: translateY(-48px);
      transform: translateY(-48px);
    }
  }

  /deep/.el-progress-bar__outer {
    border: 1px solid;
    overflow: unset;
  }
  /deep/.el-progress-bar__inner {
    background-image: repeating-linear-gradient(-45deg, #4890ff 0%, #4890ff 1%, #7bbcff 1%, #7bbcff 2%);

    background-position: -2% 0;
    background-size: 150%;
    animation: slider 5s linear infinite;
  }
  // 这里利用了内置的进度文字滑动的效果
  /deep/.el-progress-bar__innerText {
    display: block;
    width: 32px;
    height: 64px !important;
    float: right;
    background-image: url("../../assets/logo.png"); // 这个是对应的上面奔跑小人icon
    background-size: 32px 32px;
    background-repeat: no-repeat;
    background-position: 0 24px;
    margin: -14px -10px;
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 18px;
  }
  @keyframes slider {
    100% {
      background-position: -100% 0;
    }
  }
}
</style>
