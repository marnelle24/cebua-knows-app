<script setup lang="ts">
// import FamousTouristSpots from '@/components/FamousTouristSpots.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router'

const route = useRoute();
const prettyLocation: Ref<string | null> = ref(null);

const location = route.params.location;

const services = ref([
  {
    query: 'hotels',
    label: 'Hotels',
    keyphrase: 'top-2-hotels'
  },
  {
    query: 'coffee-shops',
    label: 'Coffee Shops',
    keyphrase: 'top-5-coffee-shops'
  },
  {
    query: 'tourist-spots',
    label: 'Tourist Spots',
    keyphrase: 'top-5-tourist-destinations'
  },
  {
    query: 'milk-tea-shops',
    label: 'Milk Tea Shops',
    keyphrase: 'top-milk-tea-shops'
  },
  {
    query: 'coffee-shops',
    label: 'Coffee Shops',
    keyphrase: 'top-5-coffee-shops'
  },
  {
    query: 'diving-spots',
    label: 'Diving Spots',
    keyphrase: 'top-diving-spots'
  },
  {
    query: 'tourist-inn',
    label: 'Tourist Inn',
    keyphrase: 'top-tourist-inn'
  },
  {
    query: 'delicacies',
    label: 'Delicacies',
    keyphrase: 'top-delicacies'
  },
  {
    query: 'churches',
    label: 'Churches',
    keyphrase: 'churches'
  },
  {
    query: 'police-stations',
    label: 'Police Station',
    keyphrase: 'police-stations'
  },
  {
    query: 'car-rentals',
    label: 'Car Rentals',
    keyphrase: 'car-rentals'
  },
  {
    query: 'golf-courses',
    label: 'Golf Courses',
    keyphrase: 'golf-courses'
  },
  {
    query: 'politician',
    label: 'Politicians',
    keyphrase: 'current politicians'
  },
]);

watchEffect(() => {
  const location = route.params.location;
  prettyLocation.value = null;

  if (typeof location === 'string') {
    prettyLocation.value = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  } else if (Array.isArray(location)) {
    prettyLocation.value = location.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
});

</script>


<template>
  <div class="locationWrapper">
    <div class="mt-10">
      <p class="px-4 text-[#f7ae1d] italic text-xl font-semibold">What are you looking for in {{ prettyLocation }}?</p>
      <br />
      <div class="p-4 flex gap-4 flex-wrap">
        <router-link v-for="(item, index) in services" :key="index"
          class="text-[#f7ae1d] font-thin hover:bg-[#f7ae1d]/70 hover:text-white hover:scale-105 hover:shadow hover:shadow-[#f7ae1d]/60 duration-300 cursor-pointer border border-[#f7ae1d] py-2 px-4 rounded-full flex items-center justify-center text-lg"
          :to="{ name: 'inquiry', params: { place: location, inquiry: item.query } }">
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>