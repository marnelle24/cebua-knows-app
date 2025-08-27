<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeaderDisplay from './components/HeaderDisplay.vue'
import MapDisplay from './components/MapDisplay.vue'
import SideBarNavigation from './components/SideBarNavigation.vue'
import ErrorBoundary from './components/ErrorBoundary.vue'

const isHeaderFixed = ref(false)

const checkScroll = () => {
  const quarterHeight = window.innerHeight / 16
  isHeaderFixed.value = window.pageYOffset >= quarterHeight
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <ErrorBoundary>
    <div class="min-h-screen flex flex-col">
      <header :class="[
        'w-full px-4 py-2 z-20 transition-all duration-300 ease-in-out fixed top-0 left-0 ',
        isHeaderFixed ? 'backdrop-blur-sm' : 'relative bg-transparent'
      ]">
        <div class="max-w-7xl mx-auto flex justify-center items-center h-[80px]">
          <a href="/" class="w-full md:w-2/5 flex justify-center items-center">
            <ErrorBoundary>
              <HeaderDisplay msg="Everything you need to know about Cebu" />
            </ErrorBoundary>
          </a>
        </div>
      </header>
      <ErrorBoundary>
        <SideBarNavigation />
      </ErrorBoundary>

      <main :class="[
        'flex-1 flex items-center justify-center lg:p-0 p-4 transition-spacing duration-300',
        isHeaderFixed ? 'mt-16' : ''
      ]">
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