<template>
  <v-app>
    <site-header v-model="drawer"></site-header>

    <site-nav v-model="drawer"></site-nav>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SiteHeader from '@/components/site/SiteHeader.vue';
import SiteNav from '@/components/site/SiteNav.vue';

export default {
  name: 'App',
  components: { SiteNav, SiteHeader },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
