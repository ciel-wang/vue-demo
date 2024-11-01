<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header>Header</el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="activeMenu" unique-opened class="el-menu-vertical-demo">
            <template v-for="(item, index) in routesArr">
              <el-menu-item :index="item.path" v-if="!item.chidren" :key="index" @click="open(item)">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>

              <el-submenu :index="item.path" v-if="item.chidren" :key="index">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ item.title }}</span>
                </template>
                <template v-for="(obj, i) in item.chidren">
                  <el-menu-item :index="obj.path" :key="i" @click="open(obj)">{{ obj.title }}</el-menu-item>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-aside>

        <el-main>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import routesArr from "./router/routes.json";

export default {
  data() {
    return {
      routesArr,
    };
  },
  methods: {
    open(item) {
      if (this.$route.path === item.path) return;
      this.$router.push({
        path: item.path,
        query: item.query,
      });
    },
  },
  computed: {
    activeMenu() {
      return this.$route.path;
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
