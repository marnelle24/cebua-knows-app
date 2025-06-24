<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <header>
    <!-- <router-link to="/"> -->
    <a href="/">
      <img alt="CebuaKnows" src="@/assets/logo.png"
        class="xl:w-full w-4/5 xl:mt-0 mt-4 flex justify-center mx-auto hover:scale-105 duration-500 transition" />
    </a>
    <!-- </router-link> -->
  </header>
</template>