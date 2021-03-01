<template>
  <v-container>
    <h1>Super Triangle</h1>

    <super-triangle-sketch class="mt-4"></super-triangle-sketch>
  </v-container>
</template>

<script>
import SuperTriangleSketch from '@/components/sketches/SuperTriangleSketch.vue';

export default {
  components: { SuperTriangleSketch },
};
</script>

<style lang="scss" scoped></style>
