<template>
  <v-container>
    <h1>Ant Colony Optimization</h1>

    <ant-colony-optimization-sketch class="mt-4" />
  </v-container>
</template>

<script>
import AntColonyOptimizationSketch from '@/components/sketches/AntColonyOptimizationSketch.vue';

export default {
  components: { AntColonyOptimizationSketch },
};
</script>

<style lang="scss" scoped></style>
