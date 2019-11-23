import VueRouter from 'vue-router';
import routes from './paths';

// configure router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

export default router;
