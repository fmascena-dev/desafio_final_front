<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ShelterCard from '@/components/ShelterCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useShelters } from '@/composables/useShelters'
import type { ShelterFilterStatus } from '@/types'

const route = useRoute()
const router = useRouter()

const { shelters, loading, fetchShelters } = useShelters()

const search = ref((route.query.search as string) ?? '')
const statusFilter = ref<ShelterFilterStatus>((route.query.status as ShelterFilterStatus) ?? 'all')
const petsFilter = ref(route.query.pets === 'true')
const elderlyFilter = ref(route.query.elderly === 'true')
const disabledFilter = ref(route.query.disabled === 'true')

const STATUS_OPTIONS: { value: ShelterFilterStatus; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'available', label: 'Disponível' },
  { value: 'critical', label: 'Crítico' },
  { value: 'full', label: 'Lotado' },
]

const filteredShelters = computed(() => {
  let list = shelters.value

  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q),
    )
  }

  if (statusFilter.value !== 'all') {
    list = list.filter((s) => s.status === statusFilter.value)
  }

  if (petsFilter.value) list = list.filter((s) => s.accepts_pets)
  if (elderlyFilter.value) list = list.filter((s) => s.accepts_elderly)
  if (disabledFilter.value) list = list.filter((s) => s.accepts_disabled)

  return list
})

function updateQuery() {
  router.replace({
    query: {
      ...(search.value ? { search: search.value } : {}),
      ...(statusFilter.value !== 'all' ? { status: statusFilter.value } : {}),
      ...(petsFilter.value ? { pets: 'true' } : {}),
      ...(elderlyFilter.value ? { elderly: 'true' } : {}),
      ...(disabledFilter.value ? { disabled: 'true' } : {}),
    },
  })
}

function clearFilters() {
  search.value = ''
  statusFilter.value = 'all'
  petsFilter.value = false
  elderlyFilter.value = false
  disabledFilter.value = false
}

const hasActiveFilters = computed(
  () =>
    !!search.value ||
    statusFilter.value !== 'all' ||
    petsFilter.value ||
    elderlyFilter.value ||
    disabledFilter.value,
)

watch([search, statusFilter, petsFilter, elderlyFilter, disabledFilter], updateQuery)

onMounted(() => fetchShelters())
</script>

<template>
  <main id="main-content" tabindex="-1" class="mx-auto w-full px-4 py-20 sm:px-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-slate-900">Abrigos disponíveis</h1>
      <p class="mt-1 text-slate-500">
        Encontre um abrigo próximo e verifique as informações atualizadas.
      </p>
    </div>

    <div class="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="relative">
        <label for="search-input" class="sr-only">Buscar por nome, cidade ou endereço</label>
        <svg
          class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          id="search-input"
          v-model="search"
          type="search"
          placeholder="Buscar por nome, cidade ou endereço..."
          class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Filtrar por status" class="flex flex-wrap gap-1.5">
          <button
            v-for="opt in STATUS_OPTIONS"
            :key="opt.value"
            :class="[
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              statusFilter === opt.value
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600',
            ]"
            :aria-pressed="statusFilter === opt.value"
            @click="statusFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>

        <div class="h-4 w-px bg-slate-300" aria-hidden="true" />

        <div role="group" aria-label="Filtrar por recursos" class="flex flex-wrap gap-1.5">
          <button
            :class="[
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              petsFilter
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400',
            ]"
            :aria-pressed="petsFilter"
            @click="petsFilter = !petsFilter"
          >
            🐾 Pets
          </button>
          <button
            :class="[
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              elderlyFilter
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400',
            ]"
            :aria-pressed="elderlyFilter"
            @click="elderlyFilter = !elderlyFilter"
          >
            👴 Idosos
          </button>
          <button
            :class="[
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              disabledFilter
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-300 bg-white text-slate-600 hover:border-blue-400',
            ]"
            :aria-pressed="disabledFilter"
            @click="disabledFilter = !disabledFilter"
          >
            ♿ Acessível
          </button>
        </div>

        <button
          v-if="hasActiveFilters"
          class="ml-auto text-xs text-slate-500 underline hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          @click="clearFilters"
        >
          Limpar filtros
        </button>
      </div>
    </div>

    <p
      class="mb-4 text-sm text-slate-700 font-semibold"
      aria-live="polite"
      aria-atomic="true"
    >
      <template v-if="!loading">
        {{ filteredShelters.length }}
        {{ filteredShelters.length === 1 ? 'abrigo encontrado' : 'abrigos encontrados' }}
      </template>
    </p>

    <LoadingSpinner v-if="loading" label="Carregando abrigos..." />

    <EmptyState
      v-else-if="filteredShelters.length === 0"
      icon="🔍"
      title="Nenhum abrigo encontrado"
      description="Tente ajustar os filtros ou cadastre um novo abrigo."
    >
      <div class="mt-4 flex gap-3">
        <button
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          @click="clearFilters"
        >
          Limpar filtros
        </button>
        <RouterLink
          to="/cadastrar"
          class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Cadastrar abrigo
        </RouterLink>
      </div>
    </EmptyState>

    <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <ShelterCard v-for="shelter in filteredShelters" :key="shelter.id" :shelter="shelter" />
    </div>
  </main>
</template>
