<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps<{
    location: string,
    label: string,
    inquiry: string,
    province: string
}>()

// const promptResponse = ref([]);

// 1. get the value of the inquiry prop
// 2. find the '<label>' string value in the inquiry prop and replace it with the value of the label prop
// 3. replace all instances of '<selectedProvince>'
// 4. replace all instances of '<selectedLocation>'
// 5. return the cleaned up string value

const finalString = computed(() => {
    return props.inquiry
        .replace('<label>', props.label)
        .replace('<selectedProvince>', props.province)
        .replace('<selectedLocation>', props.location)
})

console.log(finalString);







interface TouristSpot {
    name: string;
    description: string;
    address: string;
    category: string;
}
const spots = ref<TouristSpot[]>([]);
const fetchingAPIData = ref(false);

async function executeChartGPTPrompt() {
    fetchingAPIData.value = true;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const prompt = `
  List the top 10 tourist destinations in ${location} in the province of Cebu, Philippines, and include:
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
        fetchingAPIData.value = false;
    }
    catch (err) {
        console.log(err);
        console.log('GPT Response (not JSON):');
        console.log(reply);
    }
}
</script>
<template>
    <template v-if="fetchingAPIData">
        <p class="flex items-center justify-center">
            <svg class="mx-auto w-10 h-10 flex" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 40 60 16"
                enable-background="new 0 0 0 0" xml:space="preserve">
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
    <template v-else>
        <div v-if="spots.length" class="max-h-[300px] overflow-scroll p-5">
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
        <div v-else class="text-center flex flex-col items-center justify-center py-5 gap-4">
            <button type="button" :disabled="fetchingAPIData" @click="executeChartGPTPrompt()"
                class="px-3 py-1 border bg-slate-600/50 hover:bg-slate-600/90 text-white/60 rounded-xl text-sm hover:-translate-y-0.5 duration-300">
                Click to explore more tourist destinations..
            </button>
            <p v-show="!fetchingAPIData" class="text-white/60">No destinations loaded yet.</p>
            <p v-show="!spots.length && fetchingAPIData">No tourist spots found. Please try again later.</p>
        </div>
    </template>
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
</style>