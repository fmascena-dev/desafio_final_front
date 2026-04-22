<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  label?: string
}>()
</script>

<template>
  <div
    class="flex items-center justify-center py-12"
    role="status"
    :aria-label="label ?? 'Carregando...'"
  >
    <div
      :class="[
        'animate-spin rounded-full border-4 border-slate-200 border-t-blue-600',
        size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-16 w-16' : 'h-10 w-10',
      ]"
      aria-hidden="true"
    />
    <span class="sr-only">{{ label ?? 'Carregando...' }}</span>
  </div>
</template>
