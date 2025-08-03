<template>
  <div class="wall-container">
    <div class="prompt-container">
      <h2>{{ prompt }}</h2>
      <p><i>Feel free to respond to this, or write your own thoughts.</i></p>
    </div>
    <div
      v-for="(column, index) in columns"
      :key="index"
      class="story-column"
      :class="{ reverse: index % 2 !== 0 }"
    >
      <div
        v-for="response in column"
        :key="response.id"
        class="story-card"
        @click="openModal(response)"
      >
        <div class="limit-lines">
          {{ response.text }}
        </div>
      </div>
    </div>

    <RespondButton @open="showResponseModal = true" />

    <ResponseModal
      v-if="showResponseModal"
      @close="showResponseModal = false"
    />

    <div v-if="showExpanded" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <p>{{ selectedResponse.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import RespondButton from "./RespondButton.vue";
import ResponseModal from "./ResponseModal.vue";
import { ref, onMounted } from "vue";
import { generatePrompt } from "../api/gemini";
import { getResponses } from "../api/firestore";

const prompt = ref("");
const responses = ref([]);
const numCols = 4;
const columns = ref(Array.from({ length: numCols }, () => []));
const showResponseModal = ref(false);
const showExpanded = ref(false);
const selectedResponse = ref(null);

async function fetchPrompt() {
  try {
    const data = await generatePrompt();
    prompt.value = data;
  } catch (error) {
    prompt.value = "Share some challenges and rewards of caregiving!";
  }
}

async function fetchResponses() {
  try {
    const data = await getResponses();
    responses.value = data;

    responses.value.forEach((response, i) => {
      columns.value[i % numCols].push(response);
    });
  } catch (error) {
    void error;
  }
}

onMounted(() => {
  fetchPrompt();
  fetchResponses();
});

const openModal = (response) => {
  selectedResponse.value = response;
  showExpanded.value = true;
};
const closeModal = () => {
  showExpanded.value = false;
  selectedResponse.value = null;
};
</script>

<style scoped>
.wall-container {
  background: #c0e6da;
  display: flex;
  gap: 16px;
  height: 100%;
  overflow: hidden;
  justify-content: center;
}

.prompt-container {
  position: absolute;
  background: rgb(218, 175, 249);
  border-radius: 15px;
  z-index: 1;
  text-align: center;
  margin: 6px;
}

.story-column {
  flex: 1;
  overflow: hidden;
  animation: scrollVertical 20s linear infinite;
}

.story-column.reverse {
  animation-direction: reverse;
}

.story-card {
  background: rgb(255, 254, 217);
  margin: 14px;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

@keyframes scrollVertical {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}

.limit-lines {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  max-width: 100%;
  overflow: hidden;
  overflow-wrap: break-word;
}

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
  background: rgb(255, 254, 217);
  padding-inline: 10px;
  padding-block: 16px;
  border-radius: 12px;
  width: 50%;
  max-height: 80vh;
  text-align: left;
  overflow-wrap: break-word;
  white-space: normal;
  overflow-y: auto;
}

.modal-content > * {
  margin-bottom: 0;
}

h2 {
  padding: 0px 0px;
  margin: 12px 16px;
  margin-bottom: 6px;
}

p {
  padding: 0px 0px;
  margin: 12px 16px;
  margin-top: 0px;
}
</style>
