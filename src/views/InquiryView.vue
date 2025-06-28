<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router'
defineOptions({
    name: 'InquiryView'
})
const route = useRoute()
const prettyLocation: Ref<string | null> = ref(null);

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

// console.log('ROUTE PARAMS:', route.params)


// console.log(location)

</script>
<template>
    <div class="mt-10">
        <p class="px-4 text-[#f7ae1d] italic text-xl font-semibold">What are you looking for in {{ prettyLocation
        }}?
        </p>
        <div class="p-4 flex gap-4 flex-wrap">
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
            <p>fdsfsfsfssd dfsafsd fsd</p>
        </div>
    </div>
</template>
