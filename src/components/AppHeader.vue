<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/abrigos', label: 'Ver Abrigos' },
  { to: '/cadastrar', label: 'Cadastrar Abrigo' },
]

function isActive(path: string) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}
</script>

<template>
  <header class="flex items-center justify-between fixed w-full z-40 border-b border-blue-900/20 bg-blue-800 shadow-md">
    <nav
      class="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6"
      aria-label="Navegação principal"
    >
      <RouterLink
        to="/"
        class="flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Abrigo Fácil — página inicial"
      >
        <span class="text-xl" aria-hidden="true">🏠</span>
        <span class="text-xl font-bold tracking-tight text-white">
          Abrigo<span class="text-blue-300">Fácil</span>
        </span>
      </RouterLink>

      <ul class="hidden items-center gap-1 sm:flex" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
              isActive(link.to)
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700/60 hover:text-white',
            ]"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <button
        class="flex items-center justify-center rounded-md p-2 text-blue-100 transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Abrir menu de navegação"
        @click="menuOpen = !menuOpen"
      >
        <svg
          v-if="!menuOpen"
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="menuOpen"
      id="mobile-menu"
      class="border-t border-blue-700 bg-blue-800 px-4 pb-3 sm:hidden"
    >
      <ul class="flex flex-col gap-1 pt-2" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive(link.to)
                ? 'bg-blue-700 text-white'
                : 'text-blue-100 hover:bg-blue-700/60 hover:text-white',
            ]"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>
