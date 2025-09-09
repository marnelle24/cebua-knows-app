<template>
    <Transition name="modal-fade">
        <div v-if="isVisible"
            class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[1100] p-4 md:p-2"
            @click="closeModal">
            <div class="bg-blur-2xl border border-white/60 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                @click.stop>
                <!-- Modal Header -->
                <div
                    class="px-8 py-6 md:px-6 md:py-4 border-b border-white/60 text-white flex items-start justify-between">
                    <div class="flex items-start gap-4 flex-1">
                        <div class="flex items-center justify-center flex-shrink-0">
                            <div v-html="getCategoryIcon(categoryType).template"
                                class="flex place-content-center lg:w-5 lg:h-5 w-12 h-12">
                            </div>
                        </div>
                        <div>
                            <h2 class="lg:text-2xl md:text-xl text-md font-bold m-0 leading-tight">{{ categoryTitle }}
                            </h2>
                            <p class="text-base md:text-sm opacity-90 mt-1 font-normal italic">{{
                                formatRegionName(regionName)
                                }}, Cebu</p>
                        </div>
                    </div>
                    <button
                        class="hover:bg-white/20 rounded-full duration-300 p-3 flex items-center justify-center flex-shrink-0 hover:scale-105"
                        @click="closeModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Modal Body -->
                <div class="flex-1 overflow-y-auto px-8 py-8 md:px-6 md:py-6 min-h-[200px]">
                    <!-- Loading State -->
                    <div v-if="loading"
                        class="flex flex-col items-center justify-center py-12 px-8 md:py-8 md:px-4 text-center">
                        <div
                            class="w-12 h-12 border-4 border-gray-200 border-t-white/20 rounded-full animate-spin mb-6">
                        </div>
                        <p class="text-lg md:text-base text-white/80 mb-4 font-medium">Finding the best recommendations
                            for you...</p>
                        <div class="flex gap-2">
                            <span
                                class="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:-0.32s]"></span>
                            <span
                                class="w-2 h-2 bg-white/20 rounded-full animate-bounce [animation-delay:-0.16s]"></span>
                            <span class="w-2 h-2 bg-white/20 rounded-full animate-bounce"></span>
                        </div>
                    </div>

                    <!-- Error State -->
                    <div v-else-if="error"
                        class="flex flex-col items-center justify-center py-12 px-8 md:py-8 md:px-4 text-center">
                        <div class="text-red-500 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl md:text-lg font-semibold text-gray-700 mb-3">Oops! Something went wrong</h3>
                        <p class="text-gray-500 mb-8 leading-relaxed">{{ error }}</p>
                        <button
                            class="bg-white/20 border border-white/60 text-white border-none rounded-xl px-6 py-3 font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F7AE1D]/30"
                            @click="retryRequest">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Try Again
                        </button>
                    </div>

                    <!-- Results Display -->
                    <div v-else-if="results.length > 0" class="animate-fade-in-up">
                        <div class="mb-8 md:mb-6 text-center">
                            <h3 class="text-2xl md:text-xl font-bold text-white mb-2">{{ results.length }} Great
                                Finds</h3>
                            <p class="text-white/80">AI-curated recommendations just for you</p>
                        </div>

                        <div class="flex flex-col gap-6">
                            <div v-for="(item, index) in results" :key="index"
                                class="flex gap-5 md:gap-4 p-6 md:p-5 border border-gray-200 rounded-2xl transition-all duration-300 animate-slide-in-up hover:bg-[#FFB84D]/10 hover:border-[#F7AE1D] hover:shadow-lg hover:shadow-[#F7AE1D]/10 hover:-translate-y-0.5"
                                :style="{ animationDelay: `${index * 100}ms` }">
                                <div
                                    class="flex-shrink-0 w-8 h-8 border border-white/60 bg-black/60 hover:border-[#F7AE1D] hover:bg-[#FFB84D]/50 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                    {{ index + 1 }}
                                </div>
                                <div class="flex-1">
                                    <h4 class="text-lg md:text-base font-semibold text-white mb-2 leading-tight">{{
                                        item.name }}</h4>
                                    <p class="text-white/80 mb-4 leading-relaxed text-sm">{{ item.description }}</p>
                                    <div class="flex flex-col gap-2 mb-4">
                                        <div v-if="item.address" class="flex items-center gap-2 text-white/80 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{{ item.address }}</span>
                                        </div>
                                        <div v-if="item.category" class="flex items-center gap-2 text-white/80 text-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                            </svg>
                                            <span>{{ item.category }}</span>
                                        </div>
                                    </div>
                                    <div v-if="item.highlights"
                                        class="bg-white/10 border border-white/60 rounded-lg p-3 text-sm">
                                        <span class="font-semibold text-white mr-2">✨ Highlights:</span>
                                        <span class="text-white">{{ item.highlights }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- No Results State -->
                    <div v-else
                        class="flex flex-col items-center justify-center py-12 px-8 md:py-8 md:px-4 text-center">
                        <div class="text-white/80 mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 class="text-xl md:text-lg font-semibold text-gray-700 mb-3">No results found</h3>
                        <p class="text-gray-500 leading-relaxed">We couldn't find any recommendations for this category
                            in {{ formatRegionName(regionName) }}.</p>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div
                    class="px-8 py-6 md:px-6 md:py-4 bg-blur-2xl border-t border-white/60 bg-white/20 text-white flex gap-4 justify-between">
                    <button
                        class="bg-white/80 text-gray-700 border border-white/60 rounded-full lg:px-6 px-4 lg:py-2 py-0 font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
                        @click="closeModal">
                        Close
                    </button>
                    <button
                        class="text-white bg-[#F7AE1D]/40 border-none border-[#F7AE1D] rounded-xl lg:px-6 px-4 lg:py-3 py-2 font-semibold cursor-pointer transition-all duration-200 flex items-center justify-between hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#F7AE1D]/60 hover:border-[#F7AE1D]/60 hover:shadow-[#F7AE1D]/30"
                        @click="exploreMore">
                        <svg xmlns="http://www.w3.org/2000/svg" class="lg:h-4 lg:w-4 h-6 w-6 mr-2" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Explore {{ formatRegionName(regionName) }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface AIResult {
    name: string
    description: string
    address?: string
    category?: string
    highlights?: string
}

interface Props {
    isVisible: boolean
    loading: boolean
    error: string | null
    results: AIResult[]
    regionName: string
    categoryType: string
    categoryTitle: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
    close: []
    retry: []
    explore: [regionName: string]
}>()

const formatRegionName = (name: string): string => {
    if (!name) return ''

    // Handle special cases
    if (name.includes('-city')) {
        return name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    }

    // Capitalize first letter of each word
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
}

const getCategoryIcon = (type: string) => {
    const icons = {
        accommodation: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
            `
        },
        food: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
            `
        },
        activities: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            `
        },
        shopping: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
            `
        },
        nature: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-10v20m-3-9c0 3-2 4-2 4s2-1 2-4m0 0c0-3 2-4 2-4s-2 1-2 4" />
                </svg>
            `
        },
        culture: {
            template: `
                <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8h4M10 12h4" />
                </svg>
            `
        }
    }

    return icons[type as keyof typeof icons] || {
        template: `
            <svg xmlns="http://www.w3.org/2000/svg" class="lg:w-6 lg:h-6 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        `
    }
}

const closeModal = () => {
    emit('close')
}

const retryRequest = () => {
    emit('retry')
}

const exploreMore = () => {
    emit('explore', props.regionName)
}
</script>