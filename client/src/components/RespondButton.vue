<template>
  <button class="button" @click="open">ADD YOURS</button>
</template>

<script setup>
const emit = defineEmits(["open"]);

function open() {
  emit("open");
}
</script>

<style scoped>
.button {
  position: fixed;
  padding: 10px;
  bottom: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  z-index: 3;
  background: rgb(218, 175, 249);
}
</style>
