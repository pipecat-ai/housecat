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
    const store = useMainStore(); // Access the store
    console.log("__button setup___store.graph ", store.graph)

    // Function to call the sibling function in the store
    const callOutputJSON = () => {
      console.log("______________callOutputJSON store.graph ", store.graph)
      // console.log("_____store() ", store())
      const newjson = store.exportWorkflow(store.graph);
      downloadJSON(newjson);
      console.log("_____newjson ", newjson)
    };

    const downloadJSON = (jsonData) => {
      const blob = new Blob([
          JSON.stringify(jsonData, null, 2)
        ], 
        { type: 'application/json' }
      );

        // Step 3: Create a link element and simulate a click to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `housecat-${Date.now()}.json`;

        // // Append the link to the document body
        // document.body.appendChild(link);

        // Simulate the click event to trigger the download
        link.click();
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