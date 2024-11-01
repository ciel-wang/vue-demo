import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import "xe-utils";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";
import "../public/iconfont/iconfont.css";
import "../public/iconfont/iconfont.js";
import "./styles/common.scss";
import "./styles/reset.css";
import VueEasyTree from "@wchbrad/vue-easy-tree";
import "@wchbrad/vue-easy-tree/src/assets/index.scss";
Vue.use(VueEasyTree);

Vue.use(ElementUI);

Vue.use(VXETable);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
