<template>
  <div class="floating-container">
    <img
      v-for="(item, index) in floatingItems"
      :key="index"
      src="/parachute-heart.gif"
      alt="floating-heart-parachutes"
      class="floating-gif"
      :style="{
        left: item.left + '%',
        width: item.size + 'px',
        animationDelay: item.delay + 's',
        animationDuration: item.duration + 's',
      }"
    >
  </div>
</template>

<script setup>
import { ref } from "vue";

const NUM_FLOATING_ITEMS = 8;
const spacing = 100 / NUM_FLOATING_ITEMS;
const floatingItems = ref(
  Array.from({ length: NUM_FLOATING_ITEMS }, (_, i) => ({
    left: spacing * i + Math.random() * (spacing / 2),
    size: 50 + Math.random() * 60,
    delay: Math.random() * 10,
    duration: 12 + Math.random() * 5,
  }))
);
</script>

<style scoped>
.floating-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 0;
  top: 0;
  left: 0;
  pointer-events: none;
}

@keyframes floatDown {
  0% {
    top: -120px;
  }
  100% {
    top: 100vh;
  }
}

.floating-gif {
  position: absolute;
  top: -100px;
  animation-name: floatDown;
  animation-duration: 12s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}
</style>


