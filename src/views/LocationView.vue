<script setup lang="ts">
import FamousTouristSpots from '@/components/FamousTouristSpots.vue';
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';

const route = useRoute();
const prettyLocation: Ref<string | null> = ref(null);

const openIndex = ref<number | null>(null)

// on load the route, reset all the data again
function resetAllData() {
  prettyLocation.value = null;
  openIndex.value = null;
}

function toggle(index: number) {
  if (openIndex.value !== index)
    openIndex.value = index;
  else
    openIndex.value = null;
}

const features = ref([
  { key: 'spots', heading: 'Top Famous Tourist Spots', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
  { key: 'underrated', heading: 'Under-rated Tourist Spots', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
  { key: 'local-foods', heading: 'Local Foods', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
  { key: 'delicacy', heading: 'Delicacies', subheading: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor.Lorem Ipsum Dolor.Lorem Ipsum Dolor.' },
]);
// reactive variables to hold location and pretty location

watchEffect(() => {
  const routeLocation = route.params.location;
  resetAllData();
  if (!routeLocation) return;

  if (typeof routeLocation === 'string') {
    prettyLocation.value = routeLocation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  } else if (Array.isArray(routeLocation)) {
    prettyLocation.value = routeLocation.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
});


</script>


<template>
  <div class="locationWrapper">
    <div class="mx-auto mt-10 space-y-6">
      <div v-for="(item, index) in features" :key="index" class="border border-yellow-100/50 shadow relative">
        <button @click="toggle(index)" type="button"
          :class="{ 'bg-yellow-500/10 border border-t-yellow-100/50 border-b-0 border-x-yellow-100/50': openIndex === index }"
          class="w-full px-4 py-4 hover:bg-yellow-500/10 duration-300 text-left font-thin uppercase tracking-wide flex justify-between items-center text-white">
          {{ item.heading + ' in ' + prettyLocation }}
          <span class="text-yellow-300/30">{{ openIndex === index ? '▼' : '▶' }}</span>
        </button>

        <transition name="accordion" enter-active-class="transition-all duration-300 ease-in-out"
          leave-active-class="transition-all duration-200 ease-in-out" enter-from-class="max-h-0 opacity-0"
          enter-to-class="max-h-[200px] opacity-100" leave-from-class="max-h-[200px] opacity-100"
          leave-to-class="max-h-0 opacity-0">
          <div v-show="openIndex === index"
            class="bg-gray-900 border-t-0 overflow-scroll border border-yellow-100/80 rounded-b-xl text-gray-100 absolute top-13 w-full z-50">
            <template v-if="item.key === 'spots'">
              <FamousTouristSpots :location="prettyLocation ?? ''"
                :key="Array.isArray($route.params.location) ? $route.params.location.join('-') : $route.params.location" />
            </template>
            <template v-else-if="item.key === 'underrated'">
              <br />
              underrated
              <br />
            </template>
            <template v-else-if="item.key === 'local-foods'">
              <br />
              local foods
              <br />
            </template>
            <template v-else-if="item.key === 'delicacy'">
              <br />
              delicacy
              <br />
            </template>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>