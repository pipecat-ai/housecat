<template>
  <button :class="buttonClass">{{ label }}</button>
</template>

<script>
import { defineComponent } from 'vue';
import { useMainStore } from '../pinia';

export default defineComponent({
  name: 'Button',
  props: {
    label: {
      type: String,
      default: 'Export JSON',
    },
    buttonClass: {
      type: String,
      default: 'btn',
    },
  },
  setup() {
    const store = useMainStore();

    const callOutputJSON = () => {
      const newjson = store.exportWorkflow(store.graph);
      downloadJSON(newjson);
    };

    const downloadJSON = (jsonData) => {
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
        type: 'application/json',
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `housecat-${Date.now()}.json`;
      link.click();

      store.loadWorkflow(jsonData); // test
    };

    const callInputJSON = async () => {
      try {
        const fileInputEl = document.getElementById('fileinput');
        fileInputEl.click();

        // wait while user chooses file;
        while (!fileInputEl.files.length) {
          await new Promise((r) => setTimeout(r, 300));
        }
        const file = fileInputEl.files[0];

        if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
            const fileContent = e.target.result;
            // console.log(fileContent);
            store.loadWorkflow(JSON.parse(fileContent));
          };

          // Read the file as text
          reader.readAsText(file);
        } else {
          console.error('No file selected');
        }
      } catch (err) {
        console.error('Import JSON error:', err);
      }
    };

    return {
      callInputJSON,
      callOutputJSON,
    };
  },
});
</script>

<style scoped>
.btn {
  position: relative;
  z-index: 10;
  background-color: rgb(10, 30, 255);
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

.btn:hover {
  background-color: rgb(100, 30, 255);
}
</style>
