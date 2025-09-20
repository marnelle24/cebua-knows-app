<template>
    <Transition name="modal-fade">
        <div v-if="isVisible"
            class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
            @click="closeModal">
            <div class="bg-blur-2xl border border-white/60 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
                @click.stop>
                <div
                    class="flex items-center justify-between p-6 sm:p-4 border-b border-gray-200 bg-white/90 text-slate-800">
                    <h2 class="text-xl sm:text-lg font-bold m-0 leading-tight">Great Finds in {{
                        formatRegionName(regionName) }}</h2>
                    <button
                        class="bg-slate-300/60 rounded-full w-10 h-10 flex items-center justify-center text-slate-600 cursor-pointer transition-colors duration-200 ease-in-out hover:bg-slate-300/80"
                        @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="flex-1 overflow-y-auto bg-white/90">
                    <div class="flex flex-col">
                        <div v-for="category in greatFinds" :key="category.id"
                            class="flex items-center gap-4 p-6 border border-gray-200 transition-all duration-200 ease-in-out cursor-pointer bg-slate-100 hover:border-[#F7AE1D] hover:bg-[#FFB84D]/50 hover:shadow-lg hover:shadow-[#F7AE1D]/15 hover:-translate-y-px"
                            @click="handleCategoryClick(category)">
                            <div
                                class="flex-shrink-0 w-12 h-12 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-slate-800">
                                <div v-html="getCategoryIcon(category.type).template"></div>
                            </div>
                            <div class="flex-1">
                                <h3 class="text-base sm:text-sm font-semibold mb-1 text-slate-800 leading-tight">
                                    {{ category.title }}</h3>
                                <p class="text-sm sm:text-xs text-slate-800/80 m-0 leading-tight">{{
                                    category.description }}
                                </p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-800" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-6 sm:p-4 border-t bg-blur-2xl border border-white/60 bg-white/90 text-slate-800">
                    <button
                        class="bg-slate-200 border border-slate-500 rounded-full px-4 py-2 hover:bg-slate-300 hover:-translate-y-1 duration-300 ease-in-out"
                        @click="exploreRegion">
                        Explore {{ formatRegionName(regionName) }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>

    <!-- AI Results Modal -->
    <AIResultsModal :isVisible="showAIResults" :loading="aiResultsLoading" :error="aiResultsError" :results="aiResults"
        :regionName="regionName" :categoryType="currentCategory?.type || ''"
        :categoryTitle="currentCategory?.title || ''" @close="closeAIResults" @retry="retryAIRequest"
        @explore="exploreFromAI" />
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAPIStore } from '../stores/apiStore'
import AIResultsModal from './AIResultsModal.vue'

interface GreatFind {
    id: string
    type: 'accommodation' | 'food' | 'activities' | 'shopping' | 'nature' | 'culture'
    title: string
    description: string
    query: string
    label: string
    keyphrase: string
}

interface AIResult {
    name: string
    description: string
    address?: string
    category?: string
    highlights?: string
}

interface Props {
    isVisible: boolean
    regionName: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    explore: [regionName: string]
}>()

const router = useRouter()
const apiStore = useAPIStore()

// AI Results Modal state
const showAIResults = ref(false)
const aiResultsLoading = ref(false)
const aiResultsError = ref<string | null>(null)
const aiResults = ref<AIResult[]>([])
const currentCategory = ref<GreatFind | null>(null)

const formatRegionName = (name: string): string => {
    if (!name) return ''

    // Handle special cases
    if (name.includes('-city')) {
        return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    // Capitalize first letter of each word
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
}

const greatFinds = computed((): GreatFind[] => {
    // Sample data mapped to existing categories that work with the inquiry system
    const sampleFinds: GreatFind[] = [
        {
            id: '1',
            type: 'accommodation',
            title: `Top Hotels in ${formatRegionName(props.regionName)}`,
            description: 'Discover the best hotels and accommodations with great reviews',
            query: 'hotels',
            label: 'hotels',
            keyphrase: 'top hotels'
        },
        {
            id: '2',
            type: 'food',
            title: `Top Coffee Shops in ${formatRegionName(props.regionName)}`,
            description: 'Best local cafes and coffee spots to relax and unwind',
            query: 'coffee-shops',
            label: 'coffee shops',
            keyphrase: 'top coffee shops'
        },
        {
            id: '3',
            type: 'food',
            title: `Top Milk Tea Shops in ${formatRegionName(props.regionName)}`,
            description: 'Popular milk tea and beverage shops in the area',
            query: 'milk-tea-shops',
            label: 'milk tea shops',
            keyphrase: 'top milk tea shops'
        },
        {
            id: '4',
            type: 'activities',
            title: `Top Tourist Spots in ${formatRegionName(props.regionName)}`,
            description: 'Popular destinations and must-visit landmarks',
            query: 'tourist-spots',
            label: 'tourist spots',
            keyphrase: 'top tourist destinations'
        },
        {
            id: '5',
            type: 'nature',
            title: `Best Diving Spots in ${formatRegionName(props.regionName)}`,
            description: 'Amazing underwater attractions and diving experiences',
            query: 'diving-spots',
            label: 'diving spots',
            keyphrase: 'top diving spots'
        },
        {
            id: '6',
            type: 'food',
            title: `Local Delicacies in ${formatRegionName(props.regionName)}`,
            description: 'Authentic local cuisine and traditional food specialties',
            query: 'delicacies',
            label: 'delicacies',
            keyphrase: 'top delicacies'
        },
        {
            id: '7',
            type: 'culture',
            title: `Churches in ${formatRegionName(props.regionName)}`,
            description: 'Historical churches and religious landmarks',
            query: 'churches',
            label: 'churches',
            keyphrase: 'churches'
        }
    ]

    return sampleFinds
})

const getCategoryIcon = (type: string) => {
    const icons = {
        accommodation: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
            `
        },
        food: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            `
        },
        activities: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `
        },
        shopping: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
            `
        },
        nature: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v20m-3-9c0 3-2 4-2 4s2-1 2-4m0 0c0-3 2-4 2-4s-2 1-2 4" />
                </svg>
            `
        },
        culture: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8h4M10 12h4" />
                </svg>
            `
        }
    }

    return icons[type as keyof typeof icons] || {
        template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        `
    }
}

const closeModal = () => {
    emit('close')
}

const exploreRegion = () => {
    emit('explore', props.regionName)
}

// Handle category click - generate prompt and call OpenAI API
const handleCategoryClick = async (category: GreatFind) => {
    try {
        // Set loading state
        currentCategory.value = category
        aiResultsLoading.value = true
        aiResultsError.value = null
        aiResults.value = []
        showAIResults.value = true

        // Generate the prompt based on the category and region
        const prompt = generatePrompt(category, props.regionName)

        // Call OpenAI API
        const response = await apiStore.fetchFromOpenAI(prompt, props.regionName)

        // Parse the JSON response
        try {
            const parsedResults = JSON.parse(response)
            aiResults.value = Array.isArray(parsedResults) ? parsedResults : []
        } catch (parseError) {
            console.error('Error parsing OpenAI response:', parseError)
            aiResultsError.value = 'Failed to parse the response from AI. Please try again.'
        }

    } catch (error) {
        console.error('Error processing category click:', error)
        aiResultsError.value = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
    } finally {
        aiResultsLoading.value = false
    }
}

// Generate OpenAI prompt based on category and region
const generatePrompt = (category: GreatFind, regionName: string) => {
    const formattedRegion = formatRegionName(regionName)

    const basePrompt = `List the top 10 ${category.label} in ${formattedRegion}, Cebu, Philippines. Include:
- Name of the establishment/place
- A brief description (1-2 sentences)
- Address or general location
- Category or type
- Any special features or highlights

Respond in JSON array format like:
[
  { "name": "", "description": "", "address": "", "category": "", "highlights": "" },
  ...
]

Make sure the information is accurate and up-to-date. Focus on highly-rated and recommended ${category.label} that locals and tourists would enjoy.`

    return basePrompt
}

// AI Results Modal handlers
const closeAIResults = () => {
    showAIResults.value = false
}

const retryAIRequest = () => {
    if (currentCategory.value) {
        handleCategoryClick(currentCategory.value)
    }
}

const exploreFromAI = (regionName: string) => {
    showAIResults.value = false
    emit('close')
    router.push({ name: 'location', params: { location: regionName } })
}
</script>
