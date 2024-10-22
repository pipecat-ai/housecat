<!-- src/App.vue -->
<template>
  <div id="app">
    <ExportJson ref="exportJson" @click="exportWorkflow"/>
    <GraphEditor ref="graphEditor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GraphEditor from './components/GraphEditor.vue';
import ExportJson from './components/ExportJson.vue';

export default defineComponent({
  name: 'App',
  components: {
    ExportJson,
    GraphEditor
  },
  setup() {
    const graphEditor = ref<InstanceType<typeof GraphEditor> | null>(null);
    const exportJson = ref<InstanceType<typeof ExportJson> | null>(null);

    return {
      graphEditor,
      exportJson
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
