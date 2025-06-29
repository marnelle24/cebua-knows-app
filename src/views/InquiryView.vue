<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router'
defineOptions({
    name: 'InquiryView'
})
const route = useRoute()
const prettyLocation: Ref<string | null> = ref(null);
interface Category {
    query: string;
    label: string;
    keyphrase: string;
}

const categories = ref<Category[]>([]);
const queryValues = ref<Category>({
    query: '',
    label: '',
    keyphrase: ''
});

onMounted(async () => {
    const res = await fetch('/src/assets/json/category.json')
    categories.value = await res.json()

    queryValues.value = categories.value.find(
        (item) => item.query === route.params.inquiry
    ) || {};

    listItems.value.forEach((_, i) => {
        setTimeout(() => {
            isVisible.value[i] = true
        }, i * 200)
    })
})

watchEffect(() => {
    const location = route.params.place;
    // const query = route.params.route;
    // const phrase = route.params.keyphrase;

    // console.log(location, query, phrase);

    prettyLocation.value = null;

    if (typeof location === 'string') {
        prettyLocation.value = location.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } else if (Array.isArray(location)) {
        prettyLocation.value = location.join(' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
});


const listItems = ref([
    {
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor....'
    },
    {
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor....'
    },
    {
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor....'
    },
    {
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor....'
    },
    {
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor. Lorem Ipsum Dolor....'
    }
])

const isVisible = ref(listItems.value.map(() => false))

</script>
<template>
    <div class="mt-10">
        <p class="px-4 text-[#f7ae1d] text-xl font-thin mb-8">
            You are looking for <span class="italc font-semibold">{{ queryValues.keyphrase }}</span> in
            <span class="italc font-semibold">{{ prettyLocation }}</span>
        </p>
        <div class="p-4 flex gap-4 flex-wrap">
            <ul class="flex flex-col gap-6">
                <li v-for="(item, i) in listItems" :key="i" :class="[
                    'p-4 border border-[#f7ae1d] rounded-lg text-white hover:bg-[#f7ae1d]/10 hover:-translate-y-1 cursor-pointer',
                    'transition duration-700 ease-out',
                    isVisible[i]
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4',
                    `delay-${i * 200}`
                ]">
                    <h2 class="text-xl text-[#f7ae1d] font-semibold mb-4 capitalize">{{ queryValues.keyphrase + ' ' +
                        (i + 1)
                        }}</h2>
                    <p class="text-[#f7ae1d]/80 italic text-sm">
                        {{ item.description }}
                        <!-- <pre>{{ queryValues }}</pre> -->
                    <pre>{{ queryValues.keyphrase }}</pre>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
