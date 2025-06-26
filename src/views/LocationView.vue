<script setup lang="ts">
// import FamousTouristSpots from '@/components/FamousTouristSpots.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { RouterLink } from 'vue-router'

const route = useRoute();
// const router = useRouter();
const prettyLocation: Ref<string | null> = ref(null);
const openIndex = ref<number | null>(null)

// on load the route, reset all the data again
function resetAllData() {
  prettyLocation.value = null;
  openIndex.value = null;
}

// function toggle(index: number) {
//   if (openIndex.value !== index)
//     openIndex.value = index;
//   else
//     openIndex.value = null;
// }

const services = ref([
  {
    label: 'Top 3 Five Stars Hotels',
    query: 'hotels',
    keyphrase: 'top-2-hotels'
  },
  {
    label: 'Top 5 Coffee Shops',
    query: 'coffee-shops',
    keyphrase: 'top-5-coffee-shops'
  },
  {
    label: 'Top 5 Tourist Destinations',
    query: 'tourist-spots',
    keyphrase: 'top-5-tourist-destinations'
  },
]);


// const features = ref([
//   { key: 'spots', heading: 'Top Famous Tourist Spots', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
//   { key: 'underrated', heading: 'Under-rated Tourist Spots', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
//   { key: 'local-foods', heading: 'Local Foods', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
//   { key: 'delicacy', heading: 'Delicacies', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
// ]);
// reactive variables to hold location and pretty location

watchEffect(() => {
  const location = route.params.location;
  // const query = route.params.route;
  // const phrase = route.params.keyphrase;

  // console.log(location, query, phrase);

  resetAllData();

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
      <p class="px-4 text-[#f7ae1d] italic text-lg">What are you looking for in {{ prettyLocation }}?</p>
      <div class="p-4 flex gap-4 flex-wrap">
        <router-link v-for="(item, index) in services" :key="index"
          class="text-[#f7ae1d] hover:bg-[#f7ae1d]/70 hover:text-white hover:scale-105 hover:shadow hover:shadow-[#f7ae1d]/60 duration-300 cursor-pointer border border-[#f7ae1d] py-2 px-4 rounded-full flex items-center justify-center text-lg"
          :to="{ name: 'inquiry', params: { place: 'cebu-city', inquiry: item.query } }">
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>