import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/styles/style.css";
import "@/styles/transition.css";
Vue.config.productionTip = false;
import AOS from "aos";
import "aos/dist/aos.css";
Vue.config.productionTip = false;

new Vue({
  created() {
    AOS.init({});
  },
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
