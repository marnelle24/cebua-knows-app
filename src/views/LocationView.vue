<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';

const route = useRoute();
const location = ref(null);
const prettyLocation: Ref<string | null> = ref(null);
interface TouristSpot {
  name: string;
  description: string;
  address: string;
  category: string;
}

const spots = ref<TouristSpot[]>([]);
const loading = ref(false);
const fetchingAPIData = ref(false);

const openIndex = ref<number | null>(null)

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
  if (!routeLocation) return;

  if (typeof routeLocation === 'string') {
    prettyLocation.value = routeLocation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  } else if (Array.isArray(routeLocation)) {
    prettyLocation.value = routeLocation.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  // loading.value = true;
  spots.value = []; // Reset spots before fetching new data

  // Optionally call OpenAI API here
  if (routeLocation && typeof location.value === 'string')
    executeChartGPTPrompt(location.value);

  loading.value = false;
});

async function executeChartGPTPrompt(selectedLocation: string) {
  fetchingAPIData.value = true;
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const prompt = `
  List the top 10 tourist destinations in ${selectedLocation} in the province of Cebu, Philippines, and include:
  - Name of the place
  - A short description (1-2 sentences)
  - Address or general location
  - Category (e.g. historical, nature, religious, etc.)

  Respond in JSON array format like:
  [
    { "name": "", "description": "", "address": "", "category": "" },
    ...
  ]
  `;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  // Parse JSON if it's in valid format
  try {
    const touristSpots = JSON.parse(reply);
    spots.value = touristSpots;
    console.log('chatGPT prompt:', prompt);
    console.log(touristSpots)
  }
  catch (err) {
    console.log(err);
    console.log('GPT Response (not JSON):');
    console.log(reply);
  }
}
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
            class="p-6 bg-gray-900 border-t-0 overflow-scroll border border-yellow-100/80 rounded-b-xl text-gray-100 absolute top-13 w-full z-50">
            <template v-if="item.key === 'spots'">
              <button type="button" :disabled="!prettyLocation"
                @click="fetchingAPIData && executeChartGPTPrompt(prettyLocation)"
                class="px-3 py-1 border bg-slate-600/50 hover:bg-slate-600/90 text-white/60 rounded-xl text-sm hover:-translate-y-0.5 duration-300">Explore
                More</button>
              <div v-if="spots.length">
                <ul class="list-item">
                  <li v-for="(spot, index) in spots" :key="index">
                    <p class="numbering">{{ index + 1 + '.' }}</p>
                    <div>
                      <h3 class="text-xl font-bold">
                        <div>
                          {{ spot.name }}
                          <span class="category">{{ spot.category }}</span>
                        </div>
                        <p class="address">Location: {{ spot.address }}</p>
                      </h3>
                      <p class="description">{{ spot.description }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <p v-else class="spinner">
                <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px" y="0px" viewBox="0 40 60 16" enable-background="new 0 0 0 0" xml:space="preserve">
                  <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
                  </circle>
                  <circle fill="currentColor" stroke="none" cx="26" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
                  </circle>
                  <circle fill="currentColor" stroke="none" cx="46" cy="50" r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
                  </circle>
                </svg>
              </p>
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


<style scoped>
.address {
  font-size: 14px !important;
  margin: 0px;
  font-style: italic;
}

.description {
  font-size: 14px !important;
  margin: 0px;
  color: #fff;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner svg {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
}

.numbering {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-right: 0.5rem;
}

.list-item {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.category {
  font-size: 0.7rem;
  font-weight: normal;
  color: #ccc;
  margin-left: 0.5rem;
  border: 1px solid #ccc;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;
}

.list-item li {
  margin-bottom: 0.5rem;

  display: flex;
  gap: 10px;
}

.list-item li h3 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
}

.list-item li p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  line-height: 15px;
}

.description {
  line-height: 15px;
}

.sub-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 1rem;
}

.location {
  font-size: 2rem;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
}

.location span {
  font-style: italic;
}
</style>