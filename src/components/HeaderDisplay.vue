<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <header class="headerContainer">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div>
      <h1 class="text-red-400">Cebua<strong class="text-blue-400">Knows</strong></h1>
      <h3>{{ msg }}</h3>
    </div>
  </header>
</template>

<style scoped>
.headerContainer {
  display: flex;
  flex-direction: row;
  align-items: start;
  max-width: 100%;

}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  line-height: 2.5rem;
  /* position: relative; */
  /* top: -10px; */
}

strong {
  font-weight: 600;
  color: #FFF;
}

h3 {
  font-size: 1rem;
}

.logo {
  display: block;
  margin: 0 auto;
  width: 4rem;
}

/* .greetings h1,
.greetings h3 {
  text-align: center;
} */

/* @media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
