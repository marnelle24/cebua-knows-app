<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
    <button type="button"
        class="fixed right-0 lg:top-8 top-24 -translate-y-1/2 flex items-center justify-center p-2 bg-white/10 hover:bg-white/5 hover:scale-105 backdrop-blur transition-all duration-300 rounded-l-lg border-l border-t border-b border-white/10 z-50"
        @click="isOpen = !isOpen">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 stroke-white transform transition-transform duration-300"
            :class="isOpen ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg> -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-6 transform transition-transform duration-300" :class="isOpen ? 'rotate-180' : ''">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

    </button>

    <!-- Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        :class="isOpen ? 'opacity-100' : 'opacity-0'" @click="isOpen = false">
    </div>

    <!-- Sidebar -->
    <aside
        class="fixed top-0 right-0 h-full w-full sm:w-80 bg-black/40 backdrop-blur-xl border-l border-white/10 transform transition-transform duration-300 ease-out z-50 flex flex-col"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'">

        <!-- Header -->
        <div class="flex items-center p-4 border-b border-white/10">
            <h2 class="text-xl font-bold text-white">Menu</h2>
            <button type="button" class="ml-auto p-2 hover:scale-125 duration-300" @click="isOpen = false">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4">
            <ul class="space-y-4">
                <li>
                    <router-link to="/"
                        class="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        @click="isOpen = false">
                        Home
                    </router-link>
                </li>
                <li>
                    <router-link to="/about"
                        class="flex items-center px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                        @click="isOpen = false">
                        About
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>
