<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3 py-16 text-center">
    <span class="text-5xl" aria-hidden="true">{{ icon ?? '🔍' }}</span>
    <h3 class="text-lg font-semibold text-slate-700">{{ title }}</h3>
    <p v-if="description" class="max-w-sm text-sm text-slate-500">{{ description }}</p>
    <slot />
  </div>
</template>
