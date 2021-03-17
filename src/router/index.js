import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SuperTriangle from '@/views/SuperTriangle.vue';
import CircumscribedCircle from '@/views/CircumscribedCircle.vue';
import DelaunayTriangulation from '@/views/DelaunayTriangulation.vue';
import AntColonyOptimization from '@/views/AntColonyOptimization.vue';

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
  {
    path: '/circumscribed-circle',
    name: 'CircumscribedCircle',
    component: CircumscribedCircle,
  },
  {
    path: '/delaunay-triangulation',
    name: 'DelaunayTriangulation',
    component: DelaunayTriangulation,
  },
  {
    path: '/aco',
    name: 'AntColonyOptimization',
    component: AntColonyOptimization,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
