<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import StatusBadge from './StatusBadges.vue'
import type { Shelter } from '@/types'

const props = defineProps<{
  shelter: Shelter
}>()

const occupancyPercent = computed(() =>
  props.shelter.capacity > 0
    ? Math.min(100, Math.round((props.shelter.current_occupancy / props.shelter.capacity) * 100))
    : 0,
)

const availableSpots = computed(() => props.shelter.capacity - props.shelter.current_occupancy)

const occupancyBarClass = computed(() => {
  if (occupancyPercent.value >= 95) return 'bg-rose-500'
  if (occupancyPercent.value >= 80) return 'bg-amber-500'
  return 'bg-emerald-500'
})

const tags = computed(() => {
  const list = []
  if (props.shelter.accepts_pets) list.push({ icon: '🐾', label: 'Aceita pets' })
  if (props.shelter.accepts_elderly) list.push({ icon: '👴', label: 'Aceita idosos' })
  if (props.shelter.accepts_disabled) list.push({ icon: '♿', label: 'Acessível' })
  return list
})
</script>

<template>
  <article
    class="group h-full flex flex-col rounded-xl border border-slate-200 bg-white shadow-md transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500"
    :aria-label="`Abrigo: ${shelter.name}`"
  >
    <div class="flex items-start justify-between gap-3 p-5 pb-3">
      <div class="min-w-0 flex-1">
        <h3 class="truncate text-base font-semibold text-slate-900">{{ shelter.name }}</h3>
        <p class="mt-0.5 truncate text-sm text-slate-500">
          📍 {{ shelter.address }}, {{ shelter.city }} — {{ shelter.state }}
        </p>
      </div>
      <StatusBadge :status="shelter.status" />
    </div>

    <div class="flex flex-1 flex-col gap-1 px-5 pb-4">
      <div class="mb-1 flex items-center justify-between text-sm text-slate-500">
        <span>Ocupação</span>
        <span :class="occupancyPercent >= 95 ? 'font-semibold text-rose-600' : ''">
          {{ shelter.current_occupancy }}/{{ shelter.capacity }} ({{ occupancyPercent }}%)
        </span>
      </div>
      <div
        class="h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        :aria-valuenow="occupancyPercent"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-label="`Ocupação: ${occupancyPercent}%`"
      >
        <div
          :class="['h-full rounded-full transition-all', occupancyBarClass]"
          :style="{ width: `${occupancyPercent}%` }"
        />
      </div>
      <p class="mt-1 text-sm text-slate-500">
        <span
          :class="availableSpots <= 0 ? 'font-bold text-rose-600' : availableSpots <= 10 ? 'font-bold text-amber-600' : 'font-bold text-emerald-700'"
        >
          {{ availableSpots > 0 ? `${availableSpots} vagas disponíveis` : 'Sem vagas' }}
        </span>
      </p>

      <div v-if="tags.length" class="mt-3 flex flex-wrap gap-1.5" aria-label="Recursos do abrigo">
        <span
          v-for="tag in tags"
          :key="tag.label"
          class="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-sm text-slate-600 pointer-events-none"
          :aria-label="tag.label"
        >
          <span aria-hidden="true">{{ tag.icon }}</span>
          {{ tag.label }}
        </span>
      </div>
    </div>

    <div class="mt-auto border-t border-slate-200 px-5 py-3">
      <RouterLink
        :to="`/abrigos/${shelter.id}`"
        class="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:underline"
        :aria-label="`Ver detalhes do abrigo ${shelter.name}`"
      >
        Ver detalhes →
      </RouterLink>
    </div>
  </article>
</template>
