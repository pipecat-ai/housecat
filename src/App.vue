<!-- src/App.vue -->
<template>
  <div id="app">
    <Button ref="exportJson" @click="exportJSONFunc" />
    <Button ref="exportJson" @click="importJSONFunc" label="Import JSON" />
    <ImportJson ref="importJson" />
    <GraphEditor ref="graphEditor" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GraphEditor from './components/GraphEditor.vue';
import Button from './components/Button.vue';
import ImportJson from './components/ImportJson.vue';

export default defineComponent({
  name: 'App',
  components: {
    Button,
    ImportJson,
    GraphEditor,
  },
  setup() {
    const graphEditor = ref<InstanceType<typeof GraphEditor> | null>(null);
    const exportJson = ref<InstanceType<typeof Button> | null>(null);
    const importJson = ref<InstanceType<typeof ImportJson> | null>(null);

    return {
      graphEditor,
      exportJson,
      importJson,
    };
  },
  methods: {
    exportJSONFunc() {
      const { callOutputJSON } = Button.setup();
      callOutputJSON();
    },
    importJSONFunc() {
      const { callInputJSON } = Button.setup();
      callInputJSON();
    },
  },
});
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
