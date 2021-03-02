<template>
  <v-container>
    <h1>Bowyer-Watson Delaunay Triangulation</h1>

    <delaunay-triangulation-sketch class="mt-4" />
  </v-container>
</template>

<script>
import DelaunayTriangulationSketch from '@/components/sketches/DelaunayTriangulationSketch.vue';

export default {
  components: { DelaunayTriangulationSketch },
};
</script>

<style lang="scss" scoped></style>
