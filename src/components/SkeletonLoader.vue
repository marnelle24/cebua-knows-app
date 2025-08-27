<template>
    <div :class="[
        'animate-pulse rounded-md',
        variant === 'text' ? 'h-4' : 'h-full',
        className
    ]">
        <div :class="[
            'bg-gray-200 rounded-md h-full',
            variant === 'circle' ? 'rounded-full aspect-square' : ''
        ]"></div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    variant?: 'text' | 'rectangle' | 'circle'
    className?: string
}

withDefaults(defineProps<Props>(), {
    variant: 'rectangle',
    className: ''
})
</script>
