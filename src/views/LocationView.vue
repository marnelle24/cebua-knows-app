<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

const route = useRoute();
const location = ref('');
const prettyLocation = ref('');
const spots = ref([]);
const loading = ref(false);

// reactive variables to hold location and pretty location
watchEffect(() => {
  const routeLocation = route.params.location;
  if (!routeLocation) return;

  location.value = routeLocation;
  prettyLocation.value = routeLocation
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  // loading.value = true;
  spots.value = []; // Reset spots before fetching new data

  // Optionally call OpenAI API here
  // if (location.value)
  // executeChartGPTPrompt(location.value);

  // loading.value = false;
});

async function executeChartGPTPrompt(selectedLocation) {

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
    <div v-if="spots.length">
      <h2 class="sub-heading">Top 10 Tourist Spots in {{ prettyLocation }}</h2>
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
      <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
        y="0px" viewBox="0 40 60 16" enable-background="new 0 0 0 0" xml:space="preserve">
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

.locationWrapper {
  padding: 1rem;
  border-radius: 8px;
  max-width: 100%;
}
</style>