<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  msg: string
}>()

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
  <div :class="[
    'w-full transition-all duration-500 ease-in-out flex items-center justify-center z-40 pt-4',
    isHeaderFixed ? 'fixed top-0 left-0 backdrop-blur-sm shadow-sm' : 'relative bg-transparent'
  ]">
    <img alt="CebuaKnows" src="@/assets/logo.png"
      class="px-4 py-2 z-20 transition-all duration-300 w-full h-[60px] object-contain" />
  </div>
</template>

<style scoped>
.fixed {
  animation: slideDown 0.5s ease-in-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>