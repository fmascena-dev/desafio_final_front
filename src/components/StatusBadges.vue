<script setup lang="ts">
import type { ShelterStatus } from '@/types'

const props = defineProps<{
  status: ShelterStatus
}>()

const config: Record<ShelterStatus, { label: string; classes: string; dot: string }> = {
  available: {
    label: 'Disponível',
    classes: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20 pointer-events-none',
    dot: 'bg-emerald-500',
  },
  critical: {
    label: 'Crítico',
    classes: 'bg-amber-100 text-amber-800 ring-amber-600/20 pointer-events-none',
    dot: 'bg-amber-500',
  },
  full: {
    label: 'Lotado',
    classes: 'bg-rose-100 text-rose-800 ring-rose-600/20 pointer-events-none',
    dot: 'bg-rose-500',
  },
}

const current = config[props.status]
</script>

<template>
  <span
    :class="['inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset', current.classes]"
    :aria-label="`Status: ${current.label}`"
    role="status"
  >
    <span :class="['h-1.5 w-1.5 rounded-full', current.dot]" aria-hidden="true" />
    {{ current.label }}
  </span>
</template>
