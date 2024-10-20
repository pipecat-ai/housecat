<template>
  <button @click="handleClick" :class="buttonClass">{{ label }}</button>
</template>

<script>
export default {
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
  }
}
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