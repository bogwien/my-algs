<template>
  <v-navigation-drawer v-model="drawer" absolute temporary>
    <v-list nav dense>
      <v-subheader>Site Navigation</v-subheader>

      <v-list-item-group>
        <v-list-item :to="{name: 'Home'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
      </v-list-item-group>

      <v-list-item-group>
        <v-list-item :to="{name: 'SuperTriangle'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-triangle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Super Triangle</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'CircumscribedCircle'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-circle-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Circumscribed Circle</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'DelaunayTriangulation'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-vector-triangle</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Delaunay Triangulation</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{name: 'AntColonyOptimization'}" exact>
          <v-list-item-icon>
            <v-icon>mdi-recycle-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Ant Colony Optimization</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, required: true },
  },
  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
