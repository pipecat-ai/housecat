<!-- src/App.vue -->
<template>
  <div id="app">
    <GraphEditor />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GraphEditor from './components/GraphEditor.vue';

export default defineComponent({
  name: 'App',
  components: {
    GraphEditor
  }
});
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>