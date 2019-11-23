import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import router from './router/router'
import './plugins/components'

Vue.config.productionTip = false

Vue.use(VueRouter);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
