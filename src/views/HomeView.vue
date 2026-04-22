<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import StatsCard from '@/components/StatsCard.vue'
import ShelterCard from '@/components/ShelterCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useShelters } from '@/composables/useShelters'

const { shelters, loading, stats, fetchShelters } = useShelters()

const featuredShelters = computed(() => shelters.value.slice(0, 3))

onMounted(() => fetchShelters())
</script>

<template>
  <main id="main-content" tabindex="-1" class="w-full">
    <section
      class="relative overflow-hidden bg-linear-to-br from-blue-900 via-blue-800 to-blue-700 text-white w-full"
      aria-labelledby="hero-heading"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.3),transparent_60%)]"
        aria-hidden="true"
      />
      <div class="flex items-center justify-around gap-4 relative mx-auto w-full px-4 py-10 sm:px-6 sm:py-20 sm:pt-28">
        <div class="flex flex-col items-start gap-4 sm:w-full md:w-full">
          <div
            class="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-700/50 px-3 py-1 text-xs text-gray-200 ring-1 ring-blue-500/30"
          >
            <span class="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
            Informações atualizadas em tempo real
          </div>
          <h1 id="hero-heading" class="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Encontre um abrigo <br />
            <span class="text-blue-300">perto de você</span>
          </h1>
          <p class="mt-4 text-base leading-relaxed text-blue-100 sm:text-lg">
            Informações atualizadas sobre abrigos disponíveis durante emergências de enchente.
            Localização, vagas, necessidades e muito mais.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink
              to="/abrigos"
              class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 shadow-sm transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
            >
              Ver todos os abrigos
            </RouterLink>
            <RouterLink
              to="/cadastrar"
              class="rounded-lg border border-blue-400 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-800"
            >
              Cadastrar abrigo
            </RouterLink>
          </div>
        </div>

        <img class="hidden w-2xl rounded-lg shadow-lg sm:hidden lg:block lg:w-1/2 xl:w-full" src="/abrigo.png" alt="Foto do abrigo">
      </div>
    </section>

    <section
      class="flex flex-col gap-6 mx-auto w-full px-4 py-10 sm:px-6"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" class="text-3xl font-bold text-slate-900">Resumo dos abrigos</h2>
      <LoadingSpinner v-if="loading" />
      <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon="🏠"
          label="Total de abrigos"
          :value="stats.total"
          color-class="bg-blue-100"
        />
        <StatsCard
          icon="✅"
          label="Com vagas"
          :value="stats.available"
          :description="`${stats.total - stats.available} sem vagas`"
          color-class="bg-emerald-100"
        />
        <StatsCard
          icon="⚠️"
          label="Em estado crítico"
          :value="stats.critical"
          description="Quase sem vagas"
          color-class="bg-amber-100"
        />
        <StatsCard
          icon="👥"
          label="Vagas disponíveis"
          :value="stats.totalCapacity - stats.totalOccupancy"
          :description="`de ${stats.totalCapacity} no total`"
          color-class="bg-slate-100"
        />
      </div>
    </section>

    <section
      class="bg-slate-50 py-12 w-full"
      aria-labelledby="featured-heading"
    >
      <div class="flex flex-col gap-4 mx-auto w-full px-4 sm:px-6">
        <div class="mb-6 flex items-center justify-between gap-4">
          <h2 id="featured-heading" class="text-3xl font-bold text-slate-900">
            Abrigos recentes
          </h2>
          <RouterLink
            to="/abrigos"
            class="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:underline"
          >
            Ver todos →
          </RouterLink>
        </div>

        <LoadingSpinner v-if="loading" />
        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ShelterCard v-for="shelter in featuredShelters" :key="shelter.id" :shelter="shelter" />
        </div>
      </div>
    </section>

    <section
      class="mx-auto w-full flex flex-col gap-6 px-4 pb-16 sm:px-6 lg:pt-0 lg:pb-20"
      aria-labelledby="how-heading"
    >
      <h2 id="how-heading" class="text-center text-2xl font-bold text-slate-900">
        Como funciona
      </h2>
      <ol class="grid gap-8 sm:grid-cols-3" role="list">
        <li class="flex flex-col items-center gap-2 text-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl"
            aria-hidden="true"
          >
            🔍
          </div>
          <h3 class="mt-4 font-semibold text-slate-900">1. Busque um abrigo</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Procure abrigos próximos e filtre por disponibilidade, acessibilidade ou cidade.
          </p>
        </li>
        <li class="flex flex-col items-center gap-2 text-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl"
            aria-hidden="true"
          >
            📋
          </div>
          <h3 class="mt-4 font-semibold text-slate-900">2. Confira as informações</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Veja vagas disponíveis, o que o abrigo precisa e os dados de contato do coordenador.
          </p>
        </li>
        <li class="flex flex-col items-center gap-2 text-center">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-2xl"
            aria-hidden="true"
          >
            📞
          </div>
          <h3 class="mt-4 font-semibold text-slate-900">3. Entre em contato</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-500">
            Ligue diretamente para o coordenador do abrigo ou cadastre um novo local para ajudar.
          </p>
        </li>
      </ol>
    </section>

    <section class="bg-rose-700 text-white py-4">
      <div
        class="mx-auto flex w-full flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6"
      >
        <div>
          <p class="font-bold text-lg">🚨 Em caso de risco iminente</p>
          <p class="text-md text-rose-100">Ligue imediatamente para a Defesa Civil ou Bombeiros.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a
            href="tel:199"
            class="rounded-lg bg-white px-4 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Ligar para Defesa Civil — 199"
          >
            Defesa Civil 199
          </a>
          <a
            href="tel:193"
            class="rounded-lg border border-rose-400 px-4 py-2 text-sm font-bold text-white hover:bg-rose-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Ligar para Bombeiros — 193"
          >
            Bombeiros 193
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
