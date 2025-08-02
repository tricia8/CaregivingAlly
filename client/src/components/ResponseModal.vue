<template>
  <div class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <textarea
        v-model="response"
        type="text"
        placeholder="What would you like to share?"
        class="input"
      />
      <div class="button-wrapper">
        <button class="button" @click="share">Share!</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { submitResponse } from '@/api/firestore';
import { ref } from 'vue';

const response = ref('');

const emit = defineEmits(["close"]);

function close() {
  emit("close");
}

function share() {
    submitResponse(response.value);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgb(218, 175, 249);
  padding-block: 10px;
  padding-inline: 12px;
  border-radius: 12px;
  width: 50%;
  height: auto;
}

.input {
  width: 100%;
  height: 120px; 
  padding: 10px;
  border-radius: 12px;
  font-size: medium;
  resize: none;
}

.button-wrapper {
    display: flex;
    flex-direction: row-reverse;
}

.button {
    padding-inline: 8px;
    padding-block: 10px;
    border-radius: 12px;
    font-size: small;
    cursor: pointer;
}
</style>
