import Vue from 'vue';
import App from './App.vue';
import router from './renderer/router';
import store from './renderer/store';
import * as services from './services/renderer';

Vue.config.productionTip = false;
Vue.prototype.$services = services;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
