<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
    <button type="button" class="flex justify-center items-center" @click="isOpen = true">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="xl:w-12 xl:h-12 w-9 h-9 fill-none stroke-white hover:scale-110 duration-300 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5" />
        </svg>
    </button>
    <div v-if="isOpen" @click="isOpen = false" class="fixed inset-0 bg-black bg-opacity-60 z-40"></div>
    <aside class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
        <div class="p-6">
            <!-- <h2 class="text-xl font-bold mb-4">Menu</h2> -->
            <ul class="space-y-4">
                <li>
                    <!-- <a href="#" class="text-gray-700 hover:text-blue-600">Home</a> -->
                    <router-link to="/" class="text-gray-700 hover:text-blue-600">Home</router-link>
                </li>
                <li>
                    <!-- <a href="#" class="text-gray-700 hover:text-blue-600">About</a> -->
                    <router-link to="/about" class="text-gray-700 hover:text-blue-600">About</router-link>
                </li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Services</a></li>
                <li><a href="#" class="text-gray-700 hover:text-blue-600">Contact</a></li>
            </ul>
        </div>
    </aside>
</template>
