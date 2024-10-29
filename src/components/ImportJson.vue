<template>
  <input type="file" :id="inputId" :class="inputClass" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImportJSON',
  props: {
    label: {
      type: String,
      default: 'Import JSON',
    },
    inputId: {
      type: String,
      default: 'fileinput',
    },
    inputClass: {
      type: String,
      default: 'inp',
    },
  },
});
</script>

<style scoped>
.inp {
  display: none;
}
</style>
