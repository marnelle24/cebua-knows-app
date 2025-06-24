<script setup lang="ts">
import { RouterView } from 'vue-router'
// import { RouterLink } from 'vue-router'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
</script>

<template>
  <!-- <div class="headerContainer"> -->
  <main class="flex items-center justify-center sticky">
    <div class="sticky top-0 z-[99999]">
      <HeaderDisplay msg="Everything you need to know about Cebu" />
      <div id="mainContainer">
        <RouterView />
      </div>
    </div>
  </main>
  <MapDisplay />
</template>

<style scoped></style>