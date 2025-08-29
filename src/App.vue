<script setup lang="ts">
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
import SideBarNavigation from './components/SideBarNavigation.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <div class="min-h-screen flex flex-col">
      <header class="max-w-7xl mx-auto flex justify-center items-center">
        <router-link to="/" class="w-full flex justify-center items-center">
          <ErrorBoundary>
            <HeaderDisplay msg="Everything you need to know about Cebu" />
          </ErrorBoundary>
        </router-link>
      </header>
      <ErrorBoundary>
        <SideBarNavigation />
      </ErrorBoundary>

      <main class="flex-1 flex items-center justify-center lg:p-0 p-4 transition-spacing duration-300">
        <div class="w-full max-w-7xl">
          <ErrorBoundary>
            <MapDisplay />
          </ErrorBoundary>
        </div>
      </main>
    </div>
  </ErrorBoundary>
</template>

<style scoped></style>