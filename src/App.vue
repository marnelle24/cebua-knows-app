<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
import SideBarNavigation from './components/SideBarNavigation.vue'
</script>

<template>
  <header class="xl:px-0 px-4 w-full flex xl:gap-0 gap-8 justify-between items-start relative z-50">
    <div class="xl:w-2/3">
      <HeaderDisplay msg="Everything you need to know about Cebu" />
    </div>
    <SideBarNavigation />
  </header>
  <main class="flex xl:flex-row flex-col justify-between h-screen">
    <div class="sticky top-0">
      <div id="mainContainer">
        <RouterView :key="$route.fullPath" />
      </div>
    </div>
    <div class="flex items-center justify-center">
      <MapDisplay />
    </div>
  </main>
</template>

<style scoped></style>