<template>
  <button @click="callOutputJSON" :class="buttonClass" >{{ label }}</button>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '../pinia';

export default defineComponent({
  name: 'ExportJson',
  props: {
    label: {
      type: String,
      default: 'Export JSON',
    },
    buttonClass: {
      type: String,
      default: 'btn',
    }
  },
  setup() {
    const store = useMainStore();

    const callOutputJSON = () => {
      const newjson = store.exportWorkflow(store.graph);
      downloadJSON(newjson);
    };

    const downloadJSON = (jsonData) => {
      const blob = new Blob([
          JSON.stringify(jsonData, null, 2)
        ],
        { type: 'application/json' }
      );

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `housecat-${Date.now()}.json`;
        link.click();

        store.loadWorkflow(jsonData); // test
    }

    return {
      callOutputJSON,
    };
  },
});

</script>

<style scoped>
.btn {
  position: absolute;
  background-color: rgb(10, 30, 255);
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(100, 30, 255);
}
</style>