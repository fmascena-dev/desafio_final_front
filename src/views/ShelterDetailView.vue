<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import StatusBadge from '@/components/StatusBadges.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useShelter } from '@/composables/useShelters'

const route = useRoute()
const { shelter, loading, error, fetchById } = useShelter()

const id = Number(route.params.id)

const occupancyPercent = computed(() => {
  if (!shelter.value || shelter.value.capacity === 0) return 0
  return Math.min(100, Math.round((shelter.value.current_occupancy / shelter.value.capacity) * 100))
})

const availableSpots = computed(() =>
  shelter.value ? shelter.value.capacity - shelter.value.current_occupancy : 0,
)

const occupancyBarClass = computed(() => {
  if (occupancyPercent.value >= 95) return 'bg-rose-500'
  if (occupancyPercent.value >= 80) return 'bg-amber-500'
  return 'bg-emerald-500'
})

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => fetchById(id))
</script>

<template>
  <main id="main-content" tabindex="-1" class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <RouterLink
      to="/abrigos"
      class="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:underline"
      aria-label="Voltar para a lista de abrigos"
    >
      ← Voltar para abrigos
    </RouterLink>

    <LoadingSpinner v-if="loading" label="Carregando detalhes do abrigo..." />

    <EmptyState
      v-else-if="error || !shelter"
      icon="🏚️"
      title="Abrigo não encontrado"
      description="O abrigo que você procura pode ter sido removido ou o link está incorreto."
    >
      <RouterLink
        to="/abrigos"
        class="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Ver todos os abrigos
      </RouterLink>
    </EmptyState>

    <article v-else aria-labelledby="shelter-title">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 id="shelter-title" class="text-2xl font-bold text-slate-900">{{ shelter.name }}</h1>
            <p class="mt-1 text-slate-500">
              📍 {{ shelter.address }}, {{ shelter.city }} — {{ shelter.state }}
            </p>
          </div>
          <StatusBadge :status="shelter.status" />
        </div>

        <div class="mt-6">
          <div class="mb-1.5 flex items-center justify-between text-sm">
            <span class="font-medium text-slate-700">Ocupação atual</span>
            <span class="text-slate-500">
              {{ shelter.current_occupancy }} / {{ shelter.capacity }} pessoas
            </span>
          </div>
          <div
            class="h-3 w-full overflow-hidden rounded-full bg-slate-100"
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
          <div class="mt-2 flex items-center justify-between text-sm">
            <span
              :class="[
                'font-semibold',
                availableSpots <= 0
                  ? 'text-rose-600'
                  : availableSpots <= 10
                    ? 'text-amber-600'
                    : 'text-emerald-700',
              ]"
            >
              {{
                availableSpots > 0
                  ? `${availableSpots} vagas disponíveis`
                  : 'Sem vagas disponíveis'
              }}
            </span>
            <span class="text-slate-400">{{ occupancyPercent }}% ocupado</span>
          </div>
        </div>
      </div>

      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <section
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          aria-labelledby="contact-heading"
        >
          <h2 id="contact-heading" class="mb-4 font-semibold text-slate-900">
            📞 Contato e coordenação
          </h2>
          <dl class="space-y-3 text-sm">
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Telefone do abrigo
              </dt>
              <dd class="mt-0.5">
                <a
                  :href="`tel:${shelter.phone.replace(/\D/g, '')}`"
                  class="font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:underline"
                >
                  {{ shelter.phone }}
                </a>
              </dd>
            </div>
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Coordenador(a)
              </dt>
              <dd class="mt-0.5 font-medium text-slate-800">{{ shelter.coordinator_name }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-400">
                Celular do coordenador(a)
              </dt>
              <dd class="mt-0.5">
                <a
                  :href="`tel:${shelter.coordinator_phone.replace(/\D/g, '')}`"
                  class="font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:underline"
                >
                  {{ shelter.coordinator_phone }}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          aria-labelledby="access-heading"
        >
          <h2 id="access-heading" class="mb-4 font-semibold text-slate-900">
            ♿ Acessibilidade e recursos
          </h2>
          <ul class="space-y-2 text-sm" role="list">
            <li class="flex items-center gap-2">
              <span
                :class="shelter.accepts_pets ? 'text-emerald-600' : 'text-slate-300'"
                aria-hidden="true"
              >
                {{ shelter.accepts_pets ? '✅' : '❌' }}
              </span>
              <span :class="shelter.accepts_pets ? 'text-slate-800' : 'text-slate-400'">
                Aceita animais de estimação
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span
                :class="shelter.accepts_elderly ? 'text-emerald-600' : 'text-slate-300'"
                aria-hidden="true"
              >
                {{ shelter.accepts_elderly ? '✅' : '❌' }}
              </span>
              <span :class="shelter.accepts_elderly ? 'text-slate-800' : 'text-slate-400'">
                Aceita idosos
              </span>
            </li>
            <li class="flex items-center gap-2">
              <span
                :class="shelter.accepts_disabled ? 'text-emerald-600' : 'text-slate-300'"
                aria-hidden="true"
              >
                {{ shelter.accepts_disabled ? '✅' : '❌' }}
              </span>
              <span :class="shelter.accepts_disabled ? 'text-slate-800' : 'text-slate-400'">
                Acessível para pessoas com deficiência
              </span>
            </li>
          </ul>
        </section>

        <section
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2"
          aria-labelledby="needs-heading"
        >
          <h2 id="needs-heading" class="mb-4 font-semibold text-slate-900">
            📦 O que este abrigo precisa
          </h2>
          <div v-if="shelter.needs.length === 0" class="text-sm text-slate-400">
            Nenhuma necessidade registrada no momento.
          </div>
          <ul v-else class="flex flex-wrap gap-2" role="list">
            <li
              v-for="need in shelter.needs"
              :key="need"
              class="rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200"
            >
              {{ need }}
            </li>
          </ul>
        </section>
      </div>

      <p class="mt-5 text-xs text-slate-400">
        Última atualização: {{ formatDate(shelter.updated_at) }}
      </p>
    </article>
  </main>
</template>
