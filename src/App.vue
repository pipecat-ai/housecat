<!-- src/App.vue -->
<template>
  <div id="app">
    <GraphEditor ref="graphEditor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GraphEditor from './components/GraphEditor.vue';

export default defineComponent({
  name: 'App',
  components: {
    GraphEditor
  },
  setup() {
    const graphEditor = ref<InstanceType<typeof GraphEditor> | null>(null);

    return {
      graphEditor
    };
  }
});
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
