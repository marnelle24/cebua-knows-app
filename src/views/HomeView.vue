<script setup lang="ts">

const items = [
  {
    heading: 'Getting to know more about the town',
    details: 'A progressive JavaScript framework for building user interfaces.'
  },
  {
    heading: 'Discover popular & hidden destinations',
    details: 'A progressive JavaScript framework for building user interfaces.'
  },
  {
    heading: 'Eat local food & Delicacies',
    details: 'A utility-first CSS framework for rapid UI development.'
  },
  {
    heading: 'Eat with the local, live like a local',
    details: 'A typed superset of JavaScript that compiles to plain JavaScript.'
  }
];

</script>

<template>
  <ul class="p-4 ml-4 mt-8 flex flex-col gap-8">
    <li v-for="(item, index) in items" :key="index" class="">
      <h3 class="xl:text-2xl text-xl text-white font-bold">{{ item.heading }}</h3>
      <p class="xl:text-lg text-md">{{ item.details }}</p>
    </li>
  </ul>
</template>


<style scoped></style>