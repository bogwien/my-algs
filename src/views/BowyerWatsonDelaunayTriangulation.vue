<template>
  <v-container>
    <h1>Bowyer-Watson Delaunay Triangulation</h1>

    <bowyer-watson-delaunay-triangulation-sketch class="mt-4" />
  </v-container>
</template>

<script>
import BowyerWatsonDelaunayTriangulationSketch from '@/components/sketches/BowyerWatsonDelaunayTriangulationSketch.vue';

export default {
  components: { BowyerWatsonDelaunayTriangulationSketch },
};
</script>

<style lang="scss" scoped></style>
