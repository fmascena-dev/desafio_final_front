<script setup lang="ts">
defineProps<{
  icon: string
  label: string
  value: number | string
  description?: string
  colorClass?: string
}>()
</script>

<template>
  <article
    class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-md"
    :aria-label="`${label}: ${value}`"
  >
    <div
      :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl', colorClass ?? 'bg-blue-100']"
      aria-hidden="true"
    >
      {{ icon }}
    </div>
    <div>
      <p class="text-2xl font-bold text-slate-900">{{ value }}</p>
      <p class="text-md font-medium text-slate-900">{{ label }}</p>
      <p v-if="description" class="text-sm text-slate-500">{{ description }}</p>
    </div>
  </article>
</template>
