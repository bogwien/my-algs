import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SuperTriangle from '@/views/SuperTriangle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/super-triangle',
    name: 'SuperTriangle',
    component: SuperTriangle,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
