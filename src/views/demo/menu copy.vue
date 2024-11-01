<template>
  <div>
    <el-aside :width="isCollapse ? '50px' : '200px'">
      <div class="nav" ref="navRef">
        <div
          class="nav-item"
          :class="[activeMenu === 'all' ? 'active' : '']"
          @mouseenter="mouseenter({ isAll: true }, 'all')"
          @mouseleave="mouseleave({ isAll: true }, 'all')"
          @click="navClick({ isAll: true }, 'all')"
        >
          <div>
            <i class="el-icon-menu menu-icon"></i>
            <span v-show="!isCollapse">全部</span>
          </div>
          <i class="el-icon-arrow-right" v-show="!isCollapse"></i>
        </div>
        <div
          class="nav-item"
          :class="[activeMenu === index ? 'active' : '']"
          v-for="(item, index) in menu"
          :key="index"
          @mouseenter="mouseenter(item, index)"
          @mouseleave="mouseleave(item, index)"
          @click="navClick(item, index)"
        >
          <div>
            <i class="el-icon-menu menu-icon"></i>
            <span v-show="!isCollapse">{{ item.title }}</span>
          </div>
          <i class="el-icon-arrow-right" v-if="item.children && !isCollapse"></i>
        </div>
      </div>
    </el-aside>

    <transition name="dropdown">
      <div v-show="isShow" class="dropdown" :style="{ left: isCollapse ? '270px' : '420px' }" @mouseleave="hideDropDown">
        <div class="dropdown-content">
          <div class="dropdown-header">{{ title }}</div>
          <i class="el-icon-close dropdown-close" @click="hideDropDown($event, true)"></i>

          <div class="dropdown-search" v-if="isAll">
            <el-input placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="value" @input="valChange"> </el-input>
          </div>
          <div class="dropdown-menu">
            <template v-if="isAll">
              <div class="menuItem" v-for="(item, index) in analog" :key="'a' + index">
                <h2 class="menuItem_title">{{ item.title }}</h2>
                <menu-item :itemArr="item.children"></menu-item>
              </div>
            </template>

            <template v-else>
              <menu-item :itemArr="analog"></menu-item>
            </template>
          </div>
        </div>
      </div>
    </transition>

    <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']" class="collapse_class" @click="isCollapse = !isCollapse"></i>
  </div>
</template>

<script>
import menuItem from "@/components/menuItem.vue";
import debounce from "@/utils/debounce";

export default {
  components: { menuItem },
  data() {
    return {
      isShow: false,
      menu: [
        {
          title: "一级菜单1",
          children: [
            { title: "二级菜单1-1", children: [{ title: "三级菜单1-1-1" }, { title: "三级菜单1-1-2" }, { title: "三级菜单1-1-3" }] },
            {
              title: "二级菜单1-2",
              children: [{ title: "三级菜单1-2-1" }, { title: "三级菜单1-2-2" }, { title: "三级菜单1-2-3" }, { title: "三级菜单1-2-4" }],
            },
          ],
        },
        {
          title: "一级菜单2",
          children: [
            { title: "二级菜单2-1", children: [{ title: "三级菜单2-1-1" }, { title: "三级菜单2-1-2" }, { title: "三级菜单2-1-3" }] },
            {
              title: "二级菜单2-2",
              children: [{ title: "三级菜单2-2-1" }, { title: "三级菜单2-2-2" }, { title: "三级菜单2-2-3" }, { title: "三级菜单2-2-4" }],
            },
          ],
        },
        {
          title: "一级菜单3",
          children: [
            { title: "二级菜单3-1", children: [{ title: "三级菜单3-1-1" }, { title: "三级菜单3-1-2" }, { title: "三级菜单3-1-3" }] },
            {
              title: "二级菜单3-2",
              children: [{ title: "三级菜单3-2-1" }, { title: "三级菜单3-2-2" }, { title: "三级菜单3-2-3" }, { title: "三级菜单3-2-4" }],
            },
            {
              title: "二级菜单3-3",
              children: [{ title: "三级菜单3-3-1" }, { title: "三级菜单3-3-2" }, { title: "三级菜单3-3-3" }, { title: "三级菜单3-3-4" }],
            },
          ],
        },
        {
          title: "一级菜单4",
          children: [
            { title: "二级菜单4-1", children: [{ title: "三级菜单4-1-1" }, { title: "三级菜单4-1-2" }, { title: "三级菜单4-1-3" }] },
          ],
        },
        {
          title: "一级菜单5",
        },
      ],
      analog: [],
      activeMenu: "",
      isAll: false,
      value: "",
      title: "",
      isCollapse: false,
      openSidebarTimer: null,
    };
  },
  methods: {
    valChange(e) {
      debounce(() => {
        const arr = this.searchTree(e, this.menu);
        this.analog = arr;
      });
    },
    navClick(item, index) {
      if (this.isCollapse) return;
      this.showDropDown(item, index);
    },
    mouseenter(item, index) {
      if (!this.isCollapse) return;
      if (!this.isShow) {
        if (this.openSidebarTimer) {
          clearTimeout(this.openSidebarTimer);
          this.openSidebarTimer = null;
        }
        this.openSidebarTimer = setTimeout(() => {
          this.showDropDown(item, index);
        }, 500);
      } else {
        this.showDropDown(item, index);
      }
    },
    showDropDown(item, index) {
      this.activeMenu = index;
      this.isAll = item.isAll || false;
      if (this.isShow && !item.isAll && !item.children) return (this.isShow = false);
      if (!this.isShow && (item.children || item.isAll)) this.isShow = true;
      this.analog = item.isAll ? this.menu : item.children;
      this.title = item.isAll ? "全部" : item.title;
    },
    mouseleave(item, index) {
      if (!this.isCollapse) return;
      if (this.openSidebarTimer) {
        clearTimeout(this.openSidebarTimer);
        this.openSidebarTimer = null;
        this.activeMenu = "";
      }
      this.activeMenu = this.isShow ? (item.isAll ? "all" : !item.children ? "" : index) : "";
    },
    hideDropDown(e, isClose) {
      if ((this.isCollapse && this.isShow && e.pageX > 400) || isClose) {
        this.isShow = false;
        this.activeMenu = "";
      }
    },
    searchTree(value, arr) {
      let newarr = [];
      arr.forEach((element) => {
        if (element.title.indexOf(value) > -1) {
          newarr.push(element);
        } else {
          if (element.children && element.children.length > 0) {
            let redata = this.searchTree(value, element.children);
            if (redata && redata.length > 0) {
              let obj = {
                ...element,
                children: redata,
              };
              newarr.push(obj);
            }
          }
        }
      });
      return newarr;
    },
  },
};
</script>

<style lang="scss" scoped>
// 下拉菜单收缩展开
@keyframes expand-contract {
  0% {
    opacity: 0;
    width: 0;
  }
  100% {
    opacity: 1;
    width: 400px;
  }
}
.dropdown-enter-active {
  animation: expand-contract 0.4s;
}
.dropdown-leave-active {
  animation: expand-contract 0.4s reverse;
}

// 导航栏
.nav {
  position: relative;
  width: 100%;
  line-height: 60px;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
  height: 100vh;
  font-size: 14px;
  .menu-icon {
    margin-right: 10px;
  }
  .nav-item {
    position: relative;
    margin: 0 20px;
    cursor: pointer;
    transition: all 0.3s linear;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -18px;
      height: 100%;
      width: 2px;
      background-color: #409eff;
      transform: scale(0);
      transition: all 0.4s linear;
    }
    &:hover {
      color: #409eff;
      &::before {
        transform: scale(1);
      }
    }
  }
  .active {
    color: #409eff;
    &::before {
      transform: scale(1);
    }
  }
}
.dropdown {
  position: fixed;
  width: 400px;
  height: 100vh;
  left: 200px;
  top: 0;
  overflow: hidden;
  background-color: #f8f8f8;
  box-shadow: 10px 0 17px -5px rgba(0, 0, 0, 0.1);
  &-header {
    padding: 20px;
  }
  &-content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &-close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .dropdown-search {
    padding: 10px 30px 10px 20px;
    /deep/.el-input__inner {
      border: none;
      border-bottom: 1px solid #dcdfe6;
      background: transparent;
      border-radius: 0;
      &::placeholder {
        color: #666;
      }
    }
    /deep/.el-input__icon {
      color: #333;
    }
  }

  .dropdown-menu {
    padding: 10px 15px 15px;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    flex: 1;
    .menuItem {
      width: 100%;
      white-space: nowrap;
      font-size: 14px;
      color: #000;
      transition: all 0.3s;
      &_title {
        position: relative;
        font-weight: bolder;
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 0 0 18px 0;
        gap: 10px;
        &::after {
          content: "";
          border-top: 1px solid #dcdfe6;
          flex: 1;
        }
      }
    }
  }
}
.collapse_class {
  position: fixed;
  top: 20px;
  right: 20px;
  font-size: 20px;
}
</style>
