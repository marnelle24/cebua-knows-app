<template>
    <div class="flex flex-col items-center justify-center min-h-[200px] p-4">
        <div class="text-red-500 mb-4">⚠️</div>
        <h2 class="text-xl font-bold mb-2">Page Not Found</h2>
        <p class="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
        <button @click="$router.push('/')" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Go Home
        </button>
    </div>
</template>