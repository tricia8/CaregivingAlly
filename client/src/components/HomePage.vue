<template>
  <div class="home-page">
    <div class="snap-container">
      <section class="snap-section">
        <div class="snap-section-content">
          <AnimatedBackground />

          <div class="header-wrapper">
            <div class="header-container">
              <div class="header-contents">
                <h1 class="title">
                  CaregivingAlly
                </h1>
                <p class="tagline">
                  Your companion in caregiving.
                </p>
              </div>
              <hr class="divider">
            </div>

            <img
              src="/care-support.png"
              alt="care-support"
              class="care-support-pic"
            >
          </div>

          <div class="description-wrapper">
            <p class="description">
              Caregiving is a journey of love, sacrifice and strength. But even
              the strongest need support. Share your story, seek advice, and
              support others who truly understand what you're going through.
            </p>
          </div>
        </div>
      </section>

      <section class="snap-section stats-section">
        <div class="snap-section-content">
          <router-link to="/resources">
            Browse resources
          </router-link>
        </div>
      </section>

      <section class="snap-section">
        <div class="snap-section-content">
          <router-link to="/share">
            Go to the Wall of Voices
          </router-link>
          <p>A place where caregivers connect through reflection.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import AnimatedBackground from "./AnimatedBackground.vue";
</script>

<style scoped>
.home-page {
  background: rgb(205, 239, 218);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
}

.snap-container {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.snap-section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  position: relative;
}

.snap-section-content {
  min-height: 100vh;
  padding-block: 30px;
  padding-inline: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.stats-section {
  background: rgb(182, 228, 238);
}

.header-wrapper {
  padding-inline: 50px;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 20px;
}

@media (max-width: 1200px) {
  .header-wrapper {
    flex-direction: column;
    align-items: center;
  }
}

.header-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.header-contents {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

@media (min-width: 900px) {
  .header-contents {
    flex-direction: row;
    align-items: flex-end;
    gap: 80px;
  }
}

.title {
  font-size: 80px;
  line-height: 1;
  word-break: break-word;
}

.tagline {
  font-size: 20px;
  line-height: 1;
  word-break: break-word;
}

.divider {
  border: none;
  border-top: 2px solid #2c3e50;
  margin: 6px 0;
  width: 100%;
}

.description-wrapper {
  padding-inline: 150px;
  padding-block: 40px;
  align-items: center;
  z-index: 1;
}

@media (max-width: 1200px) {
  .description-wrapper {
    padding-inline: 100px;
  }
}

@media (max-width: 900px) {
  .description-wrapper {
    padding-inline: 60px;
  }
}

@media (max-width: 600px) {
  .description-wrapper {
    padding-inline: 20px;
  }
}

.description {
  font-size: 18px;
  line-height: 1;
  word-break: break-word;
  text-align: center;
  line-height: 1.5;
}

.care-support-pic {
  height: 400px;
  width: auto;
}
</style>
