<script setup lang="ts">
import { ref, onMounted, watchEffect, defineOptions, computed } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router'
import OpenAIPrompt from '../components/OpenAIPrompt.vue'
defineOptions({
    name: 'InquiryView'
})
const route = useRoute()
const prettyLocation: Ref<string | null> = ref(null);
const categories = ref<Category[]>([]);

interface Category {
    query: string;
    label: string;
    keyphrase: string;
    prompt: string;
}
const queryValues = ref<Category>({
    query: '',
    label: '',
    keyphrase: '',
    prompt: ''
});

interface Replacements {
    [key: string]: string | null | undefined;
}

function replacePlaceholders(template: string, replacements: Replacements): string {
    let output = template;
    for (const [key, value] of Object.entries(replacements)) {
        const pattern = new RegExp(`<${key}>`, 'g');
        output = output.replace(pattern, value ?? '');
    }
    return output;
}

const finalString = computed(() => {
    return replacePlaceholders(queryValues.value.prompt, {
        label: queryValues.value.label,
        selectedProvince: 'cebu',
        selectedLocation: prettyLocation.value
    })
})

onMounted(async () => {
    const res = await fetch('/src/assets/json/category.json')
    categories.value = await res.json()

    queryValues.value = categories.value.find(
        (item) => item.query === route.params.inquiry
    ) || { query: '', label: '', keyphrase: '', prompt: '' };
})

watchEffect(() => {
    const location = route.params.place;
    prettyLocation.value = null;

    if (typeof location === 'string') {
        prettyLocation.value = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } else if (Array.isArray(location)) {
        prettyLocation.value = location.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
});


// Removed unused listItems and isVisible refs

</script>
<template>
    <div class="mt-10">
        <p class="px-4 text-[#f7ae1d] text-xl font-thin mb-8">
            You are looking for <span class="italc font-semibold">{{ queryValues.keyphrase }}</span> in
            <span class="italc font-semibold">{{ prettyLocation }}</span>
        </p>
        <div class="p-4">
            <!-- Display the OpenAI results -->
            <OpenAIPrompt v-if="queryValues.query && prettyLocation" :location="prettyLocation"
                :label="queryValues.label" :inquiry="finalString" :province="'Cebu'" />

            <!-- Fallback content if no query is found -->
            <div v-else class="text-center text-white/60 py-8">
                <p>Loading inquiry details...</p>
            </div>
        </div>
    </div>
</template>