<template>
  <div style="width: 100%">
    <ol v-for="(item, index) in itemArr" :key="index" class="menu_item">
      <li class="menu_item_title">{{ item.title }}</li>
      <ol class="menu_item_chid">
        <li v-for="(citem, i) in item.children" :key="i" class="menu_item_chid_li">
          <i class="el-icon-menu menu-icon"></i>
          <span>{{ citem.title }}</span>
          <i class="el-icon-star-off star"></i>
        </li>
      </ol>
    </ol>
  </div>
</template>

<script>
export default {
  props: {
    itemArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu_item {
  white-space: nowrap;
  color: #000;
  transition: all 0.3s;
  margin-bottom: 30px;
  padding-left: 10px;
  width: 100%;
  font-size: 12px;
  &_title {
    font-weight: bolder;
    margin-bottom: 16px;
  }
  &_chid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 24px;
    &_li {
      color: #333;
      cursor: pointer;
      position: relative;
      height: 36px;
      line-height: 36px;
      padding: 0;
      border-radius: 4px;
      .menu-icon {
        margin-right: 4px;
      }

      &:hover {
        color: #409eff;
        background-color: #ecf5ff;
        .star {
          display: block;
        }
      }
      .star {
        display: none;
        color: #f00;
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
