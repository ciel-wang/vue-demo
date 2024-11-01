<template>
  <div class="watermark_class" :style="{ backgroundImage }">
    <img :src="img" alt="" srcset="" />
  </div>
</template>

<script>
import { CanvasWay, SvgWay } from "@/utils/watermark.js";
export default {
  data() {
    return {
      img: "",
      backgroundImage: "",
    };
  },
  mounted() {
    let data = new CanvasWay({
      content: "私人订制\n一切都会好的",
      xOffset: 12,
      yOffset: 60,
      width: 300,
      height: 300,
      fontColor: "rgba(0,0,0,.4)",
      fontSize: 16,
      rotate: "-15",
    });
    this.backgroundImage = `url(${data.render()})`;
  },
};
</script>
<style lang="scss">
.watermark_class {
  position: fixed;
  inset: 0;
  background-repeat: repeat;
}
</style>
