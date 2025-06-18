<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
// import { RouterLink } from 'vue-router'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
</script>

<template>
  <!-- <div class="headerContainer"> -->
  <main class="mainWrapper">
    <HeaderDisplay msg="Everything you need to know about Cebu" />
    <div class="contentWrapper">
      <RouterView />
    </div>
  </main>

  <MapDisplay />

</template>

<style scoped>
.mainWrapper {
  display: flex;
  row-gap: 25px;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 50px auto;
}

.contentWrapper {
  max-width: 100%;
  background-color: #f8f9fa;
  opacity: 0.5;
}
</style>
