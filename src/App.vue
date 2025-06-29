<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'

// const route = useRoute();
// console.log(route.params);

</script>

<template>
  <main class="flex items-center justify-center sticky z-50">
    <div class="sticky top-0 z-[99999]">
      <HeaderDisplay msg="Everything you need to know about Cebu" />
      <div id="mainContainer">
        <RouterView :key="$route.fullPath" />
      </div>
    </div>
  </main>
  <MapDisplay :map-scale="4" />
</template>

<style scoped></style>