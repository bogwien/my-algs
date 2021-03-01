<template>
  <v-app-bar absolute app elevate-on-scroll>
    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-title>My Algorithms</v-toolbar-title>
  </v-app-bar>
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
