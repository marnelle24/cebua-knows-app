<template>
    <div v-if="error" class="error-boundary">
        <div class="error-content">
            <div class="error-icon text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p class="text-gray-600 mb-4">{{ error.message }}</p>
            <button @click="resetError"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Try Again
            </button>
        </div>
    </div>
    <slot v-else></slot>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err: Error) => {
    error.value = err
    return false // Prevent error from propagating
})

const resetError = () => {
    error.value = null
}
</script>

<style scoped>
.error-boundary {
    @apply flex items-center justify-center min-h-[200px] p-4;
}

.error-content {
    @apply flex flex-col items-center text-center max-w-md mx-auto;
}
</style>
