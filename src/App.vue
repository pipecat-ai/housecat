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
    const graphEditor = ref(null);

    // Example of how to use the exposed methods
    const addCustomNode = () => {
      graphEditor.value?.addNode('basic/input', { pos: [200, 300], properties: { value: 10 } });
    };

    const removeNodeById = (id: number) => {
      graphEditor.value?.removeNode(id);
    };

    return {
      graphEditor,
      addCustomNode,
      removeNodeById
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
