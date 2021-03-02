import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SuperTriangle from '@/views/SuperTriangle.vue';
import CircumscribedCircle from '@/views/CircumscribedCircle.vue';
import BowyerWatsonDelaunayTriangulation from '@/views/BowyerWatsonDelaunayTriangulation.vue';

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
    path: '/bowyer-watson-delaunay-triangulation',
    name: 'BowyerWatsonDelaunayTriangulation',
    component: BowyerWatsonDelaunayTriangulation,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
