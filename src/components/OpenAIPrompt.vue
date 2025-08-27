<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAPIStore } from '../stores/apiStore';
import SkeletonLoader from './SkeletonLoader.vue';
const props = defineProps<{
    location: string,
    label: string,
    inquiry: string,
    province: string
}>()

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
    const apiStore = useAPIStore();
    const prompt = `
  List the top 10 tourist destinations in ${props.location} in the province of Cebu, Philippines, and include:
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

    try {
        const reply = await apiStore.fetchFromOpenAI(prompt, props.location);
        const touristSpots = JSON.parse(reply);
        spots.value = touristSpots;
    } catch (err) {
        console.error('Error fetching tourist spots:', err);
        spots.value = [];
    }
}
</script>
<template>
    <template v-if="fetchingAPIData">
        <div class="p-4 space-y-4">
            <div v-for="n in 3" :key="n" class="flex gap-4">
                <SkeletonLoader variant="circle" className="w-8 h-8" />
                <div class="flex-1 space-y-2">
                    <SkeletonLoader variant="text" className="w-3/4" />
                    <SkeletonLoader variant="text" className="w-1/2" />
                </div>
            </div>
        </div>
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