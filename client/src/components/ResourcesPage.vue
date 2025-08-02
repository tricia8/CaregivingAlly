<template>
  <div class="resources-container">
    <h1>Resources</h1>
    <div class="infographics-container">
      <img
        src="/tips1.png"
        alt="Tips for Caregivers' Well-being"
        class="infographic"
      />
      <img
        src="/tips2.png"
        alt="Simple Hacks for Daily Care"
        class="infographic"
      />
      <img
        src="/tips3.png"
        alt="Communication & Support for Caregivers"
        class="infographic"
      />
      <img
        src="/tips4.png"
        alt="Dementia Care: What Caregivers Should Know"
        class="infographic"
      />
    </div>

    <div class="search-container">
      <input
        v-model="query"
        @keyup.enter="search"
        placeholder="Search caregiving topics..."
      />
      <button @click="search">Search</button>
    </div>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="loading">Loading...</div>

    <div class="results-grid" v-else>
      <div v-for="video in results" :key="video.id.videoId" class="video-card">
        <iframe
          width="100%"
          height="200"
          :src="`https://www.youtube.com/embed/${video.id.videoId}`"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <p class="title">{{ video.snippet.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getSearchResults } from "@/api/youtube";
import { ref } from "vue";

const query = ref("");
const results = ref([]);
const loading = ref(false);
const error = ref("");

async function search() {
  loading.value = true;
  try {
    const videos = await getSearchResults(query.value);
    if (typeof videos === "string") {
      error.value = videos;
    } else {
      results.value = videos;
    }
  } catch (err) {
    error.value = "An error occurred.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.resources-container {
  background: #fef2e4;
  display: flex;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  flex-direction: column;
  padding: 10px;
  width: 100%;
}

.infographics-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  padding-inline: 30px;
  padding-block: 20px;
}

@media (min-width: 600px) {
  .infographics-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .infographics-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

.infographic {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  object-fit: contain;
}

.search-container {
  display: flex;
  gap: 8px;
  justify-content: center;
  padding-bottom: 30px;
  padding-top: 50px;
  padding-inline: 30px;
}

.search-container input {
  padding-inline: 8px;
  padding-block: 6px;
  border-radius: 8px;
  border-color: rgb(183, 79, 253);
}

.results-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.video-card {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
}

.title {
  margin-top: 10px;
  font-size: 16px;
}

.error {
  color: rgb(216, 3, 99);
}
</style>
